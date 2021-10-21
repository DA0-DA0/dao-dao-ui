import LineAlert from 'components/LineAlert';
import WalletLoader from 'components/WalletLoader';
import { useSigningClient } from 'contexts/cosmwasm';
import cloneDeep from 'lodash.clonedeep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { defaultExecuteFee } from '../../util/fee';
import { isValidJson } from '../../util/isValidJson';
import { makeSpendMessage } from '../../util/messagehelpers';

interface FormElements extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  description: HTMLInputElement;
  json: HTMLInputElement;
}

interface ProposalFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || '';

const ProposalCreate: NextPage = () => {
  const router = useRouter();

  const { walletAddress, signingClient } = useSigningClient();
  const [sendWalletAddress, setSendWalletAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [proposalMessage, setProposalMessage] = useState<any>(); // message type?
  const [messageJson, setMessageJson] = useState('');
  const [proposalID, setProposalID] = useState('');

  const handleSpend = () => {
    const amount = prompt('Amount?');
    if (amount) {
      const spendMsg = makeSpendMessage(
        amount,
        sendWalletAddress || walletAddress
      );
      setProposalMessage(spendMsg);
      setMessageJson(JSON.stringify(spendMsg));
    }
  };

  const handleSubmit = async (event: FormEvent<ProposalFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const currentTarget = event.currentTarget as ProposalFormElement;

    const title = currentTarget.label.value.trim();
    const description = currentTarget.description.value.trim();
    const jsonStr = currentTarget.json.value.trim();

    if (title.length === 0 || description.length === 0) {
      setLoading(false);
      setError('Title and Description are required.');
    }

    // clone json string to avoid prototype poisoning
    // https://medium.com/intrinsic-blog/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96
    let json;
    const jsonClone = cloneDeep(jsonStr);
    if (jsonClone) {
      try {
        json = JSON.parse(jsonClone);
        if (!isValidJson(json)) {
          setLoading(false);
          setError('Error in JSON message.');
          return;
        }
      } catch {
        setLoading(false);
        setError('Proposal is not valid JSON.');
        return;
      }
    }

    const msg = {
      title,
      description,
      msgs: json || [],
    };

    try {
      const response = await signingClient?.execute(
        walletAddress,
        contractAddress,
        { propose: msg },
        defaultExecuteFee
      );
      setLoading(false);
      if (response) {
        setTransactionHash(response.transactionHash);
        const [{ events }] = response.logs;
        const [wasm] = events.filter((e) => e.type === 'wasm');
        const [{ value }] = wasm.attributes.filter(
          (w) => w.key === 'proposal_id'
        );
        setProposalID(value);
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  };

  const complete = transactionHash.length > 0;

  return (
    <WalletLoader>
      <div className="flex flex-col w-full">
        <div className="grid bg-base-100 place-items-center">
          <button onClick={() => handleSpend()}>Spend</button>
          <form
            className="text-left container mx-auto max-w-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl my-8 text-bold">Create Proposal</h1>
            <label className="block">Title</label>
            <input
              className="input input-bordered rounded box-border p-3 w-full focus:input-primary text-xl"
              name="label"
              readOnly={complete}
            />
            <label className="block mt-4">Description</label>
            <textarea
              className="input input-bordered rounded box-border p-3 h-24 w-full focus:input-primary text-xl"
              name="description"
              readOnly={complete}
            />
            <label className="block mt-4">JSON</label>
            <textarea
              className="input input-bordered rounded box-border p-3 w-full font-mono h-80 focus:input-primary text-x"
              cols={7}
              name="json"
              defaultValue={messageJson}
              readOnly={complete}
            />
            {!complete && (
              <button
                className={`btn btn-primary text-lg mt-8 ml-auto ${
                  loading ? 'loading' : ''
                }`}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                type="submit"
                disabled={loading}
              >
                Create Proposal
              </button>
            )}
            {error && (
              <div className="mt-8">
                <LineAlert variant="error" msg={error} />
              </div>
            )}

            {proposalID.length > 0 && (
              <div className="mt-8 text-right">
                <LineAlert
                  variant="success"
                  msg={`Success! Transaction Hash: ${transactionHash}`}
                />
                <button
                  className="mt-4 box-border px-4 py-2 btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/proposals/${proposalID}`);
                  }}
                >
                  View Proposal &#8599;
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </WalletLoader>
  );
};

export default ProposalCreate;

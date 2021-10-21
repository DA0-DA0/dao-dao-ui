import type { NextPage } from 'next';
import WalletLoader from 'components/WalletLoader';
import { useSigningClient } from 'contexts/cosmwasm';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import LineAlert from 'components/LineAlert';
import cloneDeep from 'lodash.clonedeep';

import { coins, StdFee } from '@cosmjs/stargate';
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

function validateJsonMsg(json: any) {
  console.log(`validateJsonMessage: `);
  console.dir(json);
  return true;
  // if (typeof json !== 'object') {
  //   return false
  // }
  // if (Array.isArray(json)) {
  //   return false
  // }
  // const messages = json?.body?.messages || []
  // if (messages.length !== 1) {
  //   return false
  // }
  // // const [message] = messages
  // // if (message['@type'] !== '/cosmos.bank.v1beta1.MsgSend') {
  // //   return false
  // // }
  // // if (message.from_address !== contractAddress) {
  // //   return false
  // // }
  // return true
}

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
      const spendMsg = makeSpendMessage(amount, sendWalletAddress || walletAddress);
      setProposalMessage(spendMsg);
      setMessageJson(JSON.stringify(spendMsg));
    }
  };

  const defaultExecuteFee: StdFee = {
    amount: coins(3000, process.env.NEXT_PUBLIC_STAKING_DENOM!),
    gas: '333333',
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
      json = JSON.parse(jsonClone);
      if (!validateJsonMsg(json)) {
        setLoading(false);
        setError('Error in JSON message.');
        return;
      }
    } catch {
      setLoading(false)
      setError('Proposal is not valid JSON.')
      return
    }

    const msg = {
      title,
      description,
      msgs: json || [],
    };

    console.log(msg);

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
            ></textarea>
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

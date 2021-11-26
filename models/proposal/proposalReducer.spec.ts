import 'jest'

import { Proposal, EmptyProposal } from './proposal'
import { makeBankMessage, makeMintMessage } from '../../util/messagehelpers'
import { ProposalReducer } from './proposalReducer'
import {
  ProposalAddMessage,
  ProposalRemoveMessage,
  ProposalSetActiveMessage,
  ProposalSetTitle,
  ProposalSetDescription,
  ProposalUpdateMessage,
} from './proposalActions'
import {
  getActiveMessageId,
  getMessage,
  proposalMessages,
  topmostId,
} from './proposalSelectors'
import { ProposalMessageType } from './messageMap'

describe('ProposalReducer', () => {
  let proposal: Proposal

  beforeEach(() => {
    proposal = {
      ...EmptyProposal,
    }
  })

  it('should add a spend message', () => {
    const message: any = makeBankMessage(
      '9',
      'send_address',
      'dao_address',
      'test_denom'
    )
    const addMessageAction: ProposalAddMessage = {
      type: 'addMessage',
      messageType: ProposalMessageType.Spend,
      message,
    }

    // Test that the message is added to the proposal
    const reduced = ProposalReducer(proposal, addMessageAction)
    const messages = proposalMessages(reduced, ProposalMessageType.Spend)
    expect(messages.length).toBe(1)
    const addedMessage = messages[0]
    expect(addedMessage.message).toEqual(addMessageAction.message)
    expect(reduced.nextId).toEqual(1)
    expect(addedMessage.id).toEqual(getActiveMessageId(reduced))
  })

  it('should add a custom message', () => {
    const message: any = {
      custom: 'I am a custom message',
    }
    const addMessageAction: ProposalAddMessage = {
      type: 'addMessage',
      messageType: ProposalMessageType.Custom,
      message,
    }

    // Test that the message is added to the proposal
    const reduced = ProposalReducer(proposal, addMessageAction)
    const messages = proposalMessages(reduced, ProposalMessageType.Custom)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toEqual(addMessageAction.message)
  })

  it('should update an existing spend message', () => {
    const message: any = makeBankMessage(
      '9',
      'send_address',
      'dao_address',
      'test_denom'
    )
    const addMessageAction: ProposalAddMessage = {
      type: 'addMessage',
      messageType: ProposalMessageType.Spend,
      message,
    }

    // Test that the message is added to the proposal
    let reduced = ProposalReducer(proposal, addMessageAction)
    const messages = proposalMessages(reduced, ProposalMessageType.Spend)
    expect(messages.length).toBe(1)
    let activeMessage = messages[0]

    const updatedMessage: any = makeBankMessage(
      '99',
      'send_address2',
      'dao_address',
      'test_denom'
    )
    const updateMessageAction: ProposalUpdateMessage = {
      type: 'updateMessage',
      id: activeMessage.id,
      message: updatedMessage,
    }
    reduced = ProposalReducer(reduced, updateMessageAction)
    const updatedMapEntry = getMessage(reduced, activeMessage.id)
    expect(updatedMapEntry?.message).toEqual(updatedMessage)
  })

  it('should update an existing mint message', () => {
    const message: any = makeMintMessage(
      '9',
      'send_address'
    )
    const addMessageAction: ProposalAddMessage = {
      type: 'addMessage',
      messageType: ProposalMessageType.Mint,
      message,
    }

    // Test that the message is added to the proposal
    let reduced = ProposalReducer(proposal, addMessageAction)
    const messages = proposalMessages(reduced, ProposalMessageType.Mint)
    expect(messages.length).toBe(1)
    let activeMessage = messages[0]

    const updatedMessage: any = makeMintMessage(
      '99',
      'send_address2'
    )
    const updateMessageAction: ProposalUpdateMessage = {
      type: 'updateMessage',
      id: activeMessage.id,
      message: updatedMessage,
    }
    reduced = ProposalReducer(reduced, updateMessageAction)
    const updatedMapEntry = getMessage(reduced, activeMessage.id)
    expect(updatedMapEntry?.message).toEqual(updatedMessage)
  })

  it('should update the active message ID after adding a message', () => {
    const message: any = {
      custom: 'I am a custom message',
    }
    const addMessageAction: ProposalAddMessage = {
      type: 'addMessage',
      messageType: ProposalMessageType.Custom,
      message,
    }

    // Test that the message is added to the proposal
    const reduced = ProposalReducer(proposal, addMessageAction)
    const messages = proposalMessages(reduced, ProposalMessageType.Custom)
    expect(messages.length).toBe(1)
    const addedMessage = messages[0]
    expect(addedMessage.id).toBeDefined()
    const proposalActiveMessageId = getActiveMessageId(reduced)
    expect(proposalActiveMessageId).toEqual(addedMessage.id)
    expect(messages[0].message).toEqual(addMessageAction.message)
  })

  it('should update the active message when set explicitly', () => {
    // add several messages:
    let reduced
    let secondMessage
    for (let i = 0; i < 10; i++) {
      const message: any = {
        custom: `I am custom message ${i}`,
      }
      const addMessageAction: ProposalAddMessage = {
        type: 'addMessage',
        messageType: ProposalMessageType.Custom,
        message,
      }

      // Test that messages are added to the proposal
      reduced = ProposalReducer(reduced ?? proposal, addMessageAction)
      if (i === 1) {
        const messages = proposalMessages(reduced, ProposalMessageType.Custom)
        secondMessage = messages[1]
      }
    }
    if (!(reduced && secondMessage)) {
      throw new Error(
        `unexpected failure: reduced: ${reduced}, secondMessage: ${secondMessage}`
      )
    }
    let currentActiveMessageId = getActiveMessageId(reduced)
    expect(currentActiveMessageId).not.toEqual(secondMessage.id)

    const setActiveMessageAction: ProposalSetActiveMessage = {
      type: 'setActiveMessage',
      id: secondMessage.id,
    }
    reduced = ProposalReducer(reduced, setActiveMessageAction)
    currentActiveMessageId = getActiveMessageId(reduced)
    expect(currentActiveMessageId).toEqual(secondMessage.id)
  })

  it('should update the active message ID after removing a message', () => {
    const message: any = {
      custom: 'I am a custom message',
    }
    const addMessageAction: ProposalAddMessage = {
      type: 'addMessage',
      messageType: ProposalMessageType.Custom,
      message,
    }

    // Test that messages are added to the proposal
    let reduced = ProposalReducer(proposal, addMessageAction)
    const initialMessageId = topmostId(reduced)

    const secondMessageAction: any = {
      ...addMessageAction,
      message: { custom: 'I am the second message' },
    }
    reduced = ProposalReducer(reduced, secondMessageAction)

    let messages = proposalMessages(reduced, ProposalMessageType.Custom)
    expect(messages.length).toBe(2)
    const addedMessage = messages[1]
    expect(addedMessage.id).toBeDefined()
    expect((addedMessage.message as any)['custom']).toEqual(
      'I am the second message'
    )
    const proposalActiveMessageId = getActiveMessageId(reduced)
    expect(proposalActiveMessageId).toEqual(addedMessage.id)

    const removeMessageAction: ProposalRemoveMessage = {
      type: 'removeMessage',
      id: proposalActiveMessageId,
    }
    reduced = ProposalReducer(reduced, removeMessageAction)
    messages = proposalMessages(reduced)
    expect(messages.length).toBe(1)
    const remainingMessage = messages[0]
    expect(remainingMessage.id).toBeDefined()
    expect((remainingMessage.message as any)['custom']).toEqual(
      'I am a custom message'
    )
    const remainingActiveMessageId = getActiveMessageId(reduced)
    expect(remainingActiveMessageId).toEqual(initialMessageId)
  })

  it('should update the title', () => {
    const setTitleAction: ProposalSetTitle = {
      type: 'setTitle',
      title: 'UpdatedTitle',
    }
    const reduced = ProposalReducer(proposal, setTitleAction)
    expect(reduced.title).toEqual(setTitleAction.title)
  })

  it('should update the description', () => {
    const setDescriptionAction: ProposalSetDescription = {
      type: 'setDescription',
      description: 'UpdatedDescription',
    }
    const reduced = ProposalReducer(proposal, setDescriptionAction)
    expect(reduced.description).toEqual(setDescriptionAction.description)
  })
})

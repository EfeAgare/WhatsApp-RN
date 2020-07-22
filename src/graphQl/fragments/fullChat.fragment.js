import gql from 'graphql-tag';
import { FRAGMENT_CHAT } from './chat.fragment';
import { FRAGMENT_MESSAGE } from './message.fragment';

export const FRAGMENT_CHATS = gql`
  fragment FullChat on Chat {
    ...Chat
    messages {
      ...Message
    }
  }
  ${FRAGMENT_CHAT}
  ${FRAGMENT_MESSAGE}
`;

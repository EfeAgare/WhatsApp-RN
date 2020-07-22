import gql from 'graphql-tag';
import { FRAGMENT_CHAT } from '../fragments/chat.fragment';

export const getChatsQuery = gql`
  query getChats {
    chats {
      ...Chat
    }
  }
  ${FRAGMENT_CHAT}
`;

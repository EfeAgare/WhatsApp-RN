import gql from 'graphql-tag';
import { FRAGMENT_MESSAGE } from '../fragments/message.fragment';

export const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${FRAGMENT_MESSAGE}
`;

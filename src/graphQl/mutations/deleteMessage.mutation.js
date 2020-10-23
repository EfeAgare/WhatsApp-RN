import gql from 'graphql-tag';

export default gql`
  mutation deleteMessage($chatId: ID!, $messageId: ID!) {
    deleteMessage(chatId: $chatId, messageId: $messageId) {
      ok
    }
  }
`;

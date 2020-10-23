import gql from 'graphql-tag';

export default gql`
  subscription deleteMessage($chatId: ID, $messageId: ID) {
    deleteMessage(chatId: $chatId, messageId: $messageId) {
      ok
    }
  }
`;

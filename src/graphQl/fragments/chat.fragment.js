import gql from 'graphql-tag';
import { FRAGMENT_MESSAGE } from './message.fragment';

export const FRAGMENT_CHAT = gql`
  fragment Chat on Chat {
    id
    name
    picture
    lastMessage {
      ...Message
    }
  }
  ${FRAGMENT_MESSAGE}
`;

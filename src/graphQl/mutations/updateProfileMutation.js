import gql from 'graphql-tag';
import * as fragments from '../fragments';

export const updateUserMutation = gql`
  mutation(
    $name: String!
    $aboutme: String
    $username: String!
    $file: Upload
  ) {
    updateUser(
      name: $name
      aboutme: $aboutme
      username: $username
      file: $file
    ) {
      ...User
    }
  }
  ${fragments.user}
`;

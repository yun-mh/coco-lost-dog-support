import { gql } from "@apollo/client";

export const VIEW_DOG = gql`
  query viewDog($id: String!) {
    viewDog(id: $id) {
      id
      image
      name
      gender
      breed
      birthdate
      user {
        id
        username
        avatar
        email
      }
      isMissed
    }
  }
`;
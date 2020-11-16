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

export const CREATE_THREAD = gql`
  mutation createThread(
    $dogId: String
    $name: String!
    $breed: String!
    $age: Int!
    $gender: String!
    $size: String!
    $weight: Float
    $feature: String
    $images: [String!]!
    $lostWhen: String
    $lostWhere: String
    $phone: String!
    $email: String
  ) {
    createThread(
      dogId: $dogId
      name: $name
      breed: $breed
      age: $age
      gender: $gender
      size: $size
      weight: $weight 
      feature: $feature
      images: $images
      lostWhen: $lostWhen
      lostWhere: $lostWhere
      phone: $phone
      email: $email
    ) {
      id
      dog {
        id
      }
      name
      breed
      age
      gender
      size
      weight
      feature
      images {
        id
        url
      }
      lostWhen
      lostWhere
      phone
      email
      isClosed
      createdAt
      updatedAt
    }
  }
`;
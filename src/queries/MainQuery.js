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
      lostDogThreads {
        id
        name
        breed
        age
        gender
        size
        weight
        feature
        images {
          url
        }
        lostWhen
        lostWhere
        phone
        email
        reports {
          id
        }
        isClosed
        createdAt
      }
      isMissed
    }
  }
`;

export const CREATE_THREAD = gql`
  mutation createThread(
    $dogId: String!
    $name: String!
    $breed: String!
    $age: Int!
    $gender: String!
    $size: String!
    $weight: Float
    $feature: String
    $images: [String]
    $lostWhen: String!
    $lostWhere: String!
    $owner: String!
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
      owner: $owner
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
      owner
      phone
      email
      isClosed
      createdAt
      updatedAt
    }
  }
`;

export const ADD_REPORT = gql`
  mutation addReport(
    $threadId: String!
    $reportType: String!
    $location: String!
    $when: String!
    $name: String!
    $phone: String!
    $memo: String
  ) {
    addReport(
      threadId: $threadId
      reportType: $reportType
      location: $location
      when: $when
      name: $name
      phone: $phone
      memo: $memo
    ) {
      id
      thread {
        id
      }
      reportType
      location
      when
      name
      phone
      memo
      createdAt
      updatedAt
    }
  }
`;
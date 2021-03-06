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
        token
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
          id
          url
        }
        lostWhen
        lostWhere
        owner
        phone
        email
        reports {
          id
          password
          location
          when
          memo
          name
          phone
          reportType
          createdAt
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

export const MODIFY_THREAD = gql`
  mutation modifyThread(
    $id: String!
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
    modifyThread(
      id: $id
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

export const CLOSE_THREAD = gql`
  mutation closeThread($threadId: String!, $dogId: String!) {
    closeThread(threadId: $threadId, dogId: $dogId) {
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
    $password: String!
    $reportType: String!
    $location: String!
    $when: String!
    $name: String!
    $phone: String!
    $memo: String
    $token: String
    $dogId: String
    $user: String
  ) {
    addReport(
      threadId: $threadId
      password: $password
      reportType: $reportType
      location: $location
      when: $when
      name: $name
      phone: $phone
      memo: $memo
      token: $token
      dogId: $dogId
      user: $user
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

export const MODIFY_REPORT = gql`
  mutation modifyReport(
    $reportId: String!
    $reportType: String!
    $location: String!
    $when: String!
    $name: String!
    $phone: String!
    $memo: String
    $token: String
    $dogId: String
    $user: String
  ) {
    modifyReport(
      reportId: $reportId
      reportType: $reportType
      location: $location
      when: $when
      name: $name
      phone: $phone
      memo: $memo
      token: $token
      dogId: $dogId
      user: $user
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

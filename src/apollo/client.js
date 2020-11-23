import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
  
const cache = new InMemoryCache({
  typePolicies: {
    LostDogThread: {
      fields: {
        images: {
          merge: false
        },
      },
    },
  },
});
  
const client = new ApolloClient({
  cache,
  uri: "https://api-coco.herokuapp.com/"
});
  
export default client;
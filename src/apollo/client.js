import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
  
  // const httpLink = new HttpLink({
  //   uri:
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:4000/"
  //       : "https://api-coco.herokuapp.com/",
  // });
  
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "https://api-coco.herokuapp.com/"
        : "https://api-coco.herokuapp.com/",
    credentials: 'same-origin'
  });
  
//   const authLink = setContext(async (_, { headers }) => {
//     const token = localStorage.getItem("token");
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     };
//   });
  
//   const wsLink = new WebSocketLink({
//     uri: `ws://api-coco.herokuapp.com/`,
//     options: {
//       reconnect: true,
//       connectionParams: async () => {
//         const token = localStorage.getItem("jwt");
//         return {
//           headers: {
//             authorization: token ? `Bearer ${token}` : "",
//           },
//         };
//       },
//     },
//   });
  
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          viewFeed: offsetLimitPagination(),
        },
      },
    },
  });
  
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        // wsLink,
        httpLink
      ),
    ]),
    // resolvers,
  });
  
//   cache.writeQuery({
//     query: IS_LOGGED_IN,
//     data: {
//       isLoggedIn: !!localStorage.getItem("token"),
//     },
//   });
  
  export default client;
  
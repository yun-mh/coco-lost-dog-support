import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
  
  // const httpLink = new HttpLink({
  //   uri:
  //     process.env.NODE_ENV === "development"
  //       ? "https://api-coco.herokuapp.com/"
  //       : "https://api-coco.herokuapp.com/",
  //   credentials: 'same-origin'
  // });
  
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
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       viewFeed: offsetLimitPagination(),
    //     },
    //   },
    // },
});
  
const client = new ApolloClient({
  cache,
  uri: "https://api-coco.herokuapp.com/"
});
  
//   cache.writeQuery({
//     query: IS_LOGGED_IN,
//     data: {
//       isLoggedIn: !!localStorage.getItem("token"),
//     },
//   });
  
export default client;
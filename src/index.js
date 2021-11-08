import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

// imports from Apollo Client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// create http connection to graphql backend
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYzNjM0NjU1Nn0.3z3ywji-JBUfCb9TIgqT5jo7LWtFnC6Uiql1GTIg_iU",
    },
  };
});
// create graphql client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// wrap application in higher-order component ApolloProvider with client as prop
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from 'apollo-boost';
import * as ws from 'ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import Cookies from 'js-cookie';
import config from '@clientconfig/index';

export default function createApolloClient(initialState, ctx) {
  const httpLink = new HttpLink({ uri: config.API_URL });
  const wsLink = new WebSocketLink({
    uri: config.SOCKET_URL,
    options: {
      reconnect: true,
      lazy: true,
    },
    webSocketImpl: ws,
  });
  const terminatingLink = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink
      )
    : httpLink;
  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token
    const token = Cookies.get(config.TOKEN_HANDLE);

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'content-type': 'application/json',
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    // Call the next link in the middleware chain.
    if (forward) {
      return forward(operation);
    }
    return null;
  });
  const link = ApolloLink.from([terminatingLink]);
  const clientOptions = () => {
    return {
      ssrMode: Boolean(ctx),
      link: authLink.concat(link),
      cache: new InMemoryCache().restore(initialState),
    };
  };

  return new ApolloClient(clientOptions());
}

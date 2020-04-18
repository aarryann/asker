import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from 'apollo-boost';
import * as ws from 'ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

export default function createApolloClient(initialState, ctx, token) {
  const httpLink = new HttpLink({ uri: 'http://localhost:4811/graphql' });
  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4811/graphql',
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
    // Retrieve the authorization token from local storage.
    // const token = localStorage.getItem(process.env.ENV_TOKEN_NAME);

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

export function createApolloClient1(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

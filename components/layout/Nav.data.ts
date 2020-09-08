import { gql, useApolloClient, useMutation } from '@apollo/client';
// import config from '@clientconfig/index';

export const queries = {
  currentUser: gql`
    query {
      currentUser {
        user {
          id
          email
        }
      }
    }
  `,
};
export const mutations = {
  login: gql`
    mutation Login($email: String!, $password: String!, $url: String!) {
      login(email: $email, password: $password, url: $url) {
        token
        user {
          id
          email
        }
      }
    }
  `,
};

const Actions = {
  signIn: async (email: string, password: string) => {
    try {
      const client = useApolloClient();
      // client.clearStore();
      const payload = {
        mutation: mutations.login,
        variables: {
          email,
          password,
          // url: config.APP_URL,
          url: 'https://localhost:4812',
        },
      };
      const results = await client.mutate({
        mutation: payload.mutation,
        variables: payload.variables,
      });
      if (results.errors) {
        return { error: results.errors };
      }
      const data = results.data.login;
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(results, null, ' '));
      localStorage.setItem(config.TOKEN_HANDLE!, data.token);
      Actions.setCurrentUser(data.user);
      return { data: data.user };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return { error: e.message };
    }
  },
  setCurrentUser: async (user: any) => {
    /*
    const socket = new Socket(process.env.REACT_APP_SOCKET_URL + '/socket', {
      params: {
        token: localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
      },
      logger: (kind: string, msg: string, data: string) => {
        // tslint:disable-next-line:no-console
        console.log(`${kind}: ${msg}`, data);
      }
    });

    socket.connect();

    const channel = socket.channel(`users:${user.id}`);

    if (channel['state'] !== 'joined') {
      channel.join().receive('ok', () => {
        // dispatch({ type: SessionConstants.CURRENT_USER, currentUser: user, socket:
        // socket, channel: channel });
      });
    }

    // eslint-disable-next-line
    channel.on('boards:add', msg => {
      // dispatch({ type: BoardConstants.BOARDS_ADDED, board: msg.board });
    });
  */
  },
  signOut: (client: any) => {
    const tokenName = process.env.REACT_APP_TOKEN_NAME;
    if (localStorage.getItem(tokenName!)) {
      localStorage.removeItem(tokenName!);
    }
    // client.resetStore();
    client.clearStore();
  },
};

export default Actions;

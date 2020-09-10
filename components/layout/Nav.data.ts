import { gql } from '@apollo/client';
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
  signIn: async (c: any, email: string, password: string) => {
    try {
      console.log('before');
      console.log(process.env.NEXT_PUBLIC_APP_URL);
      // client.clearStore();
      const payload = {
        mutation: mutations.login,
        variables: {
          email,
          password,
          url: process.env.NEXT_PUBLIC_APP_URL,
        },
      };
      console.log(payload);
      const results = await c.mutate({
        mutation: payload.mutation,
        variables: payload.variables,
      });
      if (results.errors) {
        return { error: results.errors };
      }
      const data = results.data.login;
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(results, null, ' '));
      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_HANDLE!, data.token);
      Actions.setCurrentUser(data.user);
      return { data: data.user };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return { error: e.message };
    }
  },
  setCurrentUser: async (_user: any) => {
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
    const tokenName = process.env.NEXT_PUBLIC_TOKEN_HANDLE;
    if (localStorage.getItem(tokenName!)) {
      localStorage.removeItem(tokenName!);
    }
    // client.resetStore();
    client.clearStore();
  },
};

export default Actions;

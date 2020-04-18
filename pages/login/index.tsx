import { NextPage } from 'next';
import { useState } from 'react';
import Router from 'next/router';
import { useMutation, getApolloContext } from '@apollo/react-hooks';
import cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import Layout from '@components/layout/Layout';
import { login } from '@lib/auth';
import { useUser } from '@lib/hooks';
import { withApollo } from '@lib/apollo';
import { mutations, queries } from './queries.session';

const LoginPage: NextPage<ClientPropsI> = ({ client }) => {
  // useUser({ redirectTo: '/', redirectIfFound: true });
  const [userData, setUserData] = useState({ email: '', password: '', error: '' });

  // eslint-disable-next-line
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserData({ ...userData, error: '' });

    const { email, password } = userData;
    const url = '/api/login';

    try {
      const payload = {
        mutation: mutations.login,
        variables: {
          email,
          password,
          url: 'http://localhost:3000',
        },
      };
      console.log(client);
      const results = await client.mutate({
        mutation: payload.mutation,
        variables: payload.variables,
      });
      if (results.error) {
        return { error: results.error.message };
      }
      const data = results.data.login;
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(results, null, ' '));
      /*
      const [loginMutation, { data, error: mutationError, called: mutationCalled }] = useMutation(mutations.login);
      // await loginMutation({ variables: payload.variables });
      if (mutationError) {
        return { error: mutationError };
      }
      console.log('data');
      console.log(`called: ${mutationCalled}`);
      console.log(JSON.stringify(data, null, ' '));
      */
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        const { token } = await response.json();
        cookie.set('token', token, { expires: 1 });
        // Router.push('/profile');
      } else {
        // eslint-disable-next-line
        console.log('Login failed.');
        // https://github.com/developit/unfetch#caveats
        const error = new Error(await response.text());
        // eslint-disable-next-line
        error['response'] = response;
        throw error;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('You have an error in your code or there are Network issues.', error);

      const { response } = error;
      setUserData({ ...userData, error: response ? response.statusText : error.message });
    }
  };

  return (
    <Layout>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Login</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={(event) => setUserData({ ...userData, email: event.target.value })}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={(event) => setUserData({ ...userData, password: event.target.value })}
          />

          <button type="submit">Login</button>

          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        form {
          display: flex;
          flex-flow: column;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
    </Layout>
  );
};

export default withApollo({ ssr: true })(LoginPage);

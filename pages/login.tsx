import { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Layout from '@components/layout/Layout';
import { login } from '@lib/auth';
import { useUser } from '@lib/hooks';

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true });
  const [userData, setUserData] = useState({ username: '', password: '', error: '' });

  const handleSubmit = async event => {
    event.preventDefault();
    setUserData({ ...userData, error: '' });

    const { username, password } = userData;
    const url = '/api/login';

    try {
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token });
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
          <label htmlFor="username">Login</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={event => setUserData({ ...userData, username: event.target.value })}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={event => setUserData({ ...userData, password: event.target.value })}
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

export default Login;

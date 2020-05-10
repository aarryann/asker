import { NextPage } from 'next';
import { useState } from 'react';
import Router from 'next/router';
import { post } from '@lib/utils';
import Layout from '@components/layout/Layout';
import { withApollo } from '@lib/apollo';

const LoginPage: NextPage = () => {
  // useUser({ redirectTo: '/', redirectIfFound: true });
  const [userData, setUserData] = useState({ email: '', password: '', error: '' });

  // eslint-disable-next-line
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserData({ ...userData, error: '' });

    const { email, password } = userData;
    try {
      const res = await post(`/api/login`, {
        username: email,
        password,
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('You have an error in your code or there are Network issues.', error);
      setUserData({ ...userData, error: error.message });
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

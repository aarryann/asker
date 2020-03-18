// components/Layout.tsx

import { NextPage } from 'next';
import Head from 'next/head';

import Header from './Header';
import NavBar from './NavBar';
import styles from './Layout.module.scss';
import navButtons from '../config/buttons';

type Props = {
  children: React.ReactNode;
};
const Layout: NextPage<Props> = ({ children }) => {
  const appTitle = '> WHATABYTE';

  return (
    <div className={styles.Layout}>
      <Head>
        <title>WHATABYTE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <Header appTitle={appTitle} />
      <div className={styles.Content}>{children}</div>
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;

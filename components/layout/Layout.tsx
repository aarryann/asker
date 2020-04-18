// components/Layout.tsx

import { NextPage } from 'next';
import Head from 'next/head';

import Header from './Header';
import NavBar from './NavBar';
import styles from './Layout.module.scss';
import navButtons from '../../config/buttons';

type Props = {
  children: React.ReactNode;
};
const Layout: NextPage<Props> = ({ children }) => {
  const appTitle = '> WHATABYTE';

  return (
    <div id="wrapper" className={styles.Layout}>
      <Head>
        <title>WHATABYTE</title>
      </Head>

      <Header appTitle={appTitle} />
      <div id="content" className={styles.Content}>
        {children}
      </div>
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;

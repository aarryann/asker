// components/NavButton.js

import { NextPage } from 'next';
import Link from 'next/link';
import { withRouter, SingletonRouter } from 'next/router';
import styles from './NavButton.module.scss';

type Props = {
  path: string;
  icon: JSX.Element;
  label: string;
  router: SingletonRouter;
};

const NavButton: NextPage<Props> = ({ path, icon, label, router }) => (
  <Link href={path}>
    <div className={`${styles.NavButton} ${router.pathname === path ? 'active' : ''}`}>
      <div className={styles.Icon}>{icon}</div>
      <span className={styles.Label}>{label}</span>
    </div>
  </Link>
);

export default withRouter(NavButton);

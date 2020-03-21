// components/Header.tsx
import { NextPage } from 'next';
import Link from 'next/link';
import styles from './Header.module.scss';

type Props = {
  appTitle: string;
};

const Header: NextPage<Props> = ({ appTitle }) => (
  <Link href="/">
    <div className={styles.Header}>{appTitle}</div>
  </Link>
);
export default Header;

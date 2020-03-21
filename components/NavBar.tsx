// components/NavBar.tsx

import { NextPage } from 'next';
import NavButton from './NavButton';
import { Button } from '../config/buttons';
import styles from './NavBar.module.scss';

type Props = {
  navButtons: Button[];
};

const NavBar: NextPage<Props> = ({ navButtons }) => (
  <div className={styles.NavBar}>
    {navButtons.map(button => (
      <NavButton key={button.path} path={button.path} label={button.label} icon={button.icon} />
    ))}
  </div>
);

export default NavBar;

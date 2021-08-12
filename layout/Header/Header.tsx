import cn from 'classnames';
import { useRouter } from 'next/router';
import { HeaderProps } from './Header.props';
import Logo from '../logo.svg';
import styles from './Header.module.css';
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setISOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setISOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: 0,
      x: '100%',
    },
  };
  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo className={styles.logo} />
      <ButtonIcon
        className={styles.menu}
        appearance="white"
        icon="menu"
        onClick={() => setISOpened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}>
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance="white"
          icon="close"
          onClick={() => setISOpened(false)}
        />
      </motion.div>
    </header>
  );
};

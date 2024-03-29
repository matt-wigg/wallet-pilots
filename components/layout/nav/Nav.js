import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useWeb3React } from '@web3-react/core';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import Image from 'next/image';

import style from './Nav.module.css';

const Nav = ({ modal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deactivate, active } = useWeb3React();
  const router = useRouter();

  const handleConnect = (e) => {
    modal(true);
    e.preventDefault();
  };

  const handleDisconnect = (e) => {
    modal(false);
    deactivate();
    e.preventDefault();
  };

  return (
    <nav className={style.navbar}>
      <div style={{ paddingBottom: 1 + 'rem' }}>
        <Image
          src='/pilot-logo.png'
          height='200'
          width='400'
          alt='wallet pilot logo'
          priority={true}
          loading='eager'
        />
      </div>
      {!active && (
        <button onClick={(e) => handleConnect(e)} className={style.connect}>
          CONNECT
        </button>
      )}
      {active && (
        <Link href='/' passHref>
          <button className={style.disconnect} onClick={handleDisconnect}>
            DISCONNECT
          </button>
        </Link>
      )}
      <Link href='/' passHref>
        <button
          className={router.pathname === '/' ? style.activeFocus : style.active}
        >
          Home
        </button>
      </Link>
      <Link href='/prices' passHref>
        <button
          className={
            router.pathname === '/prices' ? style.activeFocus : style.active
          }
        >
          {isLoading ? <LoadingSpinner /> : 'Prices'}
        </button>
      </Link>
      <Link href='/the-hanger' passHref>
        <button
          className={
            router.pathname === '/the-hanger' ? style.activeFocus : style.active
          }
        >
          The Hanger
        </button>
      </Link>
      <Link href='/pilots' passHref>
        <button
          className={
            router.pathname === '/pilots' ? style.activeFocus : style.active
          }
        >
          Pilots (soon)
        </button>
      </Link>
      <Link href='/map' passHref>
        <button
          className={
            router.pathname === '/map' ? style.activeFocus : style.active
          }
        >
          Map (soon)
        </button>
      </Link>
    </nav>
  );
};

Nav.propTypes = {
  modal: propTypes.func, // TODO: Break out object
};

export default Nav;

import styles from "../styles/Navbar.module.css";

import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utilities/connectors";

export default function Navbar() {
  const { activate, deactivate, active } = useWeb3React();

  const handleConnect = () => {
    activate(connectors.injected);
  };

  const handleDisconnect = () => {
    deactivate();
  };

  return (
    <nav className={styles.navbar}>
      {!active && <span className={styles.linkConnect} onClick={handleConnect}>
        CONNECT WALLET
      </span>}
      {active && <span className={styles.linkConnect} onClick={handleDisconnect}>
        DISCONNECT WALLET
      </span>}
    </nav>
  );
}

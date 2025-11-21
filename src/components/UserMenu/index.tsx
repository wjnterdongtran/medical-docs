import { type ReactNode } from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import styles from './styles.module.css';

export default function UserMenu(): ReactNode {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userMenu}>
      <span className={styles.userEmail}>{user.email}</span>
      <button className={styles.signOutButton} onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

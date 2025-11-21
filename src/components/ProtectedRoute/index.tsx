import { type ReactNode } from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import LoginForm from '@site/src/components/LoginForm';
import styles from './styles.module.css';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactNode {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}

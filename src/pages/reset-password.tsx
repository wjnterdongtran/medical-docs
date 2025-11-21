import { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './reset-password.module.css';

// Browser-only content component
function ResetPasswordLoader(): ReactNode {
  return (
    <BrowserOnly fallback={<div className={styles.loading}>Loading...</div>}>
      {() => {
        const ResetPassword = require('@site/src/components/ResetPassword').default;
        return <ResetPassword />;
      }}
    </BrowserOnly>
  );
}

export default function ResetPasswordPage(): ReactNode {
  return (
    <Layout
      title="Reset Password"
      description="Reset your password for the Medical Dictionary"
    >
      <main className={styles.main}>
        <div className="container">
          <header className={styles.header}>
            <Heading as="h1" className={styles.title}>
              Reset Password
            </Heading>
          </header>

          <ResetPasswordLoader />
        </div>
      </main>
    </Layout>
  );
}

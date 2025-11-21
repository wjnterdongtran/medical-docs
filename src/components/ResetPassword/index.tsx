import { useState, useEffect, type ReactNode, type FormEvent } from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import styles from './styles.module.css';

type ResetStatus = 'loading' | 'ready' | 'success' | 'error' | 'no-session';

export default function ResetPassword(): ReactNode {
  const { updatePassword, session, isLoading: authLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ResetStatus>('loading');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      setStatus('loading');
      return;
    }

    // Check if we have a session (user clicked the reset link)
    if (session) {
      setStatus('ready');
    } else {
      setStatus('no-session');
    }
  }, [session, authLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updatePassword(password);

      if (result.error) {
        setError(result.error.message);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setError('An unexpected error occurred');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.loading}>Verifying reset link...</div>
        </div>
      </div>
    );
  }

  if (status === 'no-session') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Invalid or Expired Link</h2>
          <p className={styles.message}>
            This password reset link is invalid or has expired.
            Please request a new password reset from the login page.
          </p>
          <a href="/dictionary" className={styles.linkButton}>
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Password Updated</h2>
          <div className={styles.successIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className={styles.message}>
            Your password has been successfully updated.
            You can now sign in with your new password.
          </p>
          <a href="/dictionary" className={styles.primaryButton}>
            Go to Dictionary
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Set New Password</h2>
        <p className={styles.subtitle}>
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={6}
              className={styles.input}
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
              className={styles.input}
              disabled={isSubmitting}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>

        <div className={styles.links}>
          <a href="/dictionary" className={styles.linkButton}>
            Cancel and go back
          </a>
        </div>
      </div>
    </div>
  );
}

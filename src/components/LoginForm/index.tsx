import { useState, type ReactNode, type FormEvent } from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import { ALLOWED_EMAIL_DOMAIN } from '@site/src/lib/supabase';
import styles from './styles.module.css';

type AuthMode = 'signin' | 'signup' | 'reset';

export default function LoginForm(): ReactNode {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      if (mode === 'signup' && password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (mode === 'signup' && password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      let result;
      if (mode === 'signin') {
        result = await signIn(email, password);
      } else if (mode === 'signup') {
        result = await signUp(email, password);
        if (!result.error) {
          setMessage('Check your email for a confirmation link');
          setMode('signin');
        }
      } else {
        result = await resetPassword(email);
        if (!result.error) {
          setMessage('Check your email for password reset instructions');
        }
      }

      if (result?.error) {
        setError(result.error.message);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setMessage(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {mode === 'signin' && 'Sign In'}
          {mode === 'signup' && 'Create Account'}
          {mode === 'reset' && 'Reset Password'}
        </h2>

        <p className={styles.domainNotice}>
          Only <strong>@{ALLOWED_EMAIL_DOMAIN}</strong> email addresses are allowed
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`you@${ALLOWED_EMAIL_DOMAIN}`}
              required
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          {mode !== 'reset' && (
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          )}

          {mode === 'signup' && (
            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        <div className={styles.links}>
          {mode === 'signin' && (
            <>
              <button type="button" className={styles.linkButton} onClick={() => switchMode('signup')}>
                Create an account
              </button>
              <button type="button" className={styles.linkButton} onClick={() => switchMode('reset')}>
                Forgot password?
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button type="button" className={styles.linkButton} onClick={() => switchMode('signin')}>
              Already have an account? Sign in
            </button>
          )}
          {mode === 'reset' && (
            <button type="button" className={styles.linkButton} onClick={() => switchMode('signin')}>
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { type ReactNode } from 'react';
import { AuthProvider } from '@site/src/contexts/AuthContext';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): ReactNode {
  return <AuthProvider>{children}</AuthProvider>;
}

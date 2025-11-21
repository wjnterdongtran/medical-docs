import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@site/src/contexts/AuthContext';

// Create a client with optimized defaults for table data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute - data considered fresh
      gcTime: 1000 * 60 * 5, // 5 minutes - cache retention (formerly cacheTime)
      refetchOnWindowFocus: false, // Disable refetch on window focus for table stability
      retry: 2, // Retry failed requests twice
    },
  },
});

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

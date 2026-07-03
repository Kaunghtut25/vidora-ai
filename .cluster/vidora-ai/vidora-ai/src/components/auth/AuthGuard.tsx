'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return fallback ?? <AuthLoadingFallback />;
  }

  if (!isAuthenticated) {
    return fallback ?? <AuthLoadingFallback />;
  }

  return <>{children}</>;
}

function AuthLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-muted-foreground text-sm">Checking authentication…</div>
    </div>
  );
}

export default AuthGuard;

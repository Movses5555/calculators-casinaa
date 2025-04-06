import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  
  // Check authentication (with SSR safety check)
  const isAuthenticated = typeof window !== 'undefined' 
    ? localStorage.getItem('adminAuthenticated') === 'true'
    : false;

  useEffect(() => {
    // Only run on client side after component mounts
    if (!isAuthenticated) {
      // Preserve the full attempted path including query params
      const returnUrl = router.asPath;
      
      // Redirect to login with return URL in query params
      router.push({
        pathname: '/admin/login',
        query: { returnUrl }, // Using query params instead of state
      });
    }
  }, [isAuthenticated, router]);

  // Render nothing during initial render or if not authenticated
  if (typeof window === 'undefined' || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

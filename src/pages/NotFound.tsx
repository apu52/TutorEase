
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import { Book, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | TutorEase</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
          
          <div className="glass-card p-8 text-center relative z-10">
            <Link to="/" className="inline-flex items-center justify-center mb-8">
              <Book className="h-10 w-10 text-tutorYellow" />
              <span className="ml-2 text-2xl font-bold text-white">TutorEase</span>
            </Link>
            
            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <p className="text-2xl text-gray-300 mb-6">Page not found</p>
            <p className="text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link to="/">
              <Button className="bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

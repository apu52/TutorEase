
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, userType });
    // In a real application, you would authenticate with a backend
    navigate('/');
  };
  
  return (
    <>
      <Helmet>
        <title>Login | TutorEase</title>
        <meta name="description" content="Login to your TutorEase account to access personalized learning roadmaps and connect with tutors." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
          
          <div className="glass-card relative z-10 p-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center justify-center">
                <Book className="h-8 w-8 text-tutorYellow" />
                <span className="ml-2 text-2xl font-bold text-white">TutorEase</span>
              </Link>
              <h1 className="mt-6 text-3xl font-bold text-white">Welcome back</h1>
              <p className="mt-2 text-gray-400">Sign in to your account to continue</p>
            </div>
            
            <Tabs defaultValue="student" className="mb-6" onValueChange={setUserType}>
              <TabsList className="grid grid-cols-2 w-full bg-tutorBlue-light border border-tutorBlue-light rounded-lg">
                <TabsTrigger value="student" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                  Student
                </TabsTrigger>
                <TabsTrigger value="tutor" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                  Tutor
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 input-field w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 input-field w-full"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" className="text-tutorYellow border-gray-500" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-tutorYellow hover:text-tutorYellow-light">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark group"
              >
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-tutorYellow hover:text-tutorYellow-light">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;


import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt with:', { name, email, password, userType });
    // In a real application, you would register with a backend
    navigate('/');
  };
  
  return (
    <>
      <Helmet>
        <title>Register | TutorEase</title>
        <meta name="description" content="Create your TutorEase account to access personalized learning roadmaps and connect with tutors." />
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
              <h1 className="mt-6 text-3xl font-bold text-white">Create an account</h1>
              <p className="mt-2 text-gray-400">Join our community of learners and tutors</p>
            </div>
            
            <Tabs defaultValue="student" className="mb-6" onValueChange={setUserType}>
              <TabsList className="grid grid-cols-2 w-full bg-tutorBlue-light border border-tutorBlue-light rounded-lg">
                <TabsTrigger value="student" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                  I'm a Student
                </TabsTrigger>
                <TabsTrigger value="tutor" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                  I'm a Tutor
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 input-field w-full"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 input-field w-full"
                    placeholder="Create a strong password"
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
                <p className="mt-1 text-xs text-gray-400">
                  Must be at least 8 characters with a number and special character
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox id="terms" required className="text-tutorYellow border-gray-500" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-tutorYellow hover:text-tutorYellow-light">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-tutorYellow hover:text-tutorYellow-light">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark group"
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-tutorYellow hover:text-tutorYellow-light">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Book, MapPin, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea'; // ✅ Added Textarea

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const [preferredLearningMode, setPreferredLearningMode] = useState('online');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Updated handleRegister to include new fields
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:7000/api/students/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          location,
          interests,
          preferredLearningMode,
          userType,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Registration successful! Redirecting to login...');
        navigate('/login');
      } else {
        alert(`⚠️ ${data.message || 'Registration failed. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | TutorEase</title>
        <meta
          name="description"
          content="Create your TutorEase account to access personalized learning roadmaps and connect with tutors."
        />
      </Helmet>

      <div className="min-h-screen bg-tutorBlue flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light"></div>
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light"
            style={{ animationDelay: '1s' }}
          ></div>

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
                <TabsTrigger
                  value="student"
                  className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue"
                >
                  I'm a Student
                </TabsTrigger>
                <TabsTrigger
                  value="tutor"
                  className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue"
                >
                  I'm a Tutor
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name Input */}
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

              {/* Email Input */}
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

              {/* Password Input */}
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
                    type={showPassword ? 'text' : 'password'}
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
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Must be at least 8 characters with a number and special character
                </p>
              </div>

              {/* Location Input */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 input-field w-full"
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              {/* Interests Input */}
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-300 mb-1">
                  Interests
                </label>
                <Textarea
                  id="interests"
                  name="interests"
                  rows={3}
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="input-field w-full"
                  placeholder="E.g. AI, Machine Learning, Web Development"
                />
              </div>

              {/* Preferred Learning Mode */}
              <div>
                <label htmlFor="learningMode" className="block text-sm font-medium text-gray-300 mb-1">
                  Preferred Learning Mode
                </label>
                <div className="relative">
                  <select
                    id="learningMode"
                    name="learningMode"
                    value={preferredLearningMode}
                    onChange={(e) => setPreferredLearningMode(e.target.value)}
                    className="input-field w-full appearance-none bg-tutorBlue-light text-white rounded-md px-3 py-2 focus:outline-none"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <List className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-tutorYellow hover:text-tutorYellow-light">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

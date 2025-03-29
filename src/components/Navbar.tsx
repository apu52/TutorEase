
import React, { useState } from 'react';
import { Menu, X, Book, Search, UserCircle, MessageSquare, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const languageText = {
    en: {
      home: 'Home',
      
      s: 'Roadmaps',
      findTutor: 'Find Tutor',
      chatbot: 'AI Chat',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
    },
    hi: {
      home: 'होम',
      roadmaps: 'रोडमैप',
      findTutor: 'ट्यूटर खोजें',
      chatbot: 'AI चैट',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      login: 'लॉगिन',
      register: 'रजिस्टर',
    }
  };

  const text = languageText[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tutorBlue/80 backdrop-blur-md py-4 border-b border-tutorYellow/20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-tutorYellow" />
          <span className="text-xl font-bold text-white">TutorEase</span>
        </Link>

        {/* Language toggle */}
        <button 
          onClick={toggleLanguage} 
          className="hidden md:flex items-center text-sm text-tutorYellow hover:text-tutorYellow-light absolute right-24"
        >
          <Globe className="w-4 h-4 mr-1" />
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link">{text.home}</Link>
          <Link to="/roadmaps" className="nav-link">{text.roadmaps}</Link>
          <Link to="/find-tutor" className="nav-link">{text.findTutor}</Link>
          <Link to="/chatbot" className="nav-link">{text.chatbot}</Link>
          <Link to="/about" className="nav-link">{text.about}</Link>
          <Link to="/contact" className="nav-link">{text.contact}</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10">
              <UserCircle className="mr-2 h-4 w-4" /> {text.login}
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">
              {text.register}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-tutorBlue z-40 animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-lg py-3 border-b border-tutorBlue-light hover:text-tutorYellow">{text.home}</Link>
            <Link to="/roadmaps" className="text-lg py-3 border-b border-tutorBlue-light hover:text-tutorYellow">{text.roadmaps}</Link>
            <Link to="/find-tutor" className="text-lg py-3 border-b border-tutorBlue-light hover:text-tutorYellow">{text.findTutor}</Link>
            <Link to="/chatbot" className="text-lg py-3 border-b border-tutorBlue-light hover:text-tutorYellow">{text.chatbot}</Link>
            <Link to="/about" className="text-lg py-3 border-b border-tutorBlue-light hover:text-tutorYellow">{text.about}</Link>
            <Link to="/contact" className="text-lg py-3 border-b border-tutorBlue-light hover:text-tutorYellow">{text.contact}</Link>
            
            <div className="flex flex-col space-y-3 mt-4">
              <button onClick={toggleLanguage} className="flex items-center text-tutorYellow">
                <Globe className="w-5 h-5 mr-2" />
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
              <Link to="/login">
                <Button variant="outline" className="w-full border-tutorYellow/50 text-tutorYellow">
                  <UserCircle className="mr-2 h-4 w-4" /> {text.login}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">
                  {text.register}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

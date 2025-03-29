
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-tutorBlue-dark border-t border-tutorBlue-light pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-tutorYellow mr-2" />
              <h3 className="text-2xl font-bold text-white">TutorEase</h3>
            </div>
            <p className="text-gray-400">
              Connecting students with the perfect tutors and educational resources for their learning journey.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-tutorYellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-tutorYellow transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-tutorYellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-tutorYellow transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-tutorYellow transition-colors">Home</Link></li>
              <li><Link to="/roadmaps" className="text-gray-400 hover:text-tutorYellow transition-colors">Learning Roadmaps</Link></li>
              <li><Link to="/find-tutor" className="text-gray-400 hover:text-tutorYellow transition-colors">Find a Tutor</Link></li>
              <li><Link to="/chatbot" className="text-gray-400 hover:text-tutorYellow transition-colors">AI Learning Assistant</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-tutorYellow transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-tutorYellow transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">For Tutors</h4>
            <ul className="space-y-2">
              <li><Link to="/tutor-register" className="text-gray-400 hover:text-tutorYellow transition-colors">Become a Tutor</Link></li>
              <li><Link to="/tutor-dashboard" className="text-gray-400 hover:text-tutorYellow transition-colors">Tutor Dashboard</Link></li>
              <li><Link to="/tutor-resources" className="text-gray-400 hover:text-tutorYellow transition-colors">Teaching Resources</Link></li>
              <li><Link to="/success-stories" className="text-gray-400 hover:text-tutorYellow transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-tutorYellow mr-2 mt-0.5" />
                <span className="text-gray-400">123 Education Street, Knowledge City, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-tutorYellow mr-2" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-tutorYellow mr-2" />
                <span className="text-gray-400">info@tutorroadmap.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-tutorBlue-light mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TutorRoadmap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { ChevronRight, Book, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-20 pb-16 flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-20 animate-pulse-light"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-tutorYellow/10 rounded-full filter blur-3xl opacity-20 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-right">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your Perfect 
              <span className="gradient-text block mt-2">Learning Journey</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl">
              Connect with expert tutors, generate personalized learning roadmaps, and get AI-powered assistance for your educational goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/roadmaps">
                <Button size="lg" className="bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">
                  <Book className="mr-2 h-5 w-5" /> Generate Roadmap
                </Button>
              </Link>
              <Link to="/find-tutor">
                <Button size="lg" variant="outline" className="border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10">
                  <Search className="mr-2 h-5 w-5" /> Find Tutors
                </Button>
              </Link>
            </div>
            
            <div className="pt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-tutorBlue-light border-2 border-tutorBlue flex items-center justify-center text-white font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-gray-300">Join <span className="text-tutorYellow font-medium">5,000+</span> students</p>
                <div className="flex items-center text-yellow-400 text-sm">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1">5.0 (500+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-left">
            <div className="absolute inset-0 bg-gradient-to-r from-tutorYellow/10 to-tutorYellow/5 rounded-xl blur-xl"></div>
            <div className="relative glass-card overflow-hidden p-6 rounded-xl">
              <div className="absolute top-0 right-0 bg-tutorYellow/20 w-20 h-20 rounded-full filter blur-xl"></div>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-tutorYellow flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-tutorBlue" />
                </div>
                <h3 className="ml-3 text-xl font-semibold">AI Learning Assistant</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-tutorBlue/50 p-3 rounded-lg rounded-tl-none">
                  <p className="text-gray-300">I want to learn web development. Where should I start?</p>
                </div>
                
                <div className="bg-tutorYellow/10 p-3 rounded-lg rounded-tr-none border border-tutorYellow/20">
                  <p className="text-white">To start web development, I recommend learning HTML, CSS, and JavaScript basics first. Here's a structured path:</p>
                  <ol className="text-gray-300 ml-5 mt-2 list-decimal">
                    <li>HTML & CSS fundamentals (2-3 weeks)</li>
                    <li>JavaScript basics and DOM manipulation (4 weeks)</li>
                    <li>Responsive design principles (2 weeks)</li>
                    <li>Basic frontend framework (React/Vue) (4 weeks)</li>
                  </ol>
                </div>
                
                <div className="bg-tutorBlue/50 p-3 rounded-lg rounded-tl-none">
                  <p className="text-gray-300">Can you recommend some good resources?</p>
                </div>
                
                <div className="bg-tutorYellow/10 p-3 rounded-lg rounded-tr-none border border-tutorYellow/20">
                  <p className="text-white">Here are some excellent resources:</p>
                  <ul className="text-gray-300 ml-5 mt-2 list-disc">
                    <li>MDN Web Docs - comprehensive reference</li>
                    <li>freeCodeCamp - interactive lessons</li>
                    <li>The Odin Project - project-based learning</li>
                    <li>CS50's Web Programming - Harvard's course</li>
                  </ul>
                  <p className="text-white mt-2">Would you like me to connect you with a web development tutor?</p>
                </div>
              </div>
              
              <Link to="/chatbot" className="mt-4 inline-flex items-center text-tutorYellow hover:text-tutorYellow-light transition-colors">
                Try AI Assistant <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

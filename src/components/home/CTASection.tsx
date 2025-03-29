
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-tutorBlue to-tutorBlue-dark z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-tutorYellow/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-tutorYellow/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Your <span className="gradient-text">Learning Journey</span> Today
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 md:mb-12">
            Whether you're looking to master a new skill, find the perfect tutor, or get personalized learning guidance, TutorEase has everything you need to succeed.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <Link to="/register" className="w-full">
              <Button size="lg" className="w-full bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark group">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/find-tutor" className="w-full">
              <Button size="lg" variant="outline" className="w-full border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10">
                Find a Tutor
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-gray-400 text-sm">
            Join thousands of students already learning with TutorEase
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;


import React from 'react';
import { BookOpen, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RoadmapPreview = () => {
  const roadmapSteps = [
    {
      title: "Python Fundamentals",
      duration: "4-6 weeks",
      description: "Master the basics of Python programming, including variables, data types, control structures, functions, and basic data structures.",
      resources: ["Python Crash Course by Eric Matthes", "freeCodeCamp Python Course", "Codecademy Python Track"]
    },
    {
      title: "Data Structures & Algorithms",
      duration: "6-8 weeks",
      description: "Learn essential data structures (lists, dictionaries, sets) and algorithms (sorting, searching, recursion) with Python implementations.",
      resources: ["Problem Solving with Algorithms and Data Structures using Python", "LeetCode Python Problems", "AlgoExpert"]
    },
    {
      title: "Object-Oriented Programming",
      duration: "3-4 weeks",
      description: "Understand OOP concepts like classes, objects, inheritance, polymorphism, and encapsulation in Python.",
      resources: ["Python OOP Tutorial (Corey Schafer)", "Fluent Python by Luciano Ramalho", "Real Python OOP Path"]
    },
    {
      title: "Web Development with Python",
      duration: "8-10 weeks",
      description: "Build web applications using frameworks like Flask or Django, learn about HTTP, APIs, and deployment.",
      resources: ["Flask Web Development by Miguel Grinberg", "Django for Beginners by William S. Vincent", "Python Web Development Courses"]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-tutorBlue z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="roadmap-card">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-tutorYellow/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-tutorYellow" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-white">Python Developer Roadmap</h3>
              </div>
              
              <div className="space-y-6">
                {roadmapSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {index < roadmapSteps.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-tutorBlue-light/70 z-0"></div>
                    )}
                    <div className="relative z-10 flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tutorYellow/20 border border-tutorYellow/40 flex items-center justify-center">
                        <span className="text-tutorYellow font-medium">{index + 1}</span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="text-white font-semibold">{step.title}</h4>
                          <span className="ml-2 text-xs text-tutorYellow bg-tutorYellow/10 px-2 py-0.5 rounded-full border border-tutorYellow/20">
                            {step.duration}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-400 text-sm">{step.description}</p>
                        <div className="mt-2">
                          <h5 className="text-xs font-medium text-gray-300 mb-1">Recommended Resources:</h5>
                          <ul className="space-y-1">
                            {step.resources.map((resource, i) => (
                              <li key={i} className="flex items-start text-xs text-gray-400">
                                <CheckCircle className="h-3 w-3 text-tutorYellow mr-1 mt-0.5" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:pl-12 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Personalized <span className="gradient-text">Learning Roadmaps</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-6">
              Never wonder what to learn next. Our AI generates customized learning paths based on your:
            </p>
            
            <ul className="space-y-3 mb-8">
              {["Current skill level", "Learning goals", "Available time", "Preferred learning style"].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-tutorYellow/20 flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-tutorYellow" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-gray-300 mb-8">
              Each roadmap includes step-by-step guidance, curated resources, and estimated timeframes to help you achieve your learning goals efficiently.
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Link to="/roadmaps">
                <Button size="lg" className="w-full md:w-auto bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">
                  Generate Your Roadmap
                </Button>
              </Link>
              <Link to="/roadmaps/examples">
                <Button variant="outline" size="lg" className="w-full md:w-auto border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10">
                  See Example Roadmaps <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapPreview;

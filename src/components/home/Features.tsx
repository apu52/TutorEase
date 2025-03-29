
import React from 'react';
import { BookOpen, Map, Users, MessageSquare, Lightbulb, Globe } from 'lucide-react';

const features = [
  {
    icon: <Map className="h-10 w-10 text-tutorYellow" />,
    title: "Personalized Learning Roadmaps",
    description: "Get AI-generated custom learning paths based on your interests, skill level, and goals. Never wonder 'what's next' in your learning journey."
  },
  {
    icon: <Users className="h-10 w-10 text-tutorYellow" />,
    title: "Expert Tutor Matching",
    description: "Find the perfect tutor with our advanced matching system. Filter by location, experience, ratings, and qualifications."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-tutorYellow" />,
    title: "AI Learning Assistant",
    description: "Our intelligent chatbot provides 24/7 study help, recommends resources, and answers your questions about any subject."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-tutorYellow" />,
    title: "Curated Course Recommendations",
    description: "Discover the best online courses, books, and resources from top platforms, all tailored to your learning style and level."
  },
  {
    icon: <Globe className="h-10 w-10 text-tutorYellow" />,
    title: "Local Tutor Discovery",
    description: "Find nearby tutors using our integrated map feature. Choose between online and in-person sessions based on your preference."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-tutorYellow" />,
    title: "Multilingual Support",
    description: "Learn in your preferred language with our multilingual platform supporting both English and Hindi interfaces."
  }
];

const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="gradient-text">Effective Learning</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our platform combines AI technology with expert tutors to create the ultimate educational experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 transition-all duration-300 hover:border-tutorYellow/30 hover:shadow-lg hover:shadow-tutorYellow/5"
            >
              <div className="bg-tutorBlue-light/80 rounded-2xl w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

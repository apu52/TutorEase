
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, BookOpen, Code, Leaf, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Roadmaps = () => {
  return (
    <>
      <Helmet>
        <title>Learning Roadmaps | TutorEase</title>
        <meta name="description" content="Generate personalized learning roadmaps based on your interests and goals." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Your Personalized <span className="gradient-text">Learning Roadmap</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Tell us what you want to learn, and we'll create a custom learning path with the best resources and timeline.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto glass-card p-8 mb-16">
              <h2 className="text-xl font-semibold mb-4 text-white">Generate Your Roadmap</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">What do you want to learn?</label>
                  <Input 
                    type="text" 
                    placeholder="e.g., Web Development, Machine Learning, Digital Marketing..." 
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Your current level</label>
                  <Tabs defaultValue="beginner">
                    <TabsList className="grid grid-cols-3 w-full bg-tutorBlue-light border border-tutorBlue-light rounded-lg">
                      <TabsTrigger value="beginner" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">Beginner</TabsTrigger>
                      <TabsTrigger value="intermediate" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">Intermediate</TabsTrigger>
                      <TabsTrigger value="advanced" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">Advanced</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Your learning goal</label>
                  <Input 
                    type="text" 
                    placeholder="e.g., Build a portfolio website, Get a job as a data scientist..." 
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Time available per week</label>
                  <Tabs defaultValue="medium">
                    <TabsList className="grid grid-cols-3 w-full bg-tutorBlue-light border border-tutorBlue-light rounded-lg">
                      <TabsTrigger value="low" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                        1-5 hours
                      </TabsTrigger>
                      <TabsTrigger value="medium" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                        5-10 hours
                      </TabsTrigger>
                      <TabsTrigger value="high" className="data-[state=active]:bg-tutorYellow data-[state=active]:text-tutorBlue">
                        10+ hours
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <Button className="w-full bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">
                  Generate Roadmap
                </Button>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-white">Popular Roadmap Templates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: "Web Development", 
                    icon: <Code className="h-6 w-6 text-tutorYellow" />,
                    desc: "From HTML basics to full-stack development",
                    skills: ["HTML/CSS", "JavaScript", "React", "Node.js"]
                  },
                  { 
                    title: "Data Science", 
                    icon: <BookOpen className="h-6 w-6 text-tutorYellow" />,
                    desc: "Master data analysis and machine learning",
                    skills: ["Python", "Statistics", "ML Algorithms", "Data Visualization"]
                  },
                  { 
                    title: "Digital Marketing", 
                    icon: <Search className="h-6 w-6 text-tutorYellow" />,
                    desc: "Learn to grow audiences and drive conversions",
                    skills: ["SEO", "Social Media", "Content Marketing", "Analytics"]
                  },
                  { 
                    title: "UX/UI Design", 
                    icon: <Leaf className="h-6 w-6 text-tutorYellow" />,
                    desc: "Create beautiful, user-centered designs",
                    skills: ["UI Principles", "Wireframing", "Prototyping", "User Research"]
                  }
                ].map((template, index) => (
                  <div key={index} className="roadmap-card flex flex-col p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-tutorYellow/20 flex items-center justify-center mr-3">
                        {template.icon}
                      </div>
                      <h3 className="text-white font-semibold">{template.title}</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{template.desc}</p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      {template.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-tutorBlue px-2 py-1 rounded-full text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button 
                        variant="link" 
                        className="text-tutorYellow hover:text-tutorYellow-light p-0 h-auto flex items-center"
                      >
                        View Roadmap <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Roadmaps;

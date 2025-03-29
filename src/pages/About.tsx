
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Globe, Award, BookOpen, Check, Star } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Former educator with 15 years of experience and a passion for making quality education accessible to all."
    },
    {
      name: "Priya Sharma",
      role: "Head of Education",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "PhD in Educational Technology with expertise in curriculum development and personalized learning."
    },
    {
      name: "Vikram Singh",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "AI researcher and full-stack developer focused on building education technology that adapts to individual learning styles."
    },
    {
      name: "Anjali Desai",
      role: "Head of Tutor Relations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", 
      bio: "Former academic coordinator with experience in teacher training and quality assurance in education."
    }
  ];

  const stats = [
    { value: "5,000+", label: "Active Students", icon: <Users className="h-8 w-8 text-tutorYellow" /> },
    { value: "750+", label: "Expert Tutors", icon: <Award className="h-8 w-8 text-tutorYellow" /> },
    { value: "25+", label: "Subject Areas", icon: <BookOpen className="h-8 w-8 text-tutorYellow" /> },
    { value: "12", label: "Cities Covered", icon: <Globe className="h-8 w-8 text-tutorYellow" /> }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | TutorEase</title>
        <meta name="description" content="Learn about our mission to connect students with the perfect tutors and personalized learning paths." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="py-12 md:py-20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  Our <span className="gradient-text">Mission</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We're building a world where every student has access to personalized learning paths and exceptional tutors who can help them achieve their educational goals.
                </p>
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-12 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-tutorYellow/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Story Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Our <span className="gradient-text">Story</span>
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      TutorEase was founded in 2022 by a team of educators, technologists, and learning enthusiasts who saw a gap in the educational landscape. While there were plenty of online courses and tutoring platforms, none offered truly personalized learning journeys combined with expert human guidance.
                    </p>
                    <p>
                      Our founder, Rajesh Kumar, experienced this problem firsthand as both a teacher and a parent. He saw how students often struggled to find the right path forward in their learning journey, frequently getting lost in a sea of educational resources without clear direction.
                    </p>
                    <p>
                      What began as a small operation connecting local tutors with students has grown into a comprehensive platform that leverages AI technology to create personalized learning roadmaps while maintaining the irreplaceable human element of education through our network of vetted tutors.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">Our Core Values</h3>
                    <ul className="space-y-3">
                      {[
                        "Personalization: Every learning journey should be unique",
                        "Excellence: Connecting students with the best tutors and resources",
                        "Accessibility: Making quality education available to all",
                        "Innovation: Using technology to enhance, not replace, human teaching"
                      ].map((value, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1">
                            <Check className="h-5 w-5 text-tutorYellow mr-3" />
                          </div>
                          <span className="text-gray-300">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="order-first lg:order-last">
                  <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-tutorYellow/10 to-tutorYellow/5 rounded-xl blur-xl"></div>
                    <div className="relative h-full w-full glass-card rounded-xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Students learning together"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-tutorBlue via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Meet Our <span className="gradient-text">Team</span>
                </h2>
                <p className="text-gray-300">
                  We're a passionate group of educators and technologists dedicated to transforming the way people learn.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="glass-card p-6 text-center">
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <div className="absolute inset-0 rounded-full bg-tutorYellow/20 blur-md"></div>
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-tutorYellow/30">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-tutorYellow text-sm mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonial */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto glass-card p-8 relative">
                <div className="absolute top-4 left-8 text-6xl font-serif text-tutorYellow/20">"</div>
                <div className="relative z-10">
                  <p className="text-xl text-gray-300 italic mb-6 pt-4 px-4">
                    TutorEase has completely transformed how we approach education in our school. The personalized roadmaps help our students stay focused and motivated, while the tutor-matching system has connected them with experts who truly understand their unique learning needs.
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                        alt="Principal" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Mrs. Sunita Reddy</h4>
                      <p className="text-gray-400 text-sm">Principal, Delhi Public School</p>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;

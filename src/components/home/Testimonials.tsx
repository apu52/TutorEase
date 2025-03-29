
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Arjun Kumar",
    role: "Computer Science Student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    quote: "TutorEase completely transformed my learning journey. The personalized roadmap for web development helped me structure my studies, and the tutor I found through the platform has been exceptional.",
    rating: 5
  },
  {
    id: 2,
    name: "Nisha Patel",
    role: "Engineering Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    quote: "Finding the right tutor for advanced physics was always a challenge until I discovered this platform. The location-based search helped me connect with a nearby expert who's helped me excel in my studies.",
    rating: 5
  },
  {
    id: 3,
    name: "Rahul Sharma",
    role: "High School Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    quote: "The AI learning assistant has been like having a personal tutor available 24/7. Whenever I'm stuck on a math problem or need clarification on a concept, I get instant, helpful responses.",
    rating: 4
  },
  {
    id: 4,
    name: "Meera Singh",
    role: "Language Learner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    quote: "As someone learning multiple languages, the structured roadmaps and curated resources have been invaluable. The platform's multilingual support makes it accessible and user-friendly.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it - hear from students who've transformed their learning journey with TutorEase.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="glass-card p-6 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-tutorYellow/20" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 text-sm italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

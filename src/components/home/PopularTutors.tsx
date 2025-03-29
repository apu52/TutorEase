
import React from 'react';
import { Star, MapPin, Clock, Bookmark, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const tutors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 4.9,
    reviews: 124,
    subjects: ["Mathematics", "Physics"],
    location: "Delhi",
    experience: "8 years",
    price: "₹800/hr",
    description: "Mathematics PhD with expertise in teaching calculus, algebra, and physics to high school and college students.",
    availability: "Weekdays evenings, weekends"
  },
  {
    id: 2,
    name: "Raj Malhotra",
    image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 4.8,
    reviews: 98,
    subjects: ["Computer Science", "Web Development"],
    location: "Mumbai",
    experience: "6 years",
    price: "₹950/hr",
    description: "Full stack developer and CS graduate helping students master programming fundamentals and web technologies.",
    availability: "Flexible schedule"
  },
  {
    id: 3,
    name: "Anjali Desai",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", 
    rating: 5.0,
    reviews: 87,
    subjects: ["English Literature", "Creative Writing"],
    location: "Bangalore",
    experience: "10 years",
    price: "₹750/hr",
    description: "Published author and former university professor specializing in literature, writing skills, and language arts.",
    availability: "Mornings and weekends"
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 4.7,
    reviews: 156,
    subjects: ["Chemistry", "Biology"],
    location: "Hyderabad",
    experience: "12 years",
    price: "₹850/hr",
    description: "Medical doctor with teaching experience helping students excel in chemistry, biology, and medical entrance exams.",
    availability: "Weekday evenings"
  }
];

const PopularTutors = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Top-Rated Tutors</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              Learn from the best instructors with proven track records of student success.
            </p>
          </div>
          
          <Link to="/find-tutor" className="hidden md:flex items-center text-tutorYellow hover:text-tutorYellow-light transition-colors">
            View all tutors <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="tutor-card">
              <div className="flex justify-end mb-2">
                <button className="text-gray-400 hover:text-tutorYellow transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-tutorYellow/20">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{tutor.name}</h3>
                <p className="text-tutorYellow text-sm">{tutor.subjects.join(", ")}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white ml-1">{tutor.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-400">{tutor.reviews} reviews</span>
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mr-1 text-tutorYellow" />
                  {tutor.location}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1 text-tutorYellow" />
                  {tutor.experience}
                </div>
                
                <p className="text-center text-sm text-gray-400 line-clamp-2 h-10">{tutor.description}</p>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-medium">{tutor.price}</span>
                  <Link 
                    to={`/tutor/${tutor.id}`}
                    className="text-sm bg-tutorYellow/10 text-tutorYellow border border-tutorYellow/20 px-3 py-1 rounded-full hover:bg-tutorYellow/20 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/find-tutor" className="md:hidden inline-flex items-center text-tutorYellow hover:text-tutorYellow-light transition-colors">
            View all tutors <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularTutors;


import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, MapPin, Star, BookOpen, CircleUser, Clock, ArrowUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

// Mock data for tutors
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
    availability: "Weekdays evenings, weekends",
    verified: true
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
    availability: "Flexible schedule",
    verified: true
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
    availability: "Mornings and weekends",
    verified: true
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
    availability: "Weekday evenings",
    verified: true
  },
  {
    id: 5,
    name: "Neha Gupta",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 4.6,
    reviews: 72,
    subjects: ["Hindi", "Sanskrit", "Indian History"],
    location: "Jaipur",
    experience: "9 years",
    price: "₹700/hr",
    description: "Literature expert with a passion for teaching Indian languages and cultural history. Helps students connect with their roots.",
    availability: "Afternoons and weekends",
    verified: false
  },
  {
    id: 6,
    name: "Aryan Patel",
    image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 4.5,
    reviews: 64,
    subjects: ["Economics", "Business Studies"],
    location: "Ahmedabad",
    experience: "7 years",
    price: "₹780/hr",
    description: "MBA graduate specializing in economics and business subjects. Helps students understand complex economic theories and business concepts.",
    availability: "Weekdays only",
    verified: true
  }
];

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", 
  "Computer Science", "English", "Hindi", "Sanskrit", 
  "History", "Geography", "Economics", "Business Studies"
];

const locations = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Jaipur", "Ahmedabad"];

const FindTutor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([500, 1000]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  
  return (
    <>
      <Helmet>
        <title>Find a Tutor | TutorEase</title>
        <meta name="description" content="Search for the perfect tutor based on subject, location, rating, and more." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Find Your Perfect <span className="gradient-text">Tutor</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Connect with experienced tutors who can help you achieve your learning goals.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-8">
              <div className="glass-card p-5 flex items-center">
                <Search className="text-gray-400 mr-2" />
                <Input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for subjects, topics, or skills..." 
                  className="input-field border-0 flex-1"
                />
                <Button className="ml-3 bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">Search</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Filters */}
              <div className="glass-card p-6 h-fit lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-white flex items-center">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </h2>
                  <Button variant="link" className="text-tutorYellow p-0 h-auto text-sm">
                    Reset
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Price Range (₹/hour)</h3>
                    <Slider 
                      value={priceRange} 
                      min={100} 
                      max={2000} 
                      step={50} 
                      onValueChange={setPriceRange}
                      className="my-5"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <Separator className="bg-tutorBlue-light" />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Subjects</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {subjects.slice(0, 6).map((subject) => (
                        <div key={subject} className="flex items-center">
                          <Checkbox 
                            id={`subject-${subject}`} 
                            className="text-tutorYellow border-gray-500" 
                          />
                          <label htmlFor={`subject-${subject}`} className="text-sm text-gray-300 ml-2">
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="text-tutorYellow p-0 h-auto text-xs mt-2">
                      View all subjects
                    </Button>
                  </div>
                  
                  <Separator className="bg-tutorBlue-light" />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Location</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {locations.slice(0, 4).map((location) => (
                        <div key={location} className="flex items-center">
                          <Checkbox 
                            id={`location-${location}`} 
                            className="text-tutorYellow border-gray-500" 
                          />
                          <label htmlFor={`location-${location}`} className="text-sm text-gray-300 ml-2">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="text-tutorYellow p-0 h-auto text-xs mt-2">
                      View all locations
                    </Button>
                  </div>
                  
                  <Separator className="bg-tutorBlue-light" />
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="verified-only" 
                      className="text-tutorYellow border-gray-500"
                      checked={onlyVerified}
                      onCheckedChange={setOnlyVerified}
                    />
                    <label htmlFor="verified-only" className="text-sm text-gray-300 ml-2">
                      Verified tutors only
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Tutor listings */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-300">
                    Showing <span className="text-white font-medium">{tutors.length}</span> tutors
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-tutorBlue-light text-gray-300">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Sort by: <span className="text-white ml-1 font-medium capitalize">{sortOption}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-tutorBlue-light border-tutorBlue-light">
                      {["relevance", "rating", "price: low to high", "price: high to low", "experience"].map((option) => (
                        <DropdownMenuItem
                          key={option}
                          className="text-gray-300 focus:text-white focus:bg-tutorBlue capitalize"
                          onClick={() => setSortOption(option)}
                        >
                          {option === sortOption && <Check className="h-4 w-4 mr-1" />}
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="space-y-6">
                  {tutors.map((tutor) => (
                    <div key={tutor.id} className="glass-card p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:flex-shrink-0 mb-4 sm:mb-0 flex sm:block justify-center">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-tutorYellow/20">
                              <img 
                                src={tutor.image} 
                                alt={tutor.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {tutor.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-tutorBlue-light border border-tutorBlue rounded-full p-1">
                                <Check className="h-4 w-4 text-tutorYellow" />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="sm:ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{tutor.name}</h3>
                              <p className="text-tutorYellow text-sm">{tutor.subjects.join(", ")}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center text-right">
                              <div className="flex items-center mr-3">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-white ml-1">{tutor.rating}</span>
                              </div>
                              <span className="text-gray-400">({tutor.reviews} reviews)</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                            <div className="flex items-center text-gray-400 text-sm">
                              <MapPin className="w-4 h-4 mr-1 text-tutorYellow/70" />
                              {tutor.location}
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock className="w-4 h-4 mr-1 text-tutorYellow/70" />
                              {tutor.experience}
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <BookOpen className="w-4 h-4 mr-1 text-tutorYellow/70" />
                              {tutor.availability}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-4 line-clamp-2">{tutor.description}</p>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <span className="text-white font-medium mb-3 sm:mb-0">{tutor.price}</span>
                            <div className="flex space-x-3 w-full sm:w-auto">
                              <Button variant="outline" className="border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10 flex-1 sm:flex-auto">
                                View Profile
                              </Button>
                              <Button className="bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark flex-1 sm:flex-auto">
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10">
                    Load More Tutors
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FindTutor;

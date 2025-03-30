// import React, { useState } from "react";
// import axios from "axios";
// import { Tutor } from "../types/Tutor";

// const FindTutor: React.FC = () => {
//   const [filters, setFilters] = useState({
//     searchTerm: "",
//     subject: "",
//     locations: "",
//     preferredMode: "",
//     sort: "",
//   });

//   const [tutors, setTutors] = useState<Tutor[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Handle form changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   // Fetch tutors based on filters
//   const fetchTutors = async () => {
//     setLoading(true);
//     setError(null);

//     const { searchTerm, locations, preferredMode, sort } = filters;
//     let url = `http://localhost:7000/api/students/tutor?`;

//     // Add query params dynamically
//     if (searchTerm) url += `searchTerm=${searchTerm}&`;
//     if (locations) url += `locations=${locations}&`;
//     if (preferredMode) url += `preferredMode=${preferredMode}&`;
//     if (sort) url += `sort=${sort}&`;

//     // Remove trailing "&"
//     url = url.replace(/&$/, "");

//     try {
//       const response = await axios.get<{ tutors: Tutor[] }>(url);
//       setTutors(response.data.tutors);
//     } catch (err) {
//       setError("Error fetching tutors. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     fetchTutors();
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Find Your Tutor</h1>

//       {/* Filter Form */}
//       <form onSubmit={handleSubmit} className="mb-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-4">
//         <input
//           type="text"
//           name="searchTerm"
//           placeholder="Search by name or subject"
//           value={filters.searchTerm}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         />
//         <input
//           type="text"
//           name="locations"
//           placeholder="Enter locations (e.g., Kolkata, Delhi)"
//           value={filters.locations}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         />
//         <select
//           name="preferredMode"
//           value={filters.preferredMode}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         >
//           <option value="">Select Mode</option>
//           <option value="online">Online</option>
//           <option value="offline">Offline</option>
//         </select>
//         <select
//           name="sort"
//           value={filters.sort}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         >
//           <option value="">Sort by</option>
//           <option value="rating">Rating</option>
//           <option value="fees: low to high">Fees: Low to High</option>
//           <option value="fees: high to low">Fees: High to Low</option>
//           <option value="experience">Experience</option>
//         </select>
//         <button 
//           type="submit" 
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
//         >
//           Search
//         </button>
//       </form>

//       {/* Loading and Error States */}
//       {loading && <p className="text-center text-gray-600 py-4">Loading tutors...</p>}
//       {error && <p className="text-center text-red-600 py-4">{error}</p>}

//       {/* Display Tutors */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {tutors.map((tutor) => (
//           <div key={tutor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-2">{tutor.name}</h2>
//               <div className="space-y-2 text-gray-600">
//                 <p>
//                   <span className="font-medium text-gray-700">Subject:</span> {tutor.subject}
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-700">Location:</span> {tutor.location}
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-700">Mode:</span> {tutor.preferredMode}
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-700">Fees:</span> ₹{tutor.fees}
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-700">Experience:</span> {tutor.experience || 0} years
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-700">Rating:</span>{" "}
//                   <span className="text-yellow-500">⭐</span> {tutor.rating || 0}/5
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* No Results Message */}
//       {!loading && tutors.length === 0 && !error && (
//         <p className="text-center text-gray-600 py-8">No tutors found. Try adjusting your search filters.</p>
//       )}
//     </div>
//   );
// };

// export default FindTutor;


import React, { useState } from "react";
import axios from "axios";
import { Tutor } from "../types/Tutor";
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

const FindTutor: React.FC = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    subject: "",
    locations: "",
    preferredMode: "",
    sort: "relevance",
  });
  
  const [priceRange, setPriceRange] = useState([500, 1000]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for filter options
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", 
    "Computer Science", "English", "Hindi", "Sanskrit", 
    "History", "Geography", "Economics", "Business Studies"];
  
  const locations = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Jaipur", "Ahmedabad"];

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fetch tutors based on filters
  const fetchTutors = async () => {
    setLoading(true);
    setError(null);

    const { searchTerm, subject, locations, preferredMode, sort } = filters;
    let url = `http://localhost:7000/api/students/tutor?`;

    // Add query params dynamically
    if (searchTerm) url += `searchTerm=${searchTerm}&`;
    if (subject) url += `subject=${subject}&`;
    if (locations) url += `locations=${locations}&`;
    if (preferredMode) url += `preferredMode=${preferredMode}&`;
    if (sort) url += `sort=${sort}&`;
    if (onlyVerified) url += `verified=true&`;
    url += `priceMin=${priceRange[0]}&priceMax=${priceRange[1]}&`;

    // Remove trailing "&"
    url = url.replace(/&$/, "");

    try {
      const response = await axios.get<{ tutors: Tutor[] }>(url);
      setTutors(response.data.tutors);
    } catch (err) {
      setError("Error fetching tutors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTutors();
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      subject: "",
      locations: "",
      preferredMode: "",
      sort: "relevance",
    });
    setPriceRange([500, 1000]);
    setOnlyVerified(false);
  };

  return (
    <div className="min-h-screen bg-tutorBlue">
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
            <form onSubmit={handleSubmit}>
              <div className="glass-card p-5 flex items-center">
                <Search className="text-gray-400 mr-2" />
                <Input 
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleChange}
                  placeholder="Search for subjects, topics, or skills..." 
                  className="input-field border-0 flex-1"
                />
                <Button type="submit" className="ml-3 bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark">Search</Button>
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Filters */}
            <div className="glass-card p-6 h-fit lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-white flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </h2>
                <Button 
                  variant="link" 
                  className="text-tutorYellow p-0 h-auto text-sm"
                  onClick={resetFilters}
                >
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
                          checked={filters.subject === subject}
                          onCheckedChange={() => setFilters({...filters, subject: filters.subject === subject ? "" : subject})}
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
                          checked={filters.locations === location}
                          onCheckedChange={() => setFilters({...filters, locations: filters.locations === location ? "" : location})}
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
                
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Mode</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="mode-online" 
                        className="text-tutorYellow border-gray-500"
                        checked={filters.preferredMode === "online"}
                        onCheckedChange={() => setFilters({...filters, preferredMode: filters.preferredMode === "online" ? "" : "online"})}
                      />
                      <label htmlFor="mode-online" className="text-sm text-gray-300 ml-2">
                        Online
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="mode-offline" 
                        className="text-tutorYellow border-gray-500"
                        checked={filters.preferredMode === "offline"}
                        onCheckedChange={() => setFilters({...filters, preferredMode: filters.preferredMode === "offline" ? "" : "offline"})}
                      />
                      <label htmlFor="mode-offline" className="text-sm text-gray-300 ml-2">
                        Offline
                      </label>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-tutorBlue-light" />
                
                <div className="flex items-center">
                  <Checkbox 
                    id="verified-only" 
                    className="text-tutorYellow border-gray-500"
                    checked={onlyVerified}
                    onCheckedChange={(checked) => setOnlyVerified(checked === true)}
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
                      Sort by: <span className="text-white ml-1 font-medium capitalize">{filters.sort}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-tutorBlue-light border-tutorBlue-light">
                    {["relevance", "rating", "fees: low to high", "fees: high to low", "experience"].map((option) => (
                      <DropdownMenuItem
                        key={option}
                        className="text-gray-300 focus:text-white focus:bg-tutorBlue capitalize"
                        onClick={() => setFilters({...filters, sort: option})}
                      >
                        {option === filters.sort && <Check className="h-4 w-4 mr-1" />}
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="text-tutorYellow animate-spin h-8 w-8 mx-auto mb-4">
                    <Clock />
                  </div>
                  <p className="text-gray-300">Loading tutors...</p>
                </div>
              )}
              
              {/* Error State */}
              {error && (
                <div className="glass-card p-6 text-center text-red-400">
                  <p>{error}</p>
                  <Button 
                    onClick={fetchTutors} 
                    className="mt-4 bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark"
                  >
                    Try Again
                  </Button>
                </div>
              )}
              
              {/* Empty State */}
              {!loading && !error && tutors.length === 0 && (
                <div className="glass-card p-8 text-center">
                  <div className="text-tutorYellow/50 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-white text-xl font-medium mb-2">No tutors found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your search filters to find more tutors.</p>
                  <Button 
                    onClick={resetFilters}
                    className="bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
              
              {/* Tutor Listings */}
              <div className="space-y-6">
                {tutors.map((tutor) => (
                  <div key={tutor._id} className="glass-card p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:flex-shrink-0 mb-4 sm:mb-0 flex sm:block justify-center">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-tutorYellow/20">
                            <img 
                              src={`/api/placeholder/96/96`} 
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
                            <p className="text-tutorYellow text-sm">{tutor.subject}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 flex items-center text-right">
                            <div className="flex items-center mr-3">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-white ml-1">{tutor.rating || 0}</span>
                            </div>
                            <span className="text-gray-400">(Reviews)</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                          <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-tutorYellow/70" />
                            {tutor.location}
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="w-4 h-4 mr-1 text-tutorYellow/70" />
                            {tutor.experience || 0} years
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <BookOpen className="w-4 h-4 mr-1 text-tutorYellow/70" />
                            {tutor.preferredMode}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {tutor.description || `Experienced tutor specializing in ${tutor.subject}. Available for ${tutor.preferredMode} sessions.`}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <span className="text-white font-medium mb-3 sm:mb-0">₹{tutor.fees}/hr</span>
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
              
              {tutors.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="border-tutorYellow/50 text-tutorYellow hover:bg-tutorYellow/10">
                    Load More Tutors
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindTutor;
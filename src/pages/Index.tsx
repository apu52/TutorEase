
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import RoadmapPreview from '@/components/home/RoadmapPreview';
import PopularTutors from '@/components/home/PopularTutors';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>TutorEase - Find Tutors & Create Learning Paths</title>
        <meta name="description" content="Connect with expert tutors, generate personalized learning roadmaps, and get AI-powered assistance for your educational goals." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <RoadmapPreview />
          <PopularTutors />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

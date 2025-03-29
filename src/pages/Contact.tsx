
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const ContactOption = ({ icon, title, description, value }) => (
  <div className="glass-card p-6 text-center">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 rounded-full bg-tutorYellow/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-1">{description}</p>
    <p className="text-tutorYellow">{value}</p>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubjectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, you would send this data to your backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: ''
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Us | TutorEase</title>
        <meta name="description" content="Have questions or feedback? Contact our team and we'll get back to you as soon as possible." />
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
                  Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Have questions or feedback? We'd love to hear from you. Our team is here to help.
                </p>
              </div>
            </div>
          </section>
          
          {/* Contact Options */}
          <section className="py-12 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContactOption 
                  icon={<MapPin className="h-6 w-6 text-tutorYellow" />}
                  title="Our Location"
                  description="Visit our main office"
                  value="123 Education Street, Knowledge City, Delhi"
                />
                <ContactOption 
                  icon={<Mail className="h-6 w-6 text-tutorYellow" />}
                  title="Email Us"
                  description="Send us an email anytime"
                  value="info@tutorEase.com"
                />
                <ContactOption 
                  icon={<Phone className="h-6 w-6 text-tutorYellow" />}
                  title="Call Us"
                  description="Mon-Fri from 9am to 6pm"
                  value="+91 98765 43210"
                />
              </div>
            </div>
          </section>
          
          {/* Contact Form and Map */}
          <section className="py-12 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                      <MessageSquare className="h-6 w-6 mr-2 text-tutorYellow" />
                      Send Us a Message
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                          className="input-field w-full"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="input-field w-full"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="input-field w-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          What are you contacting us about?
                        </label>
                        <RadioGroup
                          value={formData.subject}
                          onValueChange={handleSubjectChange}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="general" value="general" className="text-tutorYellow" />
                            <Label htmlFor="general" className="text-gray-300">General Inquiry</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="tutor" value="tutor" className="text-tutorYellow" />
                            <Label htmlFor="tutor" className="text-gray-300">Become a Tutor</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="support" value="support" className="text-tutorYellow" />
                            <Label htmlFor="support" className="text-gray-300">Technical Support</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="partnership" value="partnership" className="text-tutorYellow" />
                            <Label htmlFor="partnership" className="text-gray-300">Partnership</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          required
                          className="input-field w-full min-h-[120px]"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark group"
                      >
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  </div>
                </div>
                
                {/* Map Section */}
                <div>
                  <div className="glass-card p-6 h-full">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-tutorYellow" />
                      Find Us on the Map
                    </h2>
                    
                    <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-tutorBlue-light">
                      <div className="absolute inset-0 flex items-center justify-center bg-tutorBlue-light/80">
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-tutorYellow mx-auto mb-3" />
                          <p className="text-white font-medium mb-1">Google Maps Integration</p>
                          <p className="text-gray-400 text-sm">Will be implemented in the production version</p>
                          <div className="mt-3 animate-pulse text-tutorYellow text-xs">
                            Interactive map loading...
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <h3 className="text-lg font-medium text-white">Our Office Hours</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-300">Monday - Friday</p>
                          <p className="text-tutorYellow">9:00 AM - 6:00 PM</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Saturday</p>
                          <p className="text-tutorYellow">10:00 AM - 4:00 PM</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-300">Sunday</p>
                          <p className="text-tutorYellow">Closed</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm">
                        We're also available online 24/7 through our chatbot, and our support team responds to emails within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section (Optional) */}
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-tutorBlue-light/40 via-tutorBlue to-tutorBlue z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p className="text-gray-300">
                  Can't find the answer you're looking for? Reach out to our customer support team.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto glass-card p-8">
                <div className="space-y-6">
                  {[
                    {
                      question: "How do I become a tutor on the platform?",
                      answer: "To become a tutor, click on the 'Register' button and select the tutor option. You'll need to complete your profile, upload credentials, and pass our verification process. Once approved, you can start accepting students."
                    },
                    {
                      question: "Is the AI Chatbot available 24/7?",
                      answer: "Yes, our AI Learning Assistant is available 24/7 to help with your questions, create study plans, or recommend resources. However, for complex questions or personalized guidance, we recommend booking a session with a human tutor."
                    },
                    {
                      question: "How are tutors vetted?",
                      answer: "We have a comprehensive vetting process that includes credential verification, background checks, and subject knowledge assessment. Only tutors who meet our high standards are accepted on the platform."
                    },
                    {
                      question: "What payment methods do you accept?",
                      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All transactions are secure and encrypted."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-tutorBlue-light pb-6 last:border-0 last:pb-0">
                      <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
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

export default Contact;

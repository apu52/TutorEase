
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, Sparkles, BookOpen, BrainCircuit, Clock, CornerDownLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Sample conversation
const initialMessages = [
  {
    type: 'system',
    content: "Hi there! I'm your AI Learning Assistant. Ask me anything about your studies, and I'll help you find resources, explain concepts, or create a study plan. What would you like to learn today?"
  }
];

const examples = [
  "Create a study roadmap for Java programming",
  "Explain the concept of neural networks in simple terms",
  "What are some good resources to learn data structures?",
  "Help me understand the theory of relativity",
  "I'm struggling with calculus integration - can you help?",
  "Recommend books for learning machine learning"
];

const Chatbot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const demoResponses = {
        "Create a study roadmap for Java programming": (
          <div className="space-y-3">
            <p>Here's a structured roadmap for learning Java programming:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Java Basics (3-4 weeks)</strong>
                <ul className="list-disc pl-5 pt-1">
                  <li>Syntax, variables, data types</li>
                  <li>Control flow & loops</li>
                  <li>Methods and functions</li>
                </ul>
              </li>
              <li>
                <strong>Object-Oriented Programming (4 weeks)</strong>
                <ul className="list-disc pl-5 pt-1">
                  <li>Classes and objects</li>
                  <li>Inheritance, polymorphism, encapsulation</li>
                  <li>Interfaces and abstract classes</li>
                </ul>
              </li>
              <li>
                <strong>Java Collections & APIs (3 weeks)</strong>
                <ul className="list-disc pl-5 pt-1">
                  <li>Lists, Sets, Maps</li>
                  <li>Generics</li>
                  <li>Exception handling</li>
                </ul>
              </li>
              <li>
                <strong>Advanced Topics (4-6 weeks)</strong>
                <ul className="list-disc pl-5 pt-1">
                  <li>Multithreading & concurrency</li>
                  <li>File I/O and serialization</li>
                  <li>Java 8+ features (streams, lambdas)</li>
                </ul>
              </li>
              <li>
                <strong>Frameworks & Projects (ongoing)</strong>
                <ul className="list-disc pl-5 pt-1">
                  <li>Spring Boot</li>
                  <li>Hibernate ORM</li>
                  <li>Building a portfolio project</li>
                </ul>
              </li>
            </ol>
            <p className="pt-2">Would you like more details on any specific section of this roadmap?</p>
          </div>
        ),
        "Explain the concept of neural networks in simple terms": (
          <div>
            <p>Neural networks are like a digital version of your brain's thinking process. Imagine a system that works in layers:</p>
            <ol className="list-decimal pl-5 space-y-2 py-2">
              <li><strong>Input Layer:</strong> This receives information (like pixels of an image).</li>
              <li><strong>Hidden Layers:</strong> These process the information through connections (like neurons in your brain).</li>
              <li><strong>Output Layer:</strong> This produces an answer (like "this is a cat" when seeing a cat image).</li>
            </ol>
            <p>Each connection has a "weight" (importance) that adjusts as the network learns. When you train a neural network, you're basically showing it examples and letting it adjust these weights until it gets better at recognizing patterns.</p>
            <p className="pt-2">For instance, to identify cats, it might learn to recognize ears, whiskers, and fur patterns through these weighted connections.</p>
          </div>
        ),
        "default": (
          <div>
            <p>Thank you for your question! I'd be happy to help you with that. Could you provide a bit more information about your specific interests or challenges in this area so I can give you the most relevant guidance?</p>
          </div>
        )
      };
      
      // Find matching response or use default
      let responseContent = demoResponses["default"];
      for (const [key, value] of Object.entries(demoResponses)) {
        if (input.toLowerCase().includes(key.toLowerCase())) {
          responseContent = value;
          break;
        }
      }
      
      const aiMessage = { type: 'ai', content: responseContent };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };
  
  const handleExampleClick = (example) => {
    setInput(example);
  };
  
  return (
    <>
      <Helmet>
        <title>AI Learning Assistant | TutorEase</title>
        <meta name="description" content="Get personalized learning assistance, answers to your questions, and study resources from our AI chatbot." />
      </Helmet>
      
      <div className="min-h-screen bg-tutorBlue">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="glass-card p-5 sticky top-24">
                  <h2 className="text-white font-semibold flex items-center mb-4">
                    <BrainCircuit className="h-5 w-5 mr-2 text-tutorYellow" /> 
                    AI Learning Assistant
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-6">
                    Your 24/7 study buddy that can answer questions, explain concepts, and recommend learning resources.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-tutorYellow/20 flex items-center justify-center mr-3">
                        <BookOpen className="h-4 w-4 text-tutorYellow" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium">Subject Expert</h3>
                        <p className="text-gray-400 text-xs">Helps with any academic topic</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-tutorYellow/20 flex items-center justify-center mr-3">
                        <Sparkles className="h-4 w-4 text-tutorYellow" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium">Roadmap Builder</h3>
                        <p className="text-gray-400 text-xs">Creates learning paths for any skill</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-tutorYellow/20 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-tutorYellow" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium">Available 24/7</h3>
                        <p className="text-gray-400 text-xs">Get help whenever you need it</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-tutorBlue-light" />
                  
                  <div>
                    <h3 className="text-white text-sm font-medium mb-3">Limitations</h3>
                    <ul className="text-gray-400 text-xs space-y-2">
                      <li>• May occasionally provide incorrect information</li>
                      <li>• Limited knowledge of events after 2023</li>
                      <li>• Cannot solve complex mathematical equations</li>
                      <li>• Cannot access the internet or external systems</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Chat area */}
              <div className="lg:col-span-3">
                <div className="glass-card p-4 sm:p-6 h-[calc(100vh-220px)] flex flex-col">
                  {/* Messages area */}
                  <div className="flex-1 overflow-y-auto mb-4 pr-2">
                    <div className="space-y-6">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className={`h-8 w-8 ${message.type === 'user' ? 'ml-3' : 'mr-3'} flex-shrink-0`}>
                              {message.type === 'user' ? (
                                <div className="bg-tutorYellow h-full w-full flex items-center justify-center text-tutorBlue font-medium">
                                  U
                                </div>
                              ) : (
                                <div className="bg-tutorBlue-light h-full w-full flex items-center justify-center">
                                  <Sparkles className="h-4 w-4 text-tutorYellow" />
                                </div>
                              )}
                            </Avatar>
                            
                            <div 
                              className={`py-3 px-4 rounded-lg ${
                                message.type === 'user' 
                                  ? 'bg-tutorYellow text-tutorBlue' 
                                  : 'bg-tutorBlue-light/70 text-gray-200'
                              }`}
                            >
                              {typeof message.content === 'string' 
                                ? <p>{message.content}</p> 
                                : message.content}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {loading && (
                        <div className="flex justify-start">
                          <div className="flex max-w-[80%]">
                            <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
                              <div className="bg-tutorBlue-light h-full w-full flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-tutorYellow" />
                              </div>
                            </Avatar>
                            
                            <div className="py-3 px-4 rounded-lg bg-tutorBlue-light/70 text-gray-200">
                              <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-tutorYellow/70 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-tutorYellow/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-tutorYellow/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Example messages (shown when no conversation) */}
                    {messages.length === 1 && !loading && (
                      <div className="mt-8">
                        <h3 className="text-center text-gray-300 mb-4 flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 mr-2" /> 
                          Examples you can ask
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {examples.map((example, index) => (
                            <button
                              key={index}
                              className="text-left p-3 rounded-lg bg-tutorBlue-light/50 hover:bg-tutorBlue-light text-gray-300 hover:text-white text-sm transition-colors border border-tutorBlue-light"
                              onClick={() => handleExampleClick(example)}
                            >
                              "{example}"
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Input area */}
                  <div className="border-t border-tutorBlue-light pt-4">
                    <div className="flex items-center">
                      <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything about your studies..."
                        className="input-field flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!input.trim() || loading}
                        className="ml-3 bg-tutorYellow text-tutorBlue hover:bg-tutorYellow-dark"
                      >
                        {loading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-tutorBlue border-t-transparent" />
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" /> Send
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-center mt-3">
                      <CornerDownLeft className="h-3 w-3 text-gray-500 mr-1" />
                      <span className="text-xs text-gray-500">Press Enter to send</span>
                    </div>
                  </div>
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

export default Chatbot;

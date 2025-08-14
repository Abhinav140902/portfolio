import React, { useEffect, useState } from 'react';
import { 
  Code, 
  Database, 
  Brain, 
  MapPin, 
  Users, 
  Zap, 
  Github, 
  Linkedin, 
  Mail,
  ExternalLink,
  ChevronDown,
  Terminal,
  Cloud,
  Cpu,
  Globe
} from 'lucide-react';

const TypewriterText = ({ texts, className = "" }: { texts: string[], className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText === text) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  return <span className={className}>{currentText}<span className="animate-pulse">|</span></span>;
};

const SkillCard = ({ icon: Icon, name, category }: { icon: any, name: string, category: string }) => (
  <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
    <div className="flex items-center space-x-3">
      <Icon className="w-8 h-8 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
      <div>
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-gray-400">{category}</p>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, description, tech, features, githubUrl }: { 
  title: string, 
  description: string, 
  tech: string[], 
  features: string[],
  githubUrl?: string
}) => (
  <div className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.02]">
    <div className="flex items-start justify-between mb-4">
      <Brain className="w-8 h-8 text-cyan-400" />
      {githubUrl && (
        <a 
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300"
        >
          <Github className="w-5 h-5" />
        </a>
      )}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {tech.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
            {t}
          </span>
        ))}
      </div>
    </div>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start space-x-2 text-gray-300">
          <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Abhinav Tadepalli
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-16">
              <TypewriterText 
                texts={[
                  "Full Stack Developer",
                  "AI Application Developer", 
                  "Software Engineer",
                  "Innovation Builder"
                ]}
                className="font-light"
              />
            </div>
          </div>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building next-generation applications with cutting-edge AI integration, 
            full-stack development expertise, and a passion for innovative solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Abhinav140902" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/abhinav-tadepalli-471574214/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:abhinav140902@gmail.com" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate <span className="text-purple-400 font-semibold">Associate Software Engineer</span> at 
                <span className="text-cyan-400 font-semibold"> Matrack Inc</span>, where I specialize in building 
                sophisticated GPS/fleet tracking platforms and AI-powered applications.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                My expertise spans across full-stack development with a special focus on AI integration. 
                I've led the development of comprehensive CRM platforms, built innovative tracking solutions 
                with real-time analytics, and created cutting-edge AI applications.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Code className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Full Stack Development</h4>
                    <p className="text-gray-400 text-sm">End-to-end application development</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Brain className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">AI Integration</h4>
                    <p className="text-gray-400 text-sm">Intelligent application features</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">GPS & Tracking</h4>
                    <p className="text-gray-400 text-sm">Real-time location solutions</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">CRM Development</h4>
                    <p className="text-gray-400 text-sm">Customer management platforms</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <Terminal className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-mono">current_role.sh</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-gray-400">$ <span className="text-cyan-400">whoami</span></div>
                  <div className="text-white pl-2">Associate Software Engineer @ Matrack Inc</div>
                  
                  <div className="text-gray-400">$ <span className="text-cyan-400">expertise --list</span></div>
                  <div className="text-white pl-2">→ GPS/Fleet Tracking Platforms</div>
                  <div className="text-white pl-2">→ Real-time Analytics & Dashboards</div>
                  <div className="text-white pl-2">→ CRM Platform Development</div>
                  <div className="text-white pl-2">→ AI-Powered Applications</div>
                  
                  <div className="text-gray-400">$ <span className="text-cyan-400">status</span></div>
                  <div className="text-green-400 pl-2">Ready for new challenges ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {/* Matrack Inc */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Associate Software Engineer</h3>
                  <p className="text-cyan-400 text-lg font-semibold">Matrack Inc</p>
                  <p className="text-gray-400 text-sm">April 2024 - Present • San Ramon, California • Remote</p>
                </div>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                  Current Role
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-green-400 mr-2" />
                    GPS & Fleet Tracking Solutions
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Live tracking systems with real-time updates</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Advanced geofencing and alert systems</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Interactive heatmaps and mapping solutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Comprehensive analytics dashboards</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 text-purple-400 mr-2" />
                    CRM Platform Development
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Led full-stack CRM platform development</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Integrated payment processing systems</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Built scheduling and automation features</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Implemented AI-assisted communications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Daimler India Commercial Vehicles */}
            <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Intern</h3>
                      <p className="text-cyan-400 text-lg font-semibold">Daimler India Commercial Vehicles</p>
                      <p className="text-gray-400 text-sm">June 2023 - September 2023 • Chennai, Tamil Nadu • On-site</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 font-semibold">
                    Internship
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Web Development and Team Coordination</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Collaborated on commercial vehicle technology solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CISAI */}
            <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Intern</h3>
                      <p className="text-cyan-400 text-lg font-semibold">Centre for Internet Studies & Artificial Intelligence - CISAI</p>
                      <p className="text-gray-400 text-sm">February 2023 - May 2023 • Amritapuri • On-site</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 font-semibold">
                    Internship
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Front-End Development and VAPT (Vulnerability Assessment and Penetration Testing)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Research and development in AI and cybersecurity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amrita Hospital */}
            <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500/30 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Intern</h3>
                      <p className="text-cyan-400 text-lg font-semibold">Amrita Hospital, Faridabad</p>
                      <p className="text-gray-400 text-sm">August 2022 - August 2022 • Faridabad, Haryana • On-site</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 font-semibold">
                    Internship
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Negotiation and Event Management</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Healthcare technology and administrative systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Innovative projects showcasing blockchain, AI, full-stack development, and cutting-edge technology integration
            </p>
          </div>

          {/* Featured Project - Full Width */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Blockchain E-Voting System</h3>
                    <div className="flex items-center space-x-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full text-sm font-semibold">
                        Featured Project
                      </span>
                      <a 
                        href="https://github.com/Abhinav140902" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm font-semibold transition-colors duration-300 flex items-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                      <a 
                        href="https://ieeexplore.ieee.org/document/10838111" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-colors duration-300 flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>IEEE Paper</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Built and implemented a pioneering blockchain-based e-voting system with smart contracts, featuring real-time voting, transparent elections, and secure authentication. 
                <span className="text-cyan-400 font-semibold"> Published research findings in IEEE ASIANCON 2024 conference proceedings.</span>
              </p>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-purple-400 mr-2" />
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Full-stack implementation of blockchain e-voting platform</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Smart contracts for tamper-resistant vote recording and verification</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Real-time voting results with instant blockchain confirmation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Google authentication with Firebase for secure user verification</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">JWT-based access control for private organization voting</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Code className="w-5 h-5 text-cyan-400 mr-2" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Blockchain", "Smart Contracts", "Firebase", "MongoDB", "JWT", "React", "Node.js", "Web3"].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Research Publication
                    </h5>
                    <p className="text-gray-300 text-sm mb-3">
                      Published in IEEE ASIANCON 2024 conference proceedings
                    </p>
                    <a 
                      href="https://ieeexplore.ieee.org/document/10838111" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                    >
                      View IEEE Paper →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects - 2 Column Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <ProjectCard 
              title="AI-Powered Applicant Tracking System"
              description="Comprehensive AI-driven applicant tracking system with dual deployment options: cloud-based OpenAI API integration and local Ollama LLM for complete privacy and offline capabilities."
              tech={["GPT-4", "Ollama LLM", "FAISS", "Python", "OpenAI API", "LangChain", "NLP", "Vector Search"]}
              features={[
                "Dual AI backend: OpenAI GPT-4 for cloud deployment and Ollama LLM for local/offline use",
                "FAISS vector database for semantic search and candidate matching",
                "Hybrid search combining keyword matching and AI-powered analysis",
                "Advanced NLP for intelligent resume parsing and candidate evaluation",
                "Secure architecture with privacy-first local deployment option",
                "Real-time processing with scalable cloud and self-hosted solutions"
              ]}
              githubUrl="https://github.com/Abhinav140902"
            />

            <ProjectCard 
              title="TeamConnect - Full-stack Team Website"
              description="Developed a centralized team website during internship at Daimler India, facilitating streamlined project management, collaboration, and data analysis."
              tech={["ReactJS", "Node.js", "Project Management", "Data Visualization", "Team Collaboration"]}
              features={[
                "Centralized project tracking and task management system",
                "Automated graph generation for data analysis and reporting",
                "Meeting scheduling and team collaboration features",
                "Enhanced team efficiency through digital platform",
                "Professional development during corporate internship",
                "Cutting-edge ReactJS and Node.js implementation"
              ]}
              githubUrl="https://github.com/Abhinav140902"
            />

            <ProjectCard 
              title="Sentiment Analysis Model"
              description="Advanced sentiment analysis model using Artificial Neural Networks and Deep Learning techniques, achieving 99.29% accuracy on IMDB dataset."
              tech={["Deep Learning", "ANN", "Python", "NLP", "Machine Learning", "IMDB Dataset"]}
              features={[
                "99.29% accuracy on test set - exceptional performance",
                "Artificial Neural Network (ANN) architecture",
                "Trained on comprehensive IMDB movie review dataset",
                "Binary classification: Positive vs Negative sentiment",
                "Deep learning implementation for natural language processing",
                "Production-ready model for sentiment analysis applications"
              ]}
              githubUrl="https://github.com/Abhinav140902"
            />

            <ProjectCard 
              title="Lossless Data Compression Tool"
              description="Implemented Huffman coding algorithm for lossless data compression, demonstrating strong understanding of data structures and algorithms."
              tech={["Python", "Data Structures", "Algorithms", "Huffman Coding", "Compression"]}
              features={[
                "Huffman coding algorithm implementation for optimal compression",
                "Variable-length code assignment based on character frequencies",
                "Lossless compression ensuring data integrity",
                "Strong foundation in data structures and algorithms",
                "Efficient memory usage and processing optimization",
                "Practical tool for data compression applications"
              ]}
              githubUrl="https://github.com/Abhinav140902"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Stack
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard icon={Code} name="Python" category="Backend & AI" />
            <SkillCard icon={Globe} name="React" category="Frontend" />
            <SkillCard icon={Code} name="Node.js" category="Backend" />
            <SkillCard icon={Code} name="PHP" category="Backend" />
            <SkillCard icon={Database} name="MySQL" category="Database" />
            <SkillCard icon={Cloud} name="AWS" category="Cloud Platform" />
            <SkillCard icon={Brain} name="OpenAI API" category="AI Integration" />
            <SkillCard icon={Brain} name="LangChain" category="AI Framework" />
            <SkillCard icon={Cpu} name="FAISS" category="Vector Search" />
            <SkillCard icon={Cloud} name="Docker" category="DevOps" />
            <SkillCard icon={MapPin} name="Google Maps API" category="Location Services" />
            <SkillCard icon={MapPin} name="HERE Maps API" category="Location Services" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to collaborate on innovative projects or discuss opportunities? 
            Let's build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:abhinav140902@gmail.com"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </a>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Abhinav140902"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:text-purple-400 transition-colors duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/abhinav-tadepalli-471574214/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Abhinav Tadepalli. Crafted with passion and innovation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
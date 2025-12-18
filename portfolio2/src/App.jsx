import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Cpu, 
  Layers, 
  Award, 
  BookOpen, 
  Terminal, 
  User, 
  Briefcase,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* DATA SECTIONS                              */
/* -------------------------------------------------------------------------- */

const DATA = {
  profile: {
    name: "Yashraj Rastogi",
    title: "Full Stack Developer & UI/UX Enthusiast",
    summary: "Motivated B.Tech Computer Science undergraduate with a strong foundation in Web Development. Proficient in Java, JavaScript, Python, and C with a proven track record in hackathons like GDG India Solution Challenge and SIH 2025. Experienced in full-stack development and UI design, combining technical expertise with leadership skills.",
    email: "yashrajrastogi24@gmail.com",
    phone: "+91 7355788131",
    socials: {
      github: "https://github.com/yashraj-rastogi",
      linkedin: "https://in.linkedin.com/in/yashraj-rastogi",
      website: "https://yashraj-rastogi.vercel.app/"
    }
  },
  education: [
    {
      school: "Shri Ramswaroop Memorial College of Engineering & Management",
      degree: "B.Tech in Computer Science & Engineering",
      year: "2024 - 2028",
      details: "Graduation"
    },
    {
      school: "City Convent School",
      degree: "Intermediate Science",
      year: "2022 - 2023",
      details: "Percentage: 90.25% (CGPA: 9.02)"
    },
    {
      school: "City Convent School",
      degree: "High School",
      year: "2020 - 2021",
      details: "Percentage: 84% (CGPA: 8.4)"
    }
  ],
  skills: [
    { category: "Frontend", items: ["React.js", "JavaScript", "HTML/CSS", "Tailwind", "Figma", "Canva"] },
    { category: "Backend", items: ["Node.js", "Django", "Python", "Java", "C"] },
    { category: "Core", items: ["Data Structures", "Algorithms", "Project Management"] }
  ],
  projects: [
    {
      title: "Heat Sense",
      type: "Hackathon Project",
      description: "Developed for the GDG on Campus Solution Challenge. An innovative solution tackling environmental heat monitoring.",
      tech: ["IoT", "Web Dashboard"],
      link: "#"
    },
    {
      title: "AcadVault - SIH 2025",
      type: "Hackathon Project",
      description: "Smart India Hackathon 2025 project. Cleared internal rounds with a robust academic resource management system.",
      tech: ["Full Stack", "Database"],
      link: "https://acad-vault-fe.vercel.app/"
    },
    {
      title: "Portfolio Website",
      type: "Personal Project",
      description: "A digital showcase of my work, methodology, and technical journey. You are currently viewing it!",
      tech: ["React", "UI/UX"],
      link: "https://yashraj-rastogi.vercel.app/"
    }
  ],
  experience: [
    {
      role: "Technical Coordinator",
      org: "AlgoZenith Chapter SRMCEM",
      description: "Organized Vibe Coding Contest, Algo-Arena (DSA Contest), and various tech workshops."
    },
    {
      role: "Volunteer",
      org: "CSI SRMCEM D'coders",
      description: "Volunteered in organizing workshops on Git and GitHub."
    }
  ],
  certifications: [
    { name: "Web Development", link: "https://www.sololearn.com/en/certificates/CC-X5N51R2O" },
    { name: "Java Programming", link: "https://www.sololearn.com/en/certificates/CT-CD5ATFDK" },
    { name: "Solution Challenge 2025", link: "https://certificate.hack2skill.com/user/gdgscsubmissions/2025H2S01GSC-I11860" },
    { name: "HeLa Crossroads", link: "https://cdn.certifier.io/b997f3e6-396a-47f5-a85b-cd713f073bb1/credentials/01kcbdyn4bx62sq6j50tym2z6k/designs/01kcbdrf9d5qm27fy65eavvwaw/pKcgdumuQo.png" }
  ]
};

/* -------------------------------------------------------------------------- */
/* 3D BACKGROUND                               */
/* -------------------------------------------------------------------------- */

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.002); // Deep dark fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x00f3ff); // Cyan
    const color2 = new THREE.Color(0xbd00ff); // Purple

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Geometric Shapes (Floating Icosahedrons)
    const shapes = [];
    const geometryShape = new THREE.IcosahedronGeometry(1, 0);
    const materialShape = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.3 });

    for(let i=0; i<5; i++) {
        const mesh = new THREE.Mesh(geometryShape, materialShape);
        mesh.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        mesh.scale.setScalar(Math.random() * 2 + 1);
        scene.add(mesh);
        shapes.push({ mesh, speed: Math.random() * 0.02, rotSpeed: Math.random() * 0.02 });
    }


    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      particles.rotation.y = time * 0.1;
      particles.rotation.x = mouseX * 0.2;
      particles.rotation.z = mouseY * 0.2;

      // Gentle camera sway
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate shapes
      shapes.forEach(item => {
          item.mesh.rotation.x += item.rotSpeed;
          item.mesh.rotation.y += item.rotSpeed;
          item.mesh.position.y += Math.sin(time + item.mesh.position.x) * 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount) mount.removeChild(renderer.domElement);
      // Cleanup three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050510] pointer-events-none" />;
};

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-10 group">
    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
      {children}
    </h2>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`
    bg-gray-900/40 backdrop-blur-md border border-white/10 p-6 rounded-xl
    hover:border-cyan-500/50 hover:bg-gray-800/60 transition-all duration-300
    hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]
    ${className}
  `}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
    {children}
  </span>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050510]/90 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="https://drive.google.com/file/d/1Xxhisdt-oXTG-e2Gdy1v1MAbyghd-tSC/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold hover:bg-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2"
        >
          <ExternalLink size={16} /> Resume
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#050510] border-b border-white/10 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-300 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN APP                                    */
/* -------------------------------------------------------------------------- */

const ProjectCarousel = ({ projects }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastRotation, setLastRotation] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(lastRotation + delta * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastRotation(rotation);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation(lastRotation + delta * 0.5);
  };

  // Duplicate projects to create a fuller circle if there are few
  const displayProjects = projects.length < 6 
    ? [...projects, ...projects, ...projects].slice(0, 6) 
    : projects;
  
  const itemCount = displayProjects.length;
  const radius = 280; // Distance from center

  return (
    <div 
      className="carousel-container py-20 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div 
        className="carousel-strip"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {displayProjects.map((project, idx) => {
          const angle = (360 / itemCount) * idx;
          return (
            <div 
              key={idx} 
              className="carousel-item"
              style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
            >
              <Card className="flex flex-col h-full group bg-gray-900 backdrop-blur-md border-cyan-500/20 p-3">
                <div className="h-24 mb-2 overflow-hidden rounded-lg bg-gray-800 relative shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${idx % 3 === 0 ? 'from-orange-500/20 to-red-600/20' : idx % 3 === 1 ? 'from-blue-500/20 to-cyan-600/20' : 'from-purple-500/20 to-pink-600/20'}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                        <a href={project.link} className="flex items-center gap-2 px-2 py-1 bg-white text-black rounded-full font-bold text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View <ExternalLink size={12}/>
                        </a>
                    </div>
                    <div className="absolute bottom-0 left-0 p-2">
                        <div className="p-1 bg-black/50 backdrop-blur rounded-lg">
                            <Code size={14} className="text-white"/>
                        </div>
                    </div>
                </div>
                
                <h3 className="text-base font-bold text-white mb-1 leading-tight">{project.title}</h3>
                <p className="text-cyan-400 text-[10px] mb-1">{project.type}</p>
                <p className="text-gray-400 text-[10px] mb-2 flex-grow line-clamp-3 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-auto">
                    {project.tech.map((tech) => (
                        <span key={tech} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-gray-300 rounded border border-white/5">
                            {tech}
                        </span>
                    ))}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3D MODEL COMPONENT                          */
/* -------------------------------------------------------------------------- */

const HumanoidModel = () => {
  // Load the GLB model from the public folder
  // Ensure your file is named 'humanoid.glb' and placed in the public/ folder
  const { scene } = useGLTF('/humanoid.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Automatic rotation
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.5} position={[0, -0.5, 0]} />;
};

/* -------------------------------------------------------------------------- */
/* MAIN APP                                    */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-white">
      <ThreeBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 z-10">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
                {DATA.profile.name}
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-400 font-light">
                {DATA.profile.title}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8">
                <a 
                    href="#projects"
                    className="px-8 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                    View Work
                </a>
                <a 
                    href="#contact"
                    className="px-8 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/10 transition-colors text-white"
                >
                    Contact Me
                </a>
            </div>
          </div>

          {/* 3D Model Container */}
          <div className="h-[600px] w-full hidden lg:block z-10">
             <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <HumanoidModel />
                <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
             </Canvas>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-gray-500" />
        </div>
      </section>

      <main className="container mx-auto px-6 py-20 space-y-32 relative z-10">
        
        {/* About Section */}
        <section id="about" className="max-w-4xl mx-auto">
            <SectionTitle icon={User}>About Me</SectionTitle>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 leading-relaxed text-lg">
                <p>{DATA.profile.summary}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-800 p-3 rounded-full"><BookOpen className="text-cyan-400" size={20}/></div>
                        <div>
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="text-white font-medium">{DATA.education[0].degree}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-800 p-3 rounded-full"><Briefcase className="text-purple-400" size={20}/></div>
                        <div>
                            <p className="text-sm text-gray-500">Focus</p>
                            <p className="text-white font-medium">Web Dev & App Dev</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
            <SectionTitle icon={Cpu}>Technical Arsenal</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DATA.skills.map((skillGroup, idx) => (
                    <Card key={idx} className="h-full">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-3">
                            {skillGroup.items.map((skill) => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </section>

        {/* Experience & Education Grid */}
        <section id="experience">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Education */}
                <div>
                    <SectionTitle icon={BookOpen}>Education</SectionTitle>
                    <div className="space-y-6">
                        {DATA.education.map((edu, idx) => (
                            <div key={idx} className="relative pl-8 border-l-2 border-white/10 pb-6 last:pb-0">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                                <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                                <p className="text-cyan-400 mt-1">{edu.degree}</p>
                                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                    <span>{edu.year}</span>
                                    <span>{edu.details}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience & Responsibilities */}
                <div>
                    <SectionTitle icon={Briefcase}>Experience</SectionTitle>
                    <div className="space-y-4">
                        {DATA.experience.map((exp, idx) => (
                            <Card key={idx}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                    <span className="text-xs text-cyan-400 px-2 py-1 bg-cyan-500/10 rounded">{exp.org}</span>
                                </div>
                                <p className="text-sm text-gray-400">{exp.description}</p>
                            </Card>
                        ))}
                        
                        <div className="pt-6 relative z-20">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Award className="text-purple-400" /> Certifications
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {DATA.certifications.map((cert, idx) => (
                                    <a 
                                        key={idx} 
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-xs border border-purple-500/30 text-purple-300 rounded hover:bg-purple-500/10 transition-colors flex items-center gap-1"
                                    >
                                        {cert.name} <ExternalLink size={10} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="overflow-hidden">
            <SectionTitle icon={Layers}>Featured Projects</SectionTitle>
            <ProjectCarousel projects={DATA.projects} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-20">
            <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-8 md:p-16 text-center overflow-hidden relative">
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    
                    <a 
                        href={`mailto:${DATA.profile.email}`} 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <Mail size={20}/> Say Hello
                    </a>

                    <div className="flex justify-center gap-6 mt-12">
                        <a href={DATA.profile.socials.github} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                            <Github size={24} />
                        </a>
                        <a href={DATA.profile.socials.linkedin} className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-white/10 rounded-full">
                            <Linkedin size={24} />
                        </a>
                        <a href={DATA.profile.socials.website} className="text-gray-400 hover:text-purple-400 transition-colors p-2 hover:bg-white/10 rounded-full">
                            <ExternalLink size={24} />
                        </a>
                    </div>
                </div>
                
                {/* Decorative Background Glows */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
            </div>
        </section>

      </main>
      
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10 bg-[#050510]">
        <p>© {new Date().getFullYear()} Yashraj Rastogi. Built with React & Three.js</p>
      </footer>
    </div>
  );
}

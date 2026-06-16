"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  Code2,
  Download,
  FileText,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import * as THREE from "three";

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];
const cvUrl = "/Saleh-Mohiuddin-CV.pdf";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "PHP",
  "MySQL",
  "MongoDB",
  "Tailwind CSS",
  "Git",
];

const skillGroups = [
  {
    title: "Frontend",
    accent: "from-blue-500 to-cyan-400",
    description: "Clean interfaces, responsive layouts, and interactive sections.",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    accent: "from-violet-500 to-fuchsia-400",
    description: "Server logic, APIs, authentication flows, and PHP project work.",
    items: ["Node.js", "Express.js", "PHP", "REST APIs"],
  },
  {
    title: "Database & Tools",
    accent: "from-emerald-500 to-teal-400",
    description: "Data workflows, CRUD modules, version control, and deployments.",
    items: ["MySQL", "MongoDB", "Git", "GitHub"],
  },
];

const projects = [
  {
    title: "School Management System",
    type: "Real-life Project",
    description:
      "A PHP-based school management system for student records, attendance, fees, staff modules, and reports.",
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    liveUrl: "https://school.digitalcrowdtech.in/",
  },
  {
    title: "Courier Management System",
    type: "Real-life Project",
    description:
      "Booking, shipment tracking, delivery status, branch workflows, and admin reporting for courier teams.",
    stack: ["React", "Express.js", "MongoDB"],
    liveUrl: "https://courierservires-zhis.vercel.app",
  },
  {
    title: "Food Delivery Platform",
    type: "Real-life Project",
    description:
      "Restaurant dashboard, customer ordering, delivery partner flow, and payment-ready order management.",
    stack: ["React", "Node.js", "MySQL"],
    links: [
      { label: "Customer Website", url: "https://ruchi-beige.vercel.app/" },
      { label: "Restaurant Panel", url: "https://ruchipatner.vercel.app/" },
      { label: "Admin Panel", url: "" },
    ],
  },
  {
  title: "Business Website",
  type: "Corporate Website",
  description:
    "Developed a sleek and scalable corporate website focused on brand visibility, customer engagement, and business growth. Features responsive layouts, SEO-friendly architecture, optimized performance, and a seamless user experience across all devices.",
  stack: ["Next.js", "Tailwind CSS", "SEO", "Responsive UI/UX", "Web Performance"],
  liveUrl: "https://digitalcrowdtech.in/",
},
  {
    title: "Mini Portfolio UI",
    type: "Mini Project",
    description: "Developed a sleek and scalable corporate website focused on brand visibility, customer engagement, and business growth. Features responsive layouts, SEO-friendly architecture, optimized performance, and a seamless user experience across all devices.",
    stack: ["React", "Tailwind CSS"],
    liveUrl: "https://digitalcrowdtech.in/",
  },
];

const majorProjects = projects.filter((project) => project.type === "Real-life Project");
const miniProjects = projects.filter((project) => project.type === "Mini Project");

function createParticlePositions(count) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 6 + (index % 13) * 0.35;
    const angle = index * 0.47;
    const height = ((index % 29) - 14) * 0.16;

    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = height;
    positions[index * 3 + 2] = Math.sin(angle) * radius - 2;
  }

  return positions;
}

export default function Page() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const mountRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const sections = navItems.map((item) => item.toLowerCase());

    const handleScroll = () => {
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const top = element.offsetTop - 120;
        const bottom = top + element.offsetHeight;
        return window.scrollY >= top && window.scrollY < bottom;
      });

      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    camera.position.set(0, 0.15, 8);

    const coreGeometry = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.55,
      roughness: 0.22,
      metalness: 0.75,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(2.7, 0.1, -1.5);
    scene.add(core);

    const wireGeometry = new THREE.IcosahedronGeometry(1.38, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.36,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    core.add(wire);

    const ringOne = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.025, 32, 160),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.8 })
    );
    ringOne.position.copy(core.position);
    ringOne.rotation.x = Math.PI / 2.8;
    scene.add(ringOne);

    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.022, 32, 160),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.75 })
    );
    ringTwo.position.copy(core.position);
    ringTwo.rotation.y = Math.PI / 3;
    scene.add(ringTwo);

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(createParticlePositions(900), 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    const keyLight = new THREE.PointLight(0xffffff, 2.2);
    keyLight.position.set(4, 4, 6);
    const accentLight = new THREE.PointLight(0x8b5cf6, 1.8);
    accentLight.position.set(-4, -2, 3);
    scene.add(ambientLight, keyLight, accentLight);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const isLight = themeRef.current === "light";

      coreMaterial.color.setHex(isLight ? 0x2563eb : 0x3b82f6);
      coreMaterial.emissive.setHex(isLight ? 0x93c5fd : 0x1d4ed8);
      wireMaterial.color.setHex(isLight ? 0x1d4ed8 : 0x93c5fd);
      particlesMaterial.color.setHex(isLight ? 0x2563eb : 0x60a5fa);
      ringOne.material.color.setHex(isLight ? 0x7c3aed : 0x8b5cf6);
      ringTwo.material.color.setHex(isLight ? 0x0891b2 : 0x06b6d4);

      core.rotation.x = elapsed * 0.38;
      core.rotation.y = elapsed * 0.52;
      ringOne.rotation.z = elapsed * 0.42;
      ringTwo.rotation.x = elapsed * 0.28;
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.22) * 0.08;

      camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.035;
      camera.position.y += (-pointer.y * 0.25 + 0.15 - camera.position.y) * 0.035;
      camera.lookAt(0.7, 0, -1.5);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      coreGeometry.dispose();
      wireGeometry.dispose();
      ringOne.geometry.dispose();
      ringTwo.geometry.dispose();
      particlesGeometry.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      ringOne.material.dispose();
      ringTwo.material.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const isLight = theme === "light";

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-[#f7f3eb] text-[#15110d]" : "bg-[#050712] text-white"
      }`}
    >
      <div
        aria-hidden="true"
        ref={mountRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-0 transition-colors duration-500 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(247,243,235,0.94))]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_35%),linear-gradient(180deg,rgba(5,7,18,0.45),rgba(5,7,18,0.94))]"
        }`}
      />

      <div className="relative z-10">
        <header
          className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-500 ${
            isLight
              ? "border-black/10 bg-[#f7f3eb]/78"
              : "border-white/10 bg-[#050712]/72"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
            <button
              className="text-left"
              onClick={() => scrollToSection("home")}
              type="button"
            >
              <span className="block text-xl font-black tracking-tight">Saleh</span>
              <span
                className={`block text-xs font-bold uppercase tracking-[0.28em] ${
                  isLight ? "text-blue-700" : "text-blue-300"
                }`}
              >
                Portfolio
              </span>
            </button>

            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/8 p-1 md:flex">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const active = activeSection === id;

                return (
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      active
                        ? isLight
                          ? "bg-[#15110d] text-white"
                          : "bg-white text-[#050712]"
                        : isLight
                          ? "text-[#5f574c] hover:bg-black/5 hover:text-[#15110d]"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                    key={item}
                    onClick={() => scrollToSection(id)}
                    type="button"
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                aria-label="Toggle dark and light mode"
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-black transition hover:scale-105 ${
                  isLight
                    ? "border-black/10 bg-white text-[#15110d]"
                    : "border-white/10 bg-white/10 text-white"
                }`}
                onClick={() => setTheme(isLight ? "dark" : "light")}
                type="button"
              >
                <span>{isLight ? "Light" : "Dark"}</span>
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full ${
                    isLight ? "bg-[#15110d] text-white" : "bg-white text-[#050712]"
                  }`}
                >
                  {isLight ? "L" : "D"}
                </span>
              </button>
              <button
                className="hidden rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:scale-105 sm:block"
                onClick={() => scrollToSection("contact")}
                type="button"
              >
                Hire Me
              </button>
            </div>
          </nav>
        </header>

        <section
          className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr]"
          id="home"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className={`mb-5 inline-flex rounded-full border px-4 py-2 text-sm font-black ${
                isLight
                  ? "border-blue-200 bg-white/70 text-blue-800"
                  : "border-blue-400/30 bg-blue-500/10 text-blue-200"
              }`}
            >
              1 year experience at Dev Solution
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Full stack developer building attractive 3D web experiences.
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-8 ${
                isLight ? "text-[#5f574c]" : "text-white/68"
              }`}
            >
              I am Saleh Mohiuddin, a web developer with 1 year of hands-on
              experience at Dev Solution. I build responsive websites,
              dashboards, ERP modules, and business software with React,
              Next.js, Node.js, PHP, and MySQL.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3 text-sm font-black text-white shadow-xl shadow-blue-600/25 transition hover:scale-105"
                onClick={() => scrollToSection("projects")}
                type="button"
              >
                View Projects
              </button>
              <button
                className={`rounded-full border px-7 py-3 text-sm font-black transition hover:scale-105 ${
                  isLight
                    ? "border-black/15 bg-white/70 text-[#15110d]"
                    : "border-white/15 bg-white/10 text-white"
                }`}
                onClick={() => scrollToSection("contact")}
                type="button"
              >
                Contact Me
              </button>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["1 year", "Dev Solution"],
                ["10+", "Technologies"],
                ["5", "Projects"],
              ].map(([value, label]) => (
                <div
                  className={`rounded-2xl border p-4 backdrop-blur ${
                    isLight
                      ? "border-black/10 bg-white/65"
                      : "border-white/10 bg-white/[0.07]"
                  }`}
                  key={label}
                >
                  <p className="text-2xl font-black">{value}</p>
                  <p className={isLight ? "text-sm text-[#6f675c]" : "text-sm text-white/55"}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-full bg-blue-500/20 blur-3xl" />
            <div
              className={`relative rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl ${
                isLight
                  ? "border-black/10 bg-white/70 shadow-blue-900/10"
                  : "border-white/10 bg-white/[0.08] shadow-blue-950/30"
              }`}
            >
              <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 p-[1px]">
                <div
                  className={`rounded-[1.45rem] p-7 ${
                    isLight ? "bg-[#f7f3eb]/95" : "bg-[#070918]/95"
                  }`}
                >
                  <p className={isLight ? "text-sm font-bold text-blue-800" : "text-sm font-bold text-blue-200"}>
                    Current focus
                  </p>
                  <h2 className="mt-3 text-3xl font-black">
                    Modern portfolio sites, admin panels, and business apps.
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {["Clean UI", "3D Visuals", "Responsive", "Fast Builds"].map((item) => (
                      <div
                        className={`rounded-2xl border p-4 ${
                          isLight
                            ? "border-black/10 bg-white/70"
                            : "border-white/10 bg-white/[0.06]"
                        }`}
                        key={item}
                      >
                        <p className="font-black">{item}</p>
                        <p className={isLight ? "mt-1 text-sm text-[#6f675c]" : "mt-1 text-sm text-white/50"}>
                          Production-ready detail
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <Section id="about" isLight={isLight} title="About Me">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <Panel isLight={isLight}>
              <p className={isLight ? "leading-8 text-[#5f574c]" : "leading-8 text-white/68"}>
                I am a full stack web developer with 1 year of experience at
                Dev Solution. I enjoy turning business needs into simple,
                attractive, and maintainable web applications.
              </p>
              <p className={isLight ? "mt-4 leading-8 text-[#5f574c]" : "mt-4 leading-8 text-white/68"}>
                My work includes portfolio websites, ERP-style systems,
                management dashboards, courier workflows, school modules, and
                custom tools for real teams.
              </p>
            </Panel>
            <Panel isLight={isLight}>
              <div className="space-y-4">
                <MiniStat label="Experience" value="1 year at Dev Solution" />
                <MiniStat label="Location" value="Hyderabad, India" />
                <MiniStat label="Availability" value="Full time and freelance" />
              </div>
            </Panel>
          </div>
        </Section>

        <Section id="skills" isLight={isLight} title="Skills">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <Panel isLight={isLight}>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-500">
                My Toolkit
              </p>
              <h3 className="mt-3 text-3xl font-black">
                I use practical tools to build attractive and useful web apps.
              </h3>
              <p className={isLight ? "mt-4 leading-8 text-[#5f574c]" : "mt-4 leading-8 text-white/62"}>
                My strongest work is combining frontend design with backend
                logic and database workflows, especially for portfolio sites,
                PHP systems, dashboards, and management software.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["UI", "Design"],
                  ["API", "Logic"],
                  ["DB", "Data"],
                ].map(([value, label]) => (
                  <div
                    className={`rounded-2xl border p-4 text-center ${
                      isLight
                        ? "border-black/10 bg-white/70"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                    key={label}
                  >
                    <p className="text-2xl font-black text-blue-500">{value}</p>
                    <p className={isLight ? "mt-1 text-xs font-bold text-[#6f675c]" : "mt-1 text-xs font-bold text-white/50"}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>

            <div className="grid gap-4">
              {skillGroups.map((group) => (
                <div
                  className={`group rounded-[1.5rem] border p-5 backdrop-blur-xl transition hover:-translate-y-1 ${
                    isLight
                      ? "border-black/10 bg-white/72 shadow-lg shadow-blue-900/5"
                      : "border-white/10 bg-white/[0.07] shadow-xl shadow-blue-950/20"
                  }`}
                  key={group.title}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${group.accent}`} />
                      <h3 className="mt-3 text-2xl font-black">{group.title}</h3>
                      <p className={isLight ? "mt-2 leading-7 text-[#5f574c]" : "mt-2 leading-7 text-white/58"}>
                        {group.description}
                      </p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
                        isLight ? "bg-blue-50 text-blue-800" : "bg-blue-500/15 text-blue-200"
                      }`}
                    >
                      {group.items.length} skills
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        className={`rounded-full border px-4 py-2 text-sm font-black transition group-hover:scale-[1.02] ${
                          isLight
                            ? "border-black/10 bg-white/80 text-[#15110d]"
                            : "border-white/10 bg-white/[0.07] text-white"
                        }`}
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {skills.slice(0, 12).map((skill) => (
              <div
                className={`rounded-2xl border px-3 py-3 text-center text-xs font-black transition hover:-translate-y-1 ${
                  isLight
                    ? "border-black/10 bg-white/70 text-[#15110d] shadow-sm"
                    : "border-white/10 bg-white/[0.07] text-white"
                }`}
                key={skill}
              >
                {skill}
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" isLight={isLight} title="Experience">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Panel isLight={isLight}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-500">
                      Dev Solution
                    </p>
                    <h3 className="mt-2 text-4xl font-black tracking-tight">
                      Web Developer
                    </h3>
                    <p className={isLight ? "mt-4 max-w-3xl text-lg leading-8 text-[#5f574c]" : "mt-4 max-w-3xl text-lg leading-8 text-white/68"}>
                      1 year of practical development experience building and
                      improving responsive websites, frontend interfaces,
                      backend features, dashboards, and database-connected
                      workflows.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2 text-sm font-black text-white">
                    1 year experience
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Frontend", "Responsive pages, UI sections, and modern layouts."],
                    ["Backend", "APIs, PHP features, Node.js flows, and form handling."],
                    ["Database", "MySQL tables, CRUD workflows, and project data."],
                  ].map(([title, text]) => (
                    <div
                      className={`rounded-2xl border p-4 ${
                        isLight
                          ? "border-black/10 bg-white/70"
                          : "border-white/10 bg-white/[0.06]"
                      }`}
                      key={title}
                    >
                      <p className="font-black">{title}</p>
                      <p className={isLight ? "mt-2 text-sm leading-6 text-[#6f675c]" : "mt-2 text-sm leading-6 text-white/52"}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel isLight={isLight}>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-violet-500">
                What I Worked On
              </p>
              <ul className={isLight ? "mt-5 space-y-4 text-[#5f574c]" : "mt-5 space-y-4 text-white/68"}>
                {[
                  "Built attractive website sections with clean responsive design.",
                  "Worked on PHP and MySQL project features for real use cases.",
                  "Improved dashboard pages, forms, cards, and user workflows.",
                  "Connected frontend UI with backend data and project logic.",
                ].map((item) => (
                  <li className="flex gap-3 leading-7" key={item}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/70">
                  Current Level
                </p>
                <p className="mt-2 text-2xl font-black">
                  Growing full stack developer ready for real projects.
                </p>
              </div>
            </Panel>
          </div>
        </Section>

        <Section id="projects" isLight={isLight} title="Projects">
          <div className="space-y-10">
            <div>
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-500">
                    Major Websites
                  </p>
                  <h3 className="mt-2 text-3xl font-black">Real-life project work</h3>
                </div>
                <p className={isLight ? "max-w-xl text-[#5f574c]" : "max-w-xl text-white/58"}>
                  These are the main business systems and client-style websites.
                  Add your live website links here.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {majorProjects.map((project) => (
                  <ProjectCard
                    isLight={isLight}
                    key={project.title}
                    project={project}
                    variant="major"
                  />
                ))}
              </div>
            </div>

            <div
              className={`rounded-[2rem] border p-5 md:p-7 ${
                isLight
                  ? "border-black/10 bg-white/45"
                  : "border-white/10 bg-white/[0.035]"
              }`}
            >
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-violet-500">
                    Mini Projects
                  </p>
                  <h3 className="mt-2 text-3xl font-black">Small builds and practice work</h3>
                </div>
                <p className={isLight ? "max-w-xl text-[#5f574c]" : "max-w-xl text-white/58"}>
                  Use this section for different demo websites, UI builds, and
                  compact experiments.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {miniProjects.map((project) => (
                  <ProjectCard
                    isLight={isLight}
                    key={project.title}
                    project={project}
                    variant="mini"
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" isLight={isLight} title="Let's Connect">
          <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <Panel isLight={isLight}>
              <div className="flex h-full flex-col">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/25">
                    <MessageCircle size={26} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-500">
                      Available Now
                    </p>
                    <h3 className="mt-2 text-3xl font-black tracking-tight">
                      Let&apos;s build something useful.
                    </h3>
                  </div>
                </div>

                <p className={isLight ? "mt-5 leading-8 text-[#5f574c]" : "mt-5 leading-8 text-white/62"}>
                  I am available for full-time roles, freelance websites, and
                  custom business software projects. Send your requirement and
                  I will reply with a clear next step.
                </p>

                <div
                  className={`mt-6 rounded-2xl border p-5 ${
                    isLight
                      ? "border-blue-200 bg-blue-50/70"
                      : "border-blue-400/20 bg-blue-500/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={isLight ? "text-blue-700" : "text-blue-200"} size={24} />
                    <div>
                      <p className="font-black">My CV is ready to view.</p>
                      <p className={isLight ? "mt-1 text-sm text-[#6f675c]" : "mt-1 text-sm text-white/52"}>
                        Open it in a new tab or download the PDF directly.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:scale-105"
                      href={cvUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ArrowUpRight size={18} />
                      Open CV
                    </a>
                    <a
                      className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-black transition hover:scale-105 ${
                        isLight
                          ? "border-black/15 bg-white/80 text-[#15110d]"
                          : "border-white/15 bg-white/10 text-white"
                      }`}
                      download="Saleh-Mohiuddin-CV.pdf"
                      href={cvUrl}
                    >
                      <Download size={18} />
                      Download CV
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-500">
                    Social
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {[
                      { label: "GitHub", Icon: Code2, url: "https://github.com/salehmohiuddin0786" },
                      { label: "LinkedIn", Icon: Link2, url: "https://www.linkedin.com/in/saleh-mohiuddin-a447b422b/" },
                      // { label: "Instagram", Icon: Camera, url: "https://instagram.com/yourusername" },
                      { label: "Message", Icon: Send, url: "https://wa.me/917569978279" },
                    ].map(({ label, Icon, url }) => (
                      <a
                        className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-black transition hover:-translate-y-0.5 ${
                          isLight
                            ? "border-black/10 bg-white/70 text-[#15110d] hover:bg-white"
                            : "border-white/15 bg-white/10 text-white hover:bg-white/15"
                        }`}
                        href={url}
                        key={label}
                        rel="noreferrer"
                        target={url.startsWith("mailto:") ? undefined : "_blank"}
                      >
                        <Icon size={17} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>

            <Panel isLight={isLight}>
              <div className="grid gap-4">
                <ContactMethod
                  action="Send Mail"
                  accent="blue"
                  href="mailto:salehmohiuddin0786@gmail.com"
                  icon={Mail}
                  isLight={isLight}
                  label="Email"
                  value="salehmohiuddin0786@gmail.com"
                />
                <ContactMethod
                  action="Call Now"
                  accent="violet"
                  href="tel:+917569978279"
                  icon={Phone}
                  isLight={isLight}
                  label="Phone"
                  value="+91 7569978279"
                />
                <ContactMethod
                  accent="emerald"
                  icon={MapPin}
                  isLight={isLight}
                  label="Location"
                  value="Hyderabad, India"
                />
                <ContactMethod
                  accent="cyan"
                  icon={BriefcaseBusiness}
                  isLight={isLight}
                  label="Role"
                  value="Full Stack Web Developer"
                />

                <div
                  className={`mt-2 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
                    isLight
                      ? "border-emerald-200 bg-emerald-50/70"
                      : "border-emerald-400/20 bg-emerald-400/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-black">Available for work</span>
                  </div>
                  <span className="text-sm font-black text-emerald-500">
                    Open to opportunities
                  </span>
                </div>
              </div>
            </Panel>
          </div>
        </Section>

        {/* Enhanced Contact Section */}
        <section className="hidden" id="contact-old">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-500">
              contact
            </p>
            <h2
              className={`mt-3 text-4xl font-black tracking-tight md:text-5xl ${
                isLight ? "text-[#15110d]" : "text-white"
              }`}
            >
              Let&apos;s Connect
            </h2>
            <div className="mb-8 mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Left Column - Info & Social */}
              <div
                className={`rounded-[1.5rem] border p-6 backdrop-blur-xl transition hover:-translate-y-1 ${
                  isLight
                    ? "border-black/10 bg-white/72 shadow-xl shadow-blue-900/5"
                    : "border-white/10 bg-white/[0.07] shadow-xl shadow-blue-950/20"
                }`}
              >
                <h3 className="text-2xl font-black">Let&apos;s build something useful.</h3>
                <p className={isLight ? "mt-3 leading-7 text-[#5f574c]" : "mt-3 leading-7 text-white/62"}>
                  I&apos;m available for full-time roles, freelance websites, and custom business software projects. Let&apos;s create something amazing together.
                </p>
                
                {/* Social Links */}
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">
                    Connect with me
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "GitHub", icon: "🐙", url: "https://github.com/yourusername" },
                      { label: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/yourusername" },
                      { label: "Twitter", icon: "🐦", url: "https://twitter.com/yourusername" },
                      { label: "Instagram", icon: "📸", url: "https://instagram.com/yourusername" },
                    ].map((social) => (
                      <a
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition hover:scale-105 hover:shadow-lg ${
                          isLight
                            ? "border-black/10 bg-white/70 text-[#15110d] hover:shadow-blue-900/10"
                            : "border-white/15 bg-white/10 text-white hover:shadow-blue-950/30"
                        }`}
                        href={social.url}
                        key={social.label}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span>{social.icon}</span>
                        <span>{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:scale-105"
                    href={cvUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    📄 Open CV
                  </a>
                  <a
                    className={`inline-flex rounded-full border px-6 py-3 text-sm font-black transition hover:scale-105 ${
                      isLight
                        ? "border-black/15 bg-white/70 text-[#15110d]"
                        : "border-white/15 bg-white/10 text-white"
                    }`}
                    download="Saleh-Mohiuddin-CV.pdf"
                    href={cvUrl}
                  >
                    ⬇️ Download CV
                  </a>
                </div>
              </div>

              {/* Right Column - Contact Details */}
              <div
                className={`rounded-[1.5rem] border p-6 backdrop-blur-xl transition hover:-translate-y-1 ${
                  isLight
                    ? "border-black/10 bg-white/72 shadow-xl shadow-blue-900/5"
                    : "border-white/10 bg-white/[0.07] shadow-xl shadow-blue-950/20"
                }`}
              >
                <div className="grid gap-4">
                  {/* Email */}
                  <a
                    href="mailto:salehmohiuddin0786@gmail.com"
                    className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:scale-[1.02] ${
                      isLight
                        ? "border-black/10 hover:bg-white/50"
                        : "border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-2xl shadow-lg shadow-blue-500/20">
                      ✉️
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">
                        Email
                      </p>
                      <p className="truncate font-black text-sm sm:text-base">
                        salehmohiuddin0786@gmail.com
                      </p>
                    </div>
                    <span className="ml-auto text-xs font-black opacity-40 transition group-hover:opacity-100">
                      Copy →
                    </span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917569978279"
                    className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:scale-[1.02] ${
                      isLight
                        ? "border-black/10 hover:bg-white/50"
                        : "border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-2xl shadow-lg shadow-violet-500/20">
                      📞
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-500">
                        Phone
                      </p>
                      <p className="truncate font-black text-sm sm:text-base">
                        +91 7569978279
                      </p>
                    </div>
                    <span className="ml-auto text-xs font-black opacity-40 transition group-hover:opacity-100">
                      Call →
                    </span>
                  </a>

                  {/* Location */}
                  <div
                    className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:scale-[1.02] ${
                      isLight
                        ? "border-black/10 hover:bg-white/50"
                        : "border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-2xl shadow-lg shadow-emerald-500/20">
                      📍
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                        Location
                      </p>
                      <p className="truncate font-black text-sm sm:text-base">
                        Hyderabad, India
                      </p>
                    </div>
                  </div>

                  {/* Role */}
                  <div
                    className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:scale-[1.02] ${
                      isLight
                        ? "border-black/10 hover:bg-white/50"
                        : "border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-2xl shadow-lg shadow-cyan-500/20">
                      💻
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500">
                        Role
                      </p>
                      <p className="truncate font-black text-sm sm:text-base">
                        Full Stack Web Developer
                      </p>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div
                    className={`mt-2 flex items-center justify-between rounded-2xl border p-4 ${
                      isLight
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-emerald-400/20 bg-emerald-400/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                      </span>
                      <span className="font-black text-sm">Available for work</span>
                    </div>
                    <span className="text-xs font-black text-emerald-500">
                      Open to opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer
          className={`border-t px-5 py-8 text-center text-sm font-semibold ${
            isLight ? "border-black/10 text-[#6f675c]" : "border-white/10 text-white/45"
          }`}
        >
          © 2026 Mohammed Saleh Mohiuddin. Full-Stack Developer | Building fast, scalable, and interactive web applications.
        </footer>
      </div>
    </main>
  );
}

function Section({ id, title, children, isLight }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-20" id={id}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-500">
          {id}
        </p>
        <h2
          className={`mt-3 text-4xl font-black tracking-tight md:text-5xl ${
            isLight ? "text-[#15110d]" : "text-white"
          }`}
        >
          {title}
        </h2>
        <div className="mb-8 mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
        {children}
      </motion.div>
    </section>
  );
}

function Panel({ children, isLight }) {
  return (
    <div
      className={`rounded-[1.5rem] border p-6 backdrop-blur-xl transition hover:-translate-y-1 ${
        isLight
          ? "border-black/10 bg-white/72 shadow-xl shadow-blue-900/5"
          : "border-white/10 bg-white/[0.07] shadow-xl shadow-blue-950/20"
      }`}
    >
      {children}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}

function ProjectCard({ project, isLight, variant }) {
  const isMajor = variant === "major";
  const projectLinks = project.links ?? (
    project.liveUrl ? [{ label: "Open Website", url: project.liveUrl }] : []
  );
  const hasLinks = projectLinks.some((link) => link.url);

  return (
    <div
      className={`group rounded-[1.5rem] border p-6 backdrop-blur-xl transition hover:-translate-y-1 ${
        isMajor
          ? isLight
            ? "border-emerald-200 bg-white/80 shadow-xl shadow-emerald-900/5"
            : "border-emerald-400/20 bg-emerald-400/[0.055] shadow-xl shadow-emerald-950/20"
          : isLight
            ? "border-violet-200 bg-white/65"
            : "border-violet-400/20 bg-violet-400/[0.045]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className={`text-sm font-black uppercase tracking-[0.2em] ${
              isMajor ? "text-emerald-500" : "text-violet-500"
            }`}
          >
            {project.type}
          </p>
          <h4 className="mt-2 text-2xl font-black">{project.title}</h4>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            isMajor
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-violet-500/15 text-violet-400"
          }`}
        >
          {isMajor ? "Major website" : "Mini website"}
        </span>
      </div>

      <p className={isLight ? "mt-3 leading-7 text-[#5f574c]" : "mt-3 leading-7 text-white/62"}>
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              isLight ? "bg-blue-50 text-blue-800" : "bg-blue-500/15 text-blue-200"
            }`}
            key={item}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6">
        {hasLinks ? (
          <div className="flex flex-wrap gap-2">
            {projectLinks
              .filter((link) => link.url)
              .map((link) => (
                <a
                  className={`inline-flex rounded-full px-5 py-2 text-sm font-black text-white shadow-lg transition hover:scale-105 ${
                    isMajor
                      ? "bg-gradient-to-r from-emerald-600 to-blue-600 shadow-emerald-600/20"
                      : "bg-gradient-to-r from-violet-600 to-blue-600 shadow-violet-600/20"
                  }`}
                  href={link.url}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
          </div>
        ) : (
          <span
            className={`inline-flex rounded-full border px-5 py-2 text-sm font-black ${
              isLight
                ? "border-black/10 text-[#6f675c]"
                : "border-white/10 text-white/48"
            }`}
          >
            {project.links
              ? "3 food website links ready"
              : isMajor
                ? "Major website link ready"
                : "Mini website link ready"}
          </span>
        )}
      </div>
    </div>
  );
}

function ContactMethod({ action, accent, href, icon: Icon, isLight, label, value }) {
  const iconStyles = {
    blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
    violet: "from-violet-500 to-violet-600 shadow-violet-500/20",
    emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
    cyan: "from-cyan-500 to-cyan-600 shadow-cyan-500/20",
  };
  const labelStyles = {
    blue: "text-blue-500",
    violet: "text-violet-500",
    emerald: "text-emerald-500",
    cyan: "text-cyan-500",
  };

  const content = (
    <span
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:scale-[1.02] ${
        isLight
          ? "border-black/10 hover:bg-white/70"
          : "border-white/10 hover:bg-white/[0.05]"
      }`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${iconStyles[accent]}`}
      >
        <Icon size={22} strokeWidth={2.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-xs font-black uppercase tracking-[0.2em] ${labelStyles[accent]}`}>
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-black sm:text-base">
          {value}
        </span>
      </span>
      {action ? (
        <span className="hidden items-center gap-1 text-xs font-black opacity-45 transition group-hover:opacity-100 sm:inline-flex">
          {action}
          <ArrowUpRight size={14} />
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <a href={href}>
      {content}
    </a>
  );
}

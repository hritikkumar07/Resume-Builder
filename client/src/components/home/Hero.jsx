import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/resume_logo.svg';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowRight, Video, Sparkles, Check, FileText, Layout, Award, Zap } from 'lucide-react';
import Login from '../../pages/Login';

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [darkMode, setDarkMode] = useState(false);

  // Sync initial dark mode state
  useEffect(() => {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    // Keep it always dark
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setDarkMode(true);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsLoginModalOpen(true);
  };

  const logos = [
    { name: "Framer", path: "/logos/framer.svg" },
    { name: "Google", path: "/logos/google.svg" },
    { name: "Instagram", path: "/logos/instagram.svg" },
    { name: "Microsoft", path: "/logos/microsoft.svg" }
  ];

  return (
    <>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden pb-12">
        {/* Abstract Glowing Blobs */}
        <div className="absolute top-1/4 left-1/10 -z-10 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/10 -z-10 w-80 sm:w-110 h-80 sm:h-110 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Navbar */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 w-full px-6 md:px-12 lg:px-24 py-4 glass-panel border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-auto filter dark:brightness-125" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-300 text-sm font-semibold">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Auth Actions */}
            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("login")}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal("register")}
                  className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/app"
                className="hidden md:flex px-6 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/10 active:scale-95 transition-all items-center gap-1.5"
              >
                <span>Workspace</span>
                <ArrowRight size={14} />
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
          </div>
        </motion.nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-18 z-30 p-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-xl md:hidden"
            >
              <a href="#features" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-semibold py-2">Features</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-semibold py-2">Testimonials</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-semibold py-2">Pricing</a>

              <hr className="border-slate-200 dark:border-slate-800" />

              {!user ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setMenuOpen(false); openAuthModal("login"); }}
                    className="w-full py-3 text-center font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); openAuthModal("register"); }}
                    className="w-full py-3 bg-indigo-600 text-white font-semibold text-center rounded-xl"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <Link
                  to="/app"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 bg-indigo-600 text-white font-semibold text-center rounded-xl block"
                >
                  Workspace
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 grid lg:grid-cols-12 gap-12 items-center">

          {/* Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-6">
              <Sparkles size={12} className="animate-pulse" />
              <span>Next-Generation Resume Builder</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Land your dream job with{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                AI-powered
              </span>{" "}
              resumes.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Create, edit, and download recruiter-approved, ATS-friendly resumes in seconds. Powered by premium layouts and smart AI optimizations.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {!user ? (
                <button
                  onClick={() => openAuthModal("register")}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Build For Free</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <Link
                  to="/app"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Go to Workspace</span>
                  <ArrowRight size={18} />
                </Link>
              )}

              <button
                onClick={() => toast.success("Feature video coming soon!")}
                className="px-6 py-4 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900/80 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold transition-all flex items-center gap-2 active:scale-95 cursor-pointer bg-white dark:bg-slate-900"
              >
                <Video size={18} />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Proof Points */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-8">
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">100%</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">ATS Friendly</p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">35s</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Generation Time</p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">10k+</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Resumes Built</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Resume Showcase Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Live Resume Mockup Card */}
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden glow-card">

              {/* Fake paper header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live Preview</span>
              </div>

              {/* Resume Body */}
              <div className="space-y-4 text-left">
                {/* Header Section */}
                <div className="text-center">
                  <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded mx-auto mb-2"></div>
                  <div className="w-16 h-3 bg-indigo-500/20 dark:bg-indigo-500/30 rounded mx-auto"></div>
                </div>

                {/* Grid Divider */}
                <div className="grid grid-cols-3 gap-2 py-2">
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>

                {/* Section Summary */}
                <div className="space-y-2">
                  <div className="w-20 h-3 bg-slate-300 dark:bg-slate-700 rounded"></div>
                  <div className="space-y-1.5">
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                  </div>
                </div>

                {/* Experience Blocks */}
                <div className="space-y-3 pt-2">
                  <div className="w-24 h-3 bg-slate-300 dark:bg-slate-700 rounded"></div>

                  {/* Job Item */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-3.5 bg-slate-200 dark:bg-slate-800 rounded"></div>
                      <div className="w-10 h-2.5 bg-indigo-500/20 dark:bg-indigo-500/30 rounded"></div>
                    </div>
                    <div className="w-28 h-2.5 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded"></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                        <div className="w-5/6 h-1.5 bg-slate-100 dark:bg-slate-800 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Interactive Tag Floatings */}
                <div className="absolute top-24 right-4 bg-indigo-600 text-white rounded-full p-2 py-1 flex items-center gap-1 text-[10px] font-bold shadow-lg shadow-indigo-600/30 animate-bounce">
                  <Sparkles size={10} />
                  <span>AI Summary Enhanced</span>
                </div>

                <div className="absolute bottom-16 -left-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-xl flex items-center gap-3">
                  <div className="size-8 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ATS Score Check</p>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white">98% Excellent</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Logo Reel */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider mb-6">TRUSTED BY LEADING BRAND BUILDERS</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 hover:opacity-75 transition-opacity duration-300">
            {logos.map((logo, i) => (
              <span key={i} className="text-lg font-extrabold text-slate-600 dark:text-slate-400 tracking-tight flex items-center gap-1.5 select-none">
                <Layout size={18} className="text-indigo-500" />
                {logo.name}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <Login
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            initialMode={authMode}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Hero
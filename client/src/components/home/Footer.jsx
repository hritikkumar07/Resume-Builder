import React from 'react'
import logo from '../../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-9 w-auto filter dark:brightness-125" />
          </div>
          <p className="text-sm max-w-sm leading-relaxed">
            Building stunning, ATS-optimized, and recruiter-ready resumes in seconds. Accelerate your career growth with modern design layouts and AI-powered recommendations.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold text-sm tracking-wider uppercase mb-4">Product</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
            <li><a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Testimonials</a></li>
            <li><a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing Options</a></li>
          </ul>
        </div>

        {/* Contact / Social Section */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold text-sm tracking-wider uppercase mb-4">Connect</h4>
          <ul className="space-y-2.5 text-sm mb-4">
            <li><a href="mailto:support@resumebuilder.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Support</a></li>
          </ul>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://www.linkedin.com/in/hritik-naik/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a 
              href="https://github.com/hritikkumar07" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Resume Builder AI. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
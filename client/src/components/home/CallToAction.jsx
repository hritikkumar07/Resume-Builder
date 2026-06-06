import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

const CallToAction = () => {
  return (
    <div id='cta' className='w-full max-w-6xl mx-auto px-6 py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300'>
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-12 sm:p-16 overflow-hidden shadow-2xl border border-indigo-500/20">
        {/* Background glowing decorations */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4 uppercase tracking-wider">
              <Sparkles size={12} /> Boost Your Career
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to double your interview callbacks?
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              Join thousands of job seekers who have designed recruiter-ready resumes using our smart AI optimizer. Free to get started, no credit card required.
            </p>
          </div>

          <div className="shrink-0">
            <Link 
              to="/app?state=register" 
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-slate-950/10 active:scale-95 transition-all text-base"
            >
              <span>Build Your Resume</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
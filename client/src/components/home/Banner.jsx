import React from 'react'
import { Sparkles } from 'lucide-react'

const Banner = () => {
  return (
    <div className="w-full py-2 px-4 bg-slate-900 dark:bg-slate-950 border-b border-slate-800 text-center flex items-center justify-center gap-2 overflow-hidden relative">
      {/* Background soft glow lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08),rgba(168,85,247,0.08),rgba(99,102,241,0.08))] pointer-events-none"></div>
      
      <div className="flex items-center gap-2 z-10">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          <Sparkles className="size-2.5" /> New Release
        </span>
        <p className="text-xs text-slate-300 font-medium tracking-wide">
          Introducing AI-powered Resumes 2.0 with ATS validation. 
          <a href="#features" className="text-white hover:underline ml-1.5 font-semibold inline-flex items-center gap-0.5">
            Learn more &rarr;
          </a>
        </p>
      </div>
    </div>
  )
}

export default Banner
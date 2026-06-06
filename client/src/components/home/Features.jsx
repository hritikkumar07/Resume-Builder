import React from 'react'
import { Zap, Sparkles, Shield, Download, LayoutTemplate, CheckCircle2 } from 'lucide-react'
import Title from './Title';

const Features = () => {
  const featuresList = [
    {
      title: "AI Co-Pilot Content Writer",
      description: "Generate highly professional summaries, job descriptions, and skills tailored to your exact industry automatically.",
      colorClass: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40",
      icon: Sparkles
    },
    {
      title: "ATS Compatibility Engine",
      description: "Recruiter-approved templates modeled specifically to score high with Automated Tracking Systems (ATS) and human screeners.",
      colorClass: "bg-emerald-50 dark:bg-emerald-950/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/40",
      icon: CheckCircle2
    },
    {
      title: "Premium Design Themes",
      description: "Instantly switch between Classic, Modern, and Minimal layouts with custom color palettes and elegant spacing.",
      colorClass: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40",
      icon: LayoutTemplate
    },
    {
      title: "Instant Recruiter Export",
      description: "Download beautifully structured PDF copies, ready for job submissions, or generate high-speed public shareable links.",
      colorClass: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
      icon: Download
    }
  ];

  return (
    <div id='features' className='max-w-7xl mx-auto px-6 py-20 scroll-mt-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300'>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-full px-4 py-1.5 mb-4">
          <Zap size={12}/>
          <span>SaaS Ecosystem Features</span>
        </div>
        
        <Title 
          title='Powerful features to double your callback rate' 
          description='Our streamlined editor helps you create high-performance professional resumes in minutes with direct AI assistance and formatting control.'
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {featuresList.map((feat, index) => {
          const IconComponent = feat.icon;
          return (
            <div 
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top soft visual blob */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/5 group-hover:bg-indigo-500/10 rounded-full blur-xl transition-all duration-300"></div>
              
              <div className={`inline-flex items-center justify-center p-3 rounded-2xl border ${feat.colorClass} mb-6`}>
                <IconComponent className="size-6" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {feat.title}
              </h3>
              
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features
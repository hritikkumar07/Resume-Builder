import React, { useMemo } from 'react'
import { Award, CheckCircle, AlertCircle, Sparkles, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const AtsScoreChecker = ({ data }) => {
  const analysis = useMemo(() => {
    let score = 0
    const suggestions = []
    const passes = []

    // 1. Personal Info check
    const hasName = !!data.personal_info?.full_name
    const hasEmail = !!data.personal_info?.email
    const hasPhone = !!data.personal_info?.phone
    const hasLocation = !!data.personal_info?.location
    const hasLinkedIn = !!data.personal_info?.linkedin

    let contactScore = 0
    if (hasName) contactScore += 5
    if (hasEmail) contactScore += 5
    if (hasPhone) contactScore += 5
    if (hasLocation) contactScore += 3
    if (hasLinkedIn) contactScore += 2
    
    score += contactScore

    if (contactScore < 20) {
      suggestions.push({
        id: 'contact',
        text: 'Complete your contact info (email, phone, location, LinkedIn) to help recruiters reach you.',
        severity: 'high'
      })
    } else {
      passes.push('Contact information is fully complete.')
    }

    // 2. Summary Check
    const summaryWordCount = data.professional_summary?.trim().split(/\s+/).filter(Boolean).length || 0
    if (summaryWordCount === 0) {
      suggestions.push({
        id: 'summary',
        text: 'Add a professional summary summarizing your key achievements and value.',
        severity: 'high'
      })
    } else if (summaryWordCount < 30) {
      score += 8
      suggestions.push({
        id: 'summary_short',
        text: 'Make your professional summary slightly longer (aim for 30-60 words).',
        severity: 'medium'
      })
    } else if (summaryWordCount > 80) {
      score += 12
      suggestions.push({
        id: 'summary_long',
        text: 'Keep your summary concise; it is currently a bit wordy (aim for 30-60 words).',
        severity: 'low'
      })
    } else {
      score += 15
      passes.push('Professional summary is well-structured and optimal in length.')
    }

    // 3. Work Experience check
    const experiences = data.experience || []
    if (experiences.length === 0) {
      suggestions.push({
        id: 'experience',
        text: 'Add at least one professional work experience entry.',
        severity: 'high'
      })
    } else {
      score += 15 // Base score for having experience
      
      let detailScore = 0
      let shortDescription = false
      experiences.forEach((exp) => {
        const descWordCount = exp.description?.trim().split(/\s+/).filter(Boolean).length || 0
        if (descWordCount > 30) {
          detailScore += 5
        } else {
          shortDescription = true
        }
      })

      const cappedDetail = Math.min(detailScore, 15)
      score += cappedDetail

      if (shortDescription) {
        suggestions.push({
          id: 'exp_detail',
          text: 'Detail your achievements inside work experience. Use action verbs and metric results.',
          severity: 'medium'
        })
      } else {
        passes.push('Work experiences include detailed descriptions.')
      }
    }

    // 4. Skills Check
    const skills = data.skills || []
    if (skills.length === 0) {
      suggestions.push({
        id: 'skills_none',
        text: 'Add your key skills (aim for at least 5-10 technical & soft skills).',
        severity: 'high'
      })
    } else if (skills.length < 5) {
      score += 8
      suggestions.push({
        id: 'skills_few',
        text: 'List at least 5 relevant skills to trigger keyword match in ATS filters.',
        severity: 'medium'
      })
    } else {
      score += 15
      passes.push(`Great keyword density with ${skills.length} skills listed.`)
    }

    // 5. Education Check
    const educations = data.education || []
    if (educations.length === 0) {
      suggestions.push({
        id: 'education',
        text: 'Add your educational qualifications (degree, school).',
        severity: 'high'
      })
    } else {
      score += 15
      passes.push('Academic qualifications are properly listed.')
    }

    // 6. Projects Check
    const projects = data.projects || []
    if (projects.length === 0) {
      suggestions.push({
        id: 'projects_none',
        text: 'Include key projects to showcase practical application of your skills.',
        severity: 'medium'
      })
    } else {
      score += 10
      passes.push('Practical projects added successfully.')
    }

    // Normalize final score to a maximum of 100
    const finalScore = Math.min(score, 100)

    return {
      score: finalScore,
      suggestions,
      passes
    }
  }, [data])

  const getScoreColor = (score) => {
    if (score < 40) return 'text-rose-500'
    if (score < 75) return 'text-amber-500'
    return 'text-emerald-500'
  }

  const getScoreBg = (score) => {
    if (score < 40) return 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 border-rose-100 dark:border-rose-900/40'
    if (score < 75) return 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-100 dark:border-amber-900/40'
    return 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-100 dark:border-emerald-900/40'
  }

  // Circular SVG constants
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (analysis.score / 100) * circumference

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Award size={16} className="text-indigo-500" /> ATS Optimization
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time scan score of your content structure.</p>
        </div>
        <div className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${getScoreBg(analysis.score)} flex items-center gap-1`}>
          <TrendingUp size={11} />
          <span>
            {analysis.score < 45 ? 'Basic' : analysis.score < 75 ? 'Good' : 'Exceptional'}
          </span>
        </div>
      </div>

      {/* Circle & Details */}
      <div className="flex items-center gap-6">
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-24 h-24 transform -rotate-90">
            {/* Trail */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Value */}
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              className={getScoreColor(analysis.score)}
              strokeWidth="6.5"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-black text-slate-800 dark:text-slate-100">{analysis.score}%</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Score</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Interactive Checklist</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
            Applicant Tracking Systems filters screen resumes by sections and density. Complete the checkmarks below to maximize your score.
          </p>
        </div>
      </div>

      {/* Suggestion & Pass Checklist */}
      <div className="space-y-4 max-h-[190px] overflow-y-auto pr-1">
        {analysis.suggestions.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest block">Improvements ({analysis.suggestions.length})</span>
            {analysis.suggestions.map((item) => (
              <div 
                key={item.id} 
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/5 border border-amber-100/40 dark:border-amber-950/20 text-slate-700 dark:text-slate-300 text-xs"
              >
                <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {analysis.passes.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest block">Optimized ({analysis.passes.length})</span>
            {analysis.passes.map((text, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50/25 dark:bg-emerald-950/5 border border-emerald-100/20 dark:border-emerald-950/10 text-slate-600 dark:text-slate-400 text-[11px]"
              >
                <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                <span className="truncate">{text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Protip */}
      <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100/40 dark:border-indigo-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
        <Sparkles size={15} className="text-indigo-500 shrink-0 mt-0.5 animate-pulse" />
        <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-750 dark:text-slate-200">AI Protip:</strong> Try using the "Enhance with AI" summaries inside individual builder forms to instantly score full keyword match metrics.
        </p>
      </div>
    </div>
  )
}

export default AtsScoreChecker

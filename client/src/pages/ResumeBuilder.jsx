import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeft, Briefcase, ChevronLeft, ChevronRight, CloudSnow, 
  Download, EyeIcon, EyeOffIcon, FileText, FolderIcon, 
  GraduationCap, Share2Icon, Sparkles, User, Award, 
  RefreshCw, ZoomIn, ZoomOut, CheckCircle2, AlertCircle
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import ExtracurricularForm from '../components/ExtracurricularForm'
import SectionReorder from '../components/SectionReorder'
import AtsScoreChecker from '../components/AtsScoreChecker'
import { useSelector } from 'react-redux'
import api from '../confix/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    extracurriculars: [],
    template: "classic",
    accent_color: "#3B82F6",
    sections_order: ['summary', 'experience', 'projects', 'education', 'skills', 'extracurricular'],
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [mobileTab, setMobileTab] = useState('edit') // 'edit' or 'preview'
  const [saveStatus, setSaveStatus] = useState("saved") // "saved" | "saving" | "unsaved"

  const isInitialMount = useRef(true)
  const isFetching = useRef(true)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "extracurricular", name: "Extracurricular", icon: CloudSnow },
    { id: "optimize", name: "ATS & Order", icon: Award },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    isFetching.current = true
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, {
        headers: { Authorization: token }
      })
      if (data.resume) {
        // Fallback for sections_order if not set on backend
        const resumeWithOrder = {
          ...data.resume,
          sections_order: data.resume.sections_order || ['summary', 'experience', 'projects', 'education', 'skills', 'extracurricular']
        }
        setResumeData(resumeWithOrder)
        document.title = data.resume.title
      }
    } catch (error) {
      toast.error("Failed to load resume details")
      console.log(error.message)
    } finally {
      isFetching.current = false
      setTimeout(() => {
        isInitialMount.current = false
      }, 200)
    }
  }

  // Debounced auto-save
  useEffect(() => {
    if (isInitialMount.current || isFetching.current) return

    setSaveStatus("unsaved")
    const timer = setTimeout(async () => {
      setSaveStatus("saving")
      try {
        let updatedResumeData = structuredClone(resumeData)

        // Remove image binary if it is a File object to prevent payload size errors
        if (typeof resumeData.personal_info?.image === 'object') {
          delete updatedResumeData.personal_info.image
        }

        const formData = new FormData()
        formData.append("resumeId", resumeId)
        formData.append('resumeData', JSON.stringify(updatedResumeData))
        removeBackground && formData.append("removeBackground", "yes")
        
        if (typeof resumeData.personal_info?.image === 'object') {
          formData.append("image", resumeData.personal_info.image)
        }

        await api.put('/api/resumes/update', formData, {
          headers: { Authorization: token }
        })
        
        setSaveStatus("saved")
      } catch (error) {
        console.error("Auto-save error:", error)
        setSaveStatus("unsaved")
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [resumeData])

  useEffect(() => {
    loadExistingResume()
  }, [])

  const changeResumeVisibility = async () => {
    const nextPublicState = !resumeData.public
    try {
      // Optimistic update
      setResumeData(prev => ({
        ...prev,
        public: nextPublicState
      }))
      
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: nextPublicState }))

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      })
      toast.success(data.message || `Resume is now ${nextPublicState ? 'Public' : 'Private'}`)
    } catch (error) {
      // Revert on error
      setResumeData(prev => ({
        ...prev,
        public: !nextPublicState
      }))
      console.error("Error saving visibility:", error)
      toast.error("Failed to change privacy settings")
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = frontendUrl + '/view/' + resumeId

    if (navigator.share) {
      navigator.share({ url: resumeUrl, title: resumeData.title || "My Resume", text: "Check out my professional resume!" })
    } else {
      navigator.clipboard.writeText(resumeUrl)
      toast.success('Resume link copied to clipboard!')
    }
  }

  const downloadResume = () => {
    window.print()
  }

  const handleManualSave = async () => {
    setSaveStatus("saving")
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info?.image === 'object') {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes")
      
      if (typeof resumeData.personal_info?.image === 'object') {
        formData.append("image", resumeData.personal_info.image)
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      })

      // Sync data but keep file if selected
      setResumeData(prev => ({
        ...data.resume,
        personal_info: {
          ...data.resume.personal_info,
          image: typeof prev.personal_info?.image === 'object' ? prev.personal_info.image : data.resume.personal_info.image
        }
      }))
      setSaveStatus("saved")
      toast.success(data.message || 'Saved successfully!')
    } catch (error) {
      setSaveStatus("unsaved")
      toast.error("Failed to save changes")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 print:bg-white print:min-h-0">
      
      {/* Top Header Workspace Bar */}
      <div className="sticky top-0 z-30 w-full px-4 md:px-8 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <Link 
            to="/app" 
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl transition-all active:scale-95"
            title="Back to Dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100 line-clamp-1">
              {resumeData.title || "Untitled Resume"}
            </h1>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 hidden md:block">Workspace Editor</p>
          </div>
        </div>

        {/* Sync Indicator Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/50 rounded-full text-xs font-bold shadow-sm">
                <CheckCircle2 size={13} className="stroke-[2.5]" />
                <span>Saved</span>
              </span>
            )}
            {saveStatus === "saving" && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/50 rounded-full text-xs font-bold shadow-sm">
                <RefreshCw size={13} className="animate-spin text-indigo-500" />
                <span>Saving...</span>
              </span>
            )}
            {saveStatus === "unsaved" && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/50 rounded-full text-xs font-bold shadow-sm">
                <AlertCircle size={13} className="stroke-[2.5] text-amber-500" />
                <span>Unsaved Draft</span>
              </span>
            )}
          </div>

          {/* Save & Print actions for larger layouts */}
          <button 
            onClick={handleManualSave}
            className="hidden sm:block px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-455 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer active:scale-95 transition-all"
          >
            Save Draft
          </button>
        </div>
      </div>

      {/* Mobile Switch Tabs */}
      <div className="lg:hidden flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 print:hidden">
        <button 
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-3 text-sm font-extrabold border-b-2 transition-all ${
            mobileTab === 'edit' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 dark:text-slate-400'
          }`}
        >
          Edit Resume
        </button>
        <button 
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-3 text-sm font-extrabold border-b-2 transition-all ${
            mobileTab === 'preview' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 dark:text-slate-400'
          }`}
        >
          Live Preview
        </button>
      </div>

      {/* Main Workspace Split Layout */}
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 print:p-0 print:max-w-none">
        <div className="grid lg:grid-cols-12 gap-8 items-start print:block">
          
          {/* Left Panel: Form & Editor Sections */}
          <div className={`lg:col-span-5 space-y-6 ${mobileTab !== 'edit' ? 'max-lg:hidden' : ''} print:hidden`}>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[720px] md:h-[680px]">
              
              {/* Vertical Sidebar Sections Menu */}
              <div className="w-full md:w-48 bg-slate-50/50 dark:bg-slate-950/30 border-b md:border-b-0 md:border-r border-slate-250/60 dark:border-slate-800/80 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto shrink-0 scrollbar-none">
                <span className="hidden md:block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2.5 mb-3.5">Sections</span>
                {sections.map((section, idx) => {
                  const Icon = section.icon
                  const isActive = idx === activeSectionIndex
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer w-full text-left ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-550'} />
                      <span className="truncate">{section.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Center Content Editor area */}
              <div className="flex-1 p-6 overflow-y-auto h-full space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-850 dark:text-white flex items-center gap-2">
                      {activeSection.name}
                    </h2>
                    <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">Fill out your profile details correctly.</p>
                  </div>

                  {/* Top Chevron Navifiers */}
                  <div className="flex items-center gap-1">
                    <button
                      disabled={activeSectionIndex === 0}
                      onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                      className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      disabled={activeSectionIndex === sections.length - 1}
                      onClick={() => setActiveSectionIndex(prev => Math.min(sections.length - 1, prev + 1))}
                      className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Render Forms */}
                <div className="py-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {activeSection.id === 'personal' && (
                        <PersonalInfoForm 
                          data={resumeData.personal_info} 
                          onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} 
                          removeBackground={removeBackground}
                          setRemoveBackground={setRemoveBackground} 
                        />
                      )}
                      {activeSection.id === 'summary' && (
                        <ProfessionalSummaryForm 
                          data={resumeData.professional_summary} 
                          onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} 
                          setResumeData={setResumeData}
                        />
                      )}
                      {activeSection.id === 'experience' && (
                        <ExperienceForm 
                          data={resumeData.experience} 
                          onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                        />
                      )}
                      {activeSection.id === 'education' && (
                        <EducationForm 
                          data={resumeData.education} 
                          onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                        />
                      )}
                      {activeSection.id === 'projects' && (
                        <ProjectForm 
                          data={resumeData.projects} 
                          onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))}
                        />
                      )}
                      {activeSection.id === 'skills' && (
                        <SkillsForm
                          data={resumeData.skills}
                          onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                        />
                      )}
                      {activeSection.id === 'extracurricular' && (
                        <ExtracurricularForm
                          data={resumeData.extracurriculars || []}
                          onChange={(data) => setResumeData(prev => ({ ...prev, extracurriculars: data }))}
                        />
                      )}
                      {activeSection.id === 'optimize' && (
                        <div className="space-y-6">
                          <SectionReorder 
                            sectionsOrder={resumeData.sections_order}
                            onChange={(newOrder) => setResumeData(prev => ({ ...prev, sections_order: newOrder }))}
                          />
                          <AtsScoreChecker data={resumeData} />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Quick Helper below editor */}
            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 p-4 rounded-2xl text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-indigo-500" /> Changes autosave instantly.</span>
              <button 
                onClick={handleManualSave}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Force Save
              </button>
            </div>
          </div>

          {/* Right side: Live Preview sticky viewport */}
          <div className={`lg:col-span-7 ${mobileTab !== 'preview' ? 'max-lg:hidden' : ''} sticky top-20 z-10 space-y-4 print:static print:block print:space-y-0`}>
            
            {/* Template & Visual Toolbar */}
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div className="flex flex-wrap items-center gap-3">
                <TemplateSelector 
                  selectedTemplate={resumeData.template} 
                  onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                />
                <ColorPicker 
                  selectedColor={resumeData.accent_color} 
                  onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                />

                {/* Zoom Controls */}
                <div className="flex items-center border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))}
                    className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="px-2 text-[10px] font-bold text-slate-600 dark:text-slate-400 border-x border-slate-200 dark:border-slate-800 select-none">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.1))}
                    className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={13} />
                  </button>
                </div>
              </div>

              {/* Visibility and download actions */}
              <div className="flex items-center gap-2">
                {resumeData.public && (
                  <button 
                    onClick={handleShare} 
                    className="flex items-center px-3.5 py-2.5 gap-1.5 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-405 dark:hover:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-900/30 rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
                    title="Copy Shared Link"
                  >
                    <Share2Icon size={13} /> 
                    <span>Share</span>
                  </button>
                )}
                <button 
                  onClick={changeResumeVisibility} 
                  className={`flex items-center px-3.5 py-2.5 gap-1.5 text-xs font-bold rounded-xl border active:scale-95 transition-all cursor-pointer shadow-sm ${
                    resumeData.public 
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-900/40 border-emerald-100 dark:border-emerald-900/30' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                  title={resumeData.public ? "Resume is public" : "Resume is private"}
                >
                  {resumeData.public ? <EyeIcon size={13} /> : <EyeOffIcon size={13} />}
                  <span>{resumeData.public ? 'Public' : 'Private'}</span>
                </button>
                <button 
                  onClick={downloadResume} 
                  className="flex items-center px-4 py-2.5 gap-1.5 text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/10"
                >
                  <Download size={13} /> 
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Paper Preview Wrap with scaling */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-inner overflow-hidden p-6 md:p-10 flex items-center justify-center min-h-[750px] print:p-0 print:bg-transparent print:border-none print:shadow-none print:min-h-0 print:block">
              <div 
                className="w-full origin-top transition-transform duration-200 flex justify-center print:!transform-none print:block"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <div className="w-full max-w-[816px] shadow-2xl rounded-sm overflow-hidden bg-white text-gray-800 print:shadow-none print:max-w-none print:w-full">
                  <ResumePreview 
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
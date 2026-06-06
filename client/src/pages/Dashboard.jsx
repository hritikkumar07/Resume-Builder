import { useEffect, useState } from 'react'
import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, FileText, Calendar, Globe, Lock, Search, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../confix/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const { token, user } = useSelector(state => state.auth)
  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingResumes, setIsLoadingResumes] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    setIsLoadingResumes(true)
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: token }
      })
      setAllResumes(data.resumes || [])
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoadingResumes(false)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      setIsLoading(true)
      const { data } = await api.post('/api/resumes/create', { title }, {
        headers: { Authorization: token }
      })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      toast.success('Resume created successfully!')
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    if (!resume) {
      toast.error("Please select a PDF resume file first.")
      return
    }
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, {
        headers: { Authorization: token }
      })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      toast.success('AI Resume uploaded and parsed successfully!')
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      setIsLoading(true)
      const { data } = await api.put(`/api/resumes/update`, {
        resumeId: editResumeId,
        resumeData: { title }
      }, {
        headers: { Authorization: token }
      })
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message || 'Resume title updated')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token }
        })
        setAllResumes(allResumes.filter(r => r._id !== resumeId))
        toast.success(data.message || 'Resume deleted successfully')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  const filteredResumes = allResumes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Welcome back, <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">{user?.name || 'Builder'}</span>
            </motion.h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
              Create, customize, and optimize your resume templates. Check your real-time ATS scores.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Quick Actions / Create section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-500" /> Start Building
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* Blank Resume */}
            <motion.button 
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateResume(true)}
              className="h-44 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3.5 text-slate-600 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-md hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer w-full group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-xl"></div>
              <div className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <PlusIcon size={24} />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Create Blank Resume</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Start completely from scratch</p>
              </div>
            </motion.button>

            {/* AI Import Resume */}
            <motion.button 
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUploadResume(true)}
              className="h-44 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3.5 text-slate-600 dark:text-slate-300 hover:border-purple-500 dark:hover:border-purple-500 shadow-sm hover:shadow-md hover:shadow-purple-500/5 dark:hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer w-full group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-xl"></div>
              <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <UploadCloudIcon size={24} />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">AI Import PDF</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Extract info automatically via AI</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Existing Resumes Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText size={18} className="text-purple-500" /> Your Resumes
          </h2>

          {isLoadingResumes ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between animate-pulse">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                      <div className="w-16 h-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  </div>
                  <div className="w-1/2 h-3 bg-slate-100 dark:bg-slate-800/80 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : filteredResumes.length === 0 ? (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6"
            >
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No resumes found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                {searchQuery ? "No resumes match your current search query. Try typing something else." : "Create your first premium resume or import an existing PDF to get started."}
              </p>
            </motion.div>
          ) : (
            /* Active Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <AnimatePresence>
                {filteredResumes.map((resumeItem, index) => {
                  const baseColor = colors[index % colors.length]
                  return (
                    <motion.div
                      key={resumeItem._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                      className="group relative h-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-500/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Left color bar */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 transition-all duration-300" style={{ backgroundColor: baseColor }} />

                      <div className="space-y-3.5">
                        <div className="flex justify-between items-start">
                          <div 
                            className="p-2.5 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-950" 
                            style={{ color: baseColor }}
                          >
                            <FilePenLineIcon size={20} />
                          </div>
                          
                          {/* Visibility badge */}
                          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full flex items-center gap-1 shadow-sm ${
                            resumeItem.public 
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/50' 
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200/50 dark:border-slate-750'
                          }`}>
                            {resumeItem.public ? <Globe size={11} /> : <Lock size={11} />}
                            {resumeItem.public ? 'Public' : 'Private'}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                            {resumeItem.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                          <Calendar size={12} />
                          {new Date(resumeItem.updatedAt).toLocaleDateString()}
                        </span>
                        
                        {/* Hover Overlay Buttons */}
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <button 
                            onClick={() => {
                              setEditResumeId(resumeItem._id)
                              setTitle(resumeItem.title)
                            }}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg transition-colors cursor-pointer"
                            title="Rename Resume"
                          >
                            <PencilIcon size={14} />
                          </button>
                          <button 
                            onClick={() => deleteResume(resumeItem._id)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                            title="Delete Resume"
                          >
                            <TrashIcon size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Modals & Forms */}
        <AnimatePresence>
          {/* Create Resume Modal */}
          {showCreateResume && (
            <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.form 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onSubmit={createResume} 
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-7 overflow-hidden"
              >
                {/* Background design accents */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>

                <button 
                  type="button"
                  onClick={() => { setShowCreateResume(false); setTitle('') }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <XIcon size={18} />
                </button>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Create New Resume</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5">Give your resume a name to represent the job or profile you're targeting.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Resume Title</label>
                    <input 
                      onChange={(e) => setTitle(e.target.value)} 
                      value={title} 
                      type="text" 
                      placeholder="e.g. Senior Software Engineer - Google" 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none text-sm"
                      required 
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold shadow-md shadow-indigo-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isLoading ? <LoaderCircleIcon className="animate-spin size-4" /> : 'Create Resume'}
                  </button>
                </div>
              </motion.form>
            </div>
          )}

          {/* Upload Resume Modal */}
          {showUploadResume && (
            <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.form 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onSubmit={uploadResume} 
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-7 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none"></div>

                <button 
                  type="button"
                  onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null) }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <XIcon size={18} />
                </button>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">AI Import PDF Resume</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5">Upload your old PDF resume. We will parse it and prepopulate the fields using advanced AI models.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Resume Title</label>
                    <input 
                      onChange={(e) => setTitle(e.target.value)} 
                      value={title} 
                      type="text" 
                      placeholder="e.g. AI-Extracted Resume" 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none text-sm"
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="resume-input" className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Select Resume File</label>
                    <label 
                      htmlFor="resume-input" 
                      className="flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-5 py-8 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 hover:border-purple-500 hover:bg-purple-500/[0.02] dark:hover:border-purple-500 cursor-pointer transition-all duration-300 group"
                    >
                      {resume ? (
                        <div className="text-center">
                          <FileText className="size-10 text-purple-500 mx-auto mb-2" />
                          <p className="text-xs font-bold text-purple-600 dark:text-purple-400 line-clamp-1">{resume.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="size-10 text-slate-400 group-hover:text-purple-500 transition-colors stroke-[1.5]" />
                          <div className="text-center">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-350">Upload your PDF file</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Supported format: PDF only (Max 10MB)</p>
                          </div>
                        </>
                      )}
                    </label>
                    <input 
                      type="file" 
                      id="resume-input" 
                      accept=".pdf" 
                      hidden 
                      onChange={(e) => setResume(e.target.files[0] || null)}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-750 text-white rounded-xl font-bold shadow-md shadow-purple-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircleIcon className="animate-spin size-4" />
                        <span>Parsing with AI...</span>
                      </>
                    ) : 'Upload & Parse Resume'}
                  </button>
                </div>
              </motion.form>
            </div>
          )}

          {/* Edit Title (Rename) Modal */}
          {editResumeId && (
            <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.form 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onSubmit={editTitle} 
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-7 overflow-hidden"
              >
                <button 
                  type="button"
                  onClick={() => { setEditResumeId(''); setTitle('') }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <XIcon size={18} />
                </button>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Rename Resume</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5">Change the title of this resume project.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">New Title</label>
                    <input 
                      onChange={(e) => setTitle(e.target.value)} 
                      value={title} 
                      type="text" 
                      placeholder="Enter new resume title" 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none text-sm"
                      required 
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold shadow-md shadow-indigo-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isLoading ? <LoaderCircleIcon className="animate-spin size-4" /> : 'Update Title'}
                  </button>
                </div>
              </motion.form>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default Dashboard
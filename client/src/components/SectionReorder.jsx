import React from 'react'
import { ArrowUp, ArrowDown, Move, User, FileText, Briefcase, GraduationCap, FolderIcon, Sparkles, CloudSnow } from 'lucide-react'
import { motion } from 'framer-motion'

const sectionMetadata = {
  summary: { name: "Professional Summary", icon: FileText },
  experience: { name: "Work Experience", icon: Briefcase },
  education: { name: "Education", icon: GraduationCap },
  projects: { name: "Projects", icon: FolderIcon },
  skills: { name: "Skills", icon: Sparkles },
  extracurricular: { name: "Extracurriculars", icon: CloudSnow },
}

const SectionReorder = ({ sectionsOrder = [], onChange }) => {
  // Ensure we have a default order if not defined
  const order = sectionsOrder.length > 0 
    ? sectionsOrder 
    : ['summary', 'experience', 'projects', 'education', 'skills', 'extracurricular']

  const handleMoveUp = (index) => {
    if (index === 0) return
    const newOrder = [...order]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index - 1]
    newOrder[index - 1] = temp
    onChange(newOrder)
  }

  const handleMoveDown = (index) => {
    if (index === order.length - 1) return
    const newOrder = [...order]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index + 1]
    newOrder[index + 1] = temp
    onChange(newOrder)
  }

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedIndex", index.toString())
  }

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10)
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return

    const newOrder = [...order]
    const [draggedItem] = newOrder.splice(sourceIndex, 1)
    newOrder.splice(targetIndex, 0, draggedItem)
    onChange(newOrder)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Move size={16} className="text-indigo-500" /> Section Order
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Drag and drop or use arrows to rearrange the order of sections on your resume.
        </p>
      </div>

      <div className="space-y-2">
        {order.map((sectionId, index) => {
          const meta = sectionMetadata[sectionId] || { name: sectionId, icon: Move }
          const Icon = meta.icon

          return (
            <motion.div
              key={sectionId}
              layoutId={`section-${sectionId}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-800 cursor-grab active:cursor-grabbing transition-colors duration-250 group"
            >
              <div className="flex items-center gap-3">
                <div className="text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">
                  <Move size={14} className="stroke-[2.5]" />
                </div>
                <div className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                  <Icon size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{meta.name}</span>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-900 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === order.length - 1}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-900 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SectionReorder

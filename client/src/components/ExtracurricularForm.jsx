import { Plus, Sparkle, X } from 'lucide-react'
import React, { useState } from 'react'

const ExtracurricularForm = ({ data, onChange }) => {

  const [newActivity, setNewActivity] = useState("")

  const addActivity = () => {
    if (newActivity.trim() && !data.includes(newActivity.trim())) {
      onChange([...(data || []), newActivity.trim()])
      setNewActivity("")
    }
  }

  const removeActivity = (indexToRemove) => {
    onChange((data || []).filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addActivity()
    }
  }

  const hasAny = (data || []).length > 0

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900'>Extracurricular Activities</h3>
        <p className='text-sm text-gray-600'>Add clubs, volunteering, competitions, or other activities.</p>
      </div>

      <div className='flex gap-2'>
        <input
          type="text"
          placeholder='e.g. Volunteer Tutor at Local NGO'
          className='flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg'
          onChange={(e) => setNewActivity(e.target.value)}
          value={newActivity}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addActivity}
          disabled={!newActivity.trim()}
          className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Plus className='size-4' />
          Add
        </button>
      </div>

      {hasAny ? (
        <div className='flex gap-2 flex-wrap'>
          {data.map((item, index) => (
            <span key={index} className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
              {item}
              <button
                onClick={() => removeActivity(index)}
                className='ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors'
              >
                <X className='w-3 h-3' />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className='text-center py-6 text-gray-500'>
          <Sparkle className='w-10 h-10 mx-auto mb-2 text-gray-300' />
          <p>No extracurricular activities added yet.</p>
          <p className='text-sm'>Add 1–3 of your strongest recent activities.</p>
        </div>
      )}
    </div>
  )
}

export default ExtracurricularForm


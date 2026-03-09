import { Plus, Sparkle, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {

    const[newSkill, setnewSkill] = useState("")

    const addSKill = () =>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()])
            setnewSkill("")
        }
    }

    const removeSkill = (indexToRemove) =>{
        onChange(data.filter((_, index)=> index !== indexToRemove))
    }

    const handleKeyPress = (e) =>{
        if(e.key === "Enter"){
            e.preventDefault();
            addSKill();

        }
    }
  return (
    <div className='space-y-4'>
        <div>
            <h3>Skills</h3>
            <p>Add Your technical and soft skills</p>
        </div>

        <div className='flex gap-2'>
            <input type="text" placeholder='Enter a skill (e.g. Javascript, FullStackDeveloper)' className='flex px-3 py-2 text-sm'
            onChange={(e)=>setnewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress} 
            />
            <button onClick={addSKill} disabled={!newSkill.trim()} className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                <Plus className='size-4'/>
                Add
            </button>
        </div>

        {data.length > 0 ? (
            <div className='flex  gap-2 flex-wrap'>
                {data.map((skill, index)=>(
                    <span key={index} className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                        {skill}
                       <button onClick={()=> removeSkill(index)} className='ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors'>
                        <X className='w-3 h-3'/>
                       </button>
                    </span>
                ))}
            </div>
        )
    :
    (
          <div className='text-center py-6 text-gray-500'>
            <Sparkle className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
            <p>No SKills added yet.</p>
            <p className='text-sm'>Add Your Technical and soft skills above.</p>
          </div>
    )}

    <div className='bg-blue-50 p-3 rounded-lg'>
        <p className='text-sm text-blue-800'><strong>Tip:</strong> 8-10 relevant skills. Include both technical skills(programming languages, tools) and soft skills (leadership, communication).</p>
    </div>
    

    </div>
  )
}

export default SkillsForm
import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className='text-center mt-2 max-w-3xl mx-auto'>
      <h2 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight'>
        {title}
      </h2>
      {description && (
        <p className='mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4'>
          {description}
        </p>
      )}
    </div>
  )
}

export default Title
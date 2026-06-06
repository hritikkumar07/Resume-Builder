import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'

const ResumePreview = ({data, template, accentColor, classes = ""}) => {

    const renderTemplate = ()=>{
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>;
            case "minimal-Image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
            case "professional":
                return <ProfessionalTemplate data={data} accentColor={accentColor}/>;
            case "creative":
                return <CreativeTemplate data={data} accentColor={accentColor}/>;
        
            default:
                  return <ClassicTemplate data={data} accentColor={accentColor}/>;
                
        
        }
    }
  return (
    <div className='w-full bg-white'>
        <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none" + classes}>
            {renderTemplate()}

        </div>

        <style jsx>
            {`
             @page {
             size: letter;
             margin: 0;
             }
             @media print {
                 @page {
                     margin: 0;
                 }
                 html, body {
                     height: auto !important;
                     overflow: visible !important;
                     background: white !important;
                 }
                 #resume-preview {
                     width: 100%;
                     height: auto;
                     margin: 0;
                     padding: 0;
                     box-shadow: none !important;
                     border: none !important;
                 }
             }
            `}
        </style>
    </div>
  )
}

export default ResumePreview
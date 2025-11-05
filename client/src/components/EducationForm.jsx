import { GraduationCap, Plus, Trash } from 'lucide-react';
import React from 'react'

const EducationForm = ({data,onChange}) => {

const addEducation=()=>{
  const newEducation={
    institution: "",
    degree:"",
    field:"",
    graduation_date:"",
    gpa:""
  };
  onChange([...data,newEducation])
}

const removeEducation=(idx)=>{
    const updated=data.filter((_,i)=>i!==idx);
    onChange(updated);
}

const updateEducation=(idx,field, value)=>{
    const updated=[...data];
    updated[idx]={...updated[idx],[field]:value}
    onChange(updated);
}    

  return (
    <div className='space-y-6'>
       <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold'>Education</h3>
                <p className='text-sm text-gray-500'>Add your education details</p>
            </div>
            <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors'>
                <Plus className='size-4'/>
                Add Education
            </button>
        </div>

      {data.length===0?(
        <div className='text-center py-8 text-gray-500'>
          <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
          <p className=''>No education added yet.</p>
          <p className='text-sm'>Click "Add Education" to get started.</p>
        </div>
      ):(
        <div className='space-y-4'>
            {data.map((education, idx)=>( 
              <div key={idx} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                <div className='flex justify-between items-center'>
                  <h4>Education #{idx+1}</h4>
                  <button onClick={()=>removeEducation(idx)} className='text-red-500 hover:text-red-700'>
                    <Trash className='size-4'/>
                  </button>
                </div>

                <div className='grid md:grid-cols-2 gap-3'>
                    <input value={education.institution||""} type="text" placeholder='Institution Name' className='px-3 py-2 text-sm' onChange={(e)=>updateEducation(idx, "institution", e.target.value)}/>

                    <input value={education.degree||""} type="text" placeholder="Degree (e.g., Bachelor's, Master's)" className='px-3 py-2 text-sm' onChange={(e)=>updateEducation(idx, "degree", e.target.value)}/>

                    <input value={education.field||""} type="text"className='px-3 py-2 text-sm' onChange={(e)=>updateEducation(idx, "field", e.target.value)} placeholder='Field of study'/>

                    <input value={education.graduation_date||""} type="month"className='px-3 py-2 text-sm' onChange={(e)=>updateEducation(idx, "graduation_date", e.target.value)}/>
                </div>

                <input value={education.gpa||""} type="text"className='px-3 py-2 text-sm' onChange={(e)=>updateEducation(idx, "gpa", e.target.value)} placeholder='GPA (Optional)'/>
                  
              </div>
            ))}
        </div>
      )}

    </div>
  )
}

export default EducationForm  
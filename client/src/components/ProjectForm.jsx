import { Plus, Trash } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data, onChange}) => {

    const addProject=()=>{
  const newProject={
    name: "",
    type:"",
    description:"",
  };
  onChange([...data,newProject])
}

const removeProject=(idx)=>{
    const updated=data.filter((_,i)=>i!==idx);
    onChange(updated);
}

const updateProject=(idx,field, value)=>{
    const updated=[...data];
    updated[idx]={...updated[idx],[field]:value}
    onChange(updated);
}    

  return (
    <div>
       <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold'>Projects</h3>
                <p className='text-sm text-gray-500'>Add your projects</p>
            </div>
            <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors'>
                <Plus className='size-4'/>
                Add Projects
            </button>
        </div>

     
        <div className='space-y-4 mt-6'>
            {data.map((project, idx)=>( 
              <div key={idx} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                <div className='flex justify-between items-center'>
                  <h4>Project #{idx+1}</h4>
                  <button onClick={()=>removeProject(idx)} className='text-red-500 hover:text-red-700'>
                    <Trash className='size-4'/>
                  </button>
                </div>

                <div className='grid gap-3'>

                    <input value={project.name||""} type="text" placeholder='Project Name' className='px-3 py-2 text-sm rounded-lg' onChange={(e)=>updateProject(idx, "name", e.target.value)}/>

                    <input value={project.type||""} type="text" placeholder="Project Type" className='px-3 py-2 text-sm rounded-lg' onChange={(e)=>updateProject(idx, "type", e.target.value)}/>

                    <textarea value={project.description||""} type="text" placeholder="Describe your Project..." className='w-full px-3 py-2 text-sm rounded-lg resize-none' rows={4} onChange={(e)=>updateProject(idx, "description", e.target.value)}/>

                </div>
                  
              </div>
            ))}
        </div>

    </div>
  )
}

export default ProjectForm
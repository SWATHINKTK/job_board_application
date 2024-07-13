import React from 'react'

const SelectField = ({ label, name, register, validation, error }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="jobRole" className="font-semibold mx-1">{label}</label>
            <select id={name} name={name}
                {...register(name, validation)}
                className='border py-2 px-2 rounded-lg'
            >
                <option value="">Select a role</option>
                <option value="internship">Internship</option>
                <option value="entry_level">Entry level</option>
                <option value="associate">Associate</option>
                <option value="mid_senior_level">Mid-Senior level</option>
                <option value="director">Director</option>
                <option value="executive">Executive</option>
            </select>
            {error && (<p className='text-red-500 text-xs mx-2'>* {error.message}</p>)}
        </div>
    )
}

export default SelectField

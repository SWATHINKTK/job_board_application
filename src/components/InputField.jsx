import React from 'react';

const InputField = ({ label, name, type = 'text', register, validation, error }) => (
  <div className='flex flex-col'>
    <label htmlFor={name} className='font-semibold mx-1'>{label}</label>
    <input
      id={name}
      type={type}
      {...register(name, validation)}
      className='border py-1 px-2 rounded-lg'
    />
    {error && <p className='text-red-500 text-xs mx-2'>* {error.message}</p>}
  </div>
);

export default InputField;

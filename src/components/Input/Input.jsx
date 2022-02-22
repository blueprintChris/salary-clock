import React from 'react';

const Input = props => {
  const { handleChange, label, name, placeholder, type } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} onChange={handleChange} placeholder={placeholder} />
    </>
  );
};

export default Input;

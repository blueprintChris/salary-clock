import React from 'react';
import { StyledInput } from './styles';

const Input = props => {
  const { handleChange, label, name, placeholder, type } = props;
  return (
    <StyledInput>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} onChange={handleChange} placeholder={placeholder} />
    </StyledInput>
  );
};

export default Input;

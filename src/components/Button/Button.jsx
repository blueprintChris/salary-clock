import React from 'react';
import { StyledButton } from './styles';

const Button = props => {
  const { handleClick, label } = props;
  return <StyledButton onClick={handleClick}>{label}</StyledButton>;
};

export default Button;

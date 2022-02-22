import React from 'react';
import { StyledError } from './styles';

const Error = props => {
  const { children } = props;
  return <StyledError>{children}</StyledError>;
};

export default Error;

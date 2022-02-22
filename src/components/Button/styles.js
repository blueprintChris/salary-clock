import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  margin-top: 2rem;
  border: 0;
  background-color: #b5e853;
  border: 1px solid rgba(0, 0, 0, 0);
  outline: 0;
  min-height: 3rem;
  padding: 1.2rem 0;
  border-radius: 0.6rem;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.1s linear, color 0.1s linear;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #b5e853;
    color: #b5e853;
  }
`;

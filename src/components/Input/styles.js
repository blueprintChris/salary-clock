import styled from 'styled-components';

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  width: 100%;

  label {
    margin-bottom: 0.6rem;
  }

  input {
    box-sizing: border-box;
    font-size: inherit;
    width: 100%;
    min-height: 2.8rem;
    padding: 0 1.2rem;
    line-height: 4rem;
    font-size: 1.6rem;
    border-radius: 0.6rem;
    outline: none;
    border: 1px solid #30363d;
    color: #f0f6fc;
    background-color: #0d1117;
    font-family: inherit;
    transition: line-height 0.2s linear;

    &:focus {
      border: 1px solid #b5e853;
      line-height: 5rem;
    }
  }
`;

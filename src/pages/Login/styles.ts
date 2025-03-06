import styled from 'styled-components';

export const Form = styled.form`
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  
  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
  }
`;

export const Link = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    color: var(--accent);
  }
`;
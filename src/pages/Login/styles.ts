import styled from 'styled-components';

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
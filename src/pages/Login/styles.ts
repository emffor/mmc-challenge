import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding: 2rem;
`;

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

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  background: #ffffff;
  border: 1px solid #e1e5eb;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 1.2rem;
  outline: none;
  transition: var(--transition);
  
  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(249, 168, 38, 0.15);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  transition: var(--transition);
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(249, 168, 38, 0.25);
  }
  
  &:active {
    transform: translateY(0);
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
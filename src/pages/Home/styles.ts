import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e1e5eb;
  background-color: #fff; 
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  @media (min-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const Button = styled.button`
  background: var(--accent);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
  
  &:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(249, 168, 38, 0.25);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const Card = styled.div`
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: var(--transition);
  cursor: pointer;
  border: 1px solid #e1e5eb;
  height: 100%;
  box-shadow: var(--shadow);
  
  h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--accent);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  
  span {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(249, 168, 38, 0.1);
    border-radius: 50%;
    border-top-color: var(--accent);
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

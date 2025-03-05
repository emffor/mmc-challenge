import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--bg-secondary);
`;

export const BackButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid #e1e5eb;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: var(--transition);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  
  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(249, 168, 38, 0.05);
  }
`;

export const Card = styled.div`
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  border: 1px solid #e1e5eb;
  max-width: 800px;
  margin: 0 auto;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2rem;
    border-bottom: 3px solid var(--accent);
    padding-bottom: 0.5rem;
    display: inline-block;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const InfoItem = styled.div`
  h3 {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    font-size: 1.1rem;
    color: var(--text-primary);
    font-weight: 500;
  }
`;

export const FilmsList = styled.div`
  margin-top: 2rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const FilmItem = styled.li`
  background: #f5f7fa;
  border-radius: var(--border-radius);
  padding: 0.8rem 1rem;
  color: var(--text-primary);
  transition: var(--transition);
  border: 1px solid #e1e5eb;
  
  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
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
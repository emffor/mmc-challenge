import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background-color: #1a1a1a; /* Fundo escuro para um visual futurista */
`;

export const BackButton = styled.button`
  background: transparent;
  color: #e1e5eb;
  border: 1px solid #e1e5eb;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    color: #f9a826; /* Amarelo Star Wars */
    border-color: #f9a826;
    background: rgba(249, 168, 38, 0.1);
  }
`;

export const Card = styled.div`
  background: #252525; /* Cinza escuro para o cartão */
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  margin: 0 auto;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 2rem;
    border-bottom: 4px solid #f9a826;
    padding-bottom: 0.5rem;
    display: inline-block;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const InfoItem = styled.div`
  h3 {
    font-size: 0.9rem;
    color: #b0b0b0;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  p {
    font-size: 1.1rem;
    color: #ffffff;
    font-weight: 500;
  }
`;

export const FilmsList = styled.div`
  margin-top: 2.5rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #ffffff;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

export const FilmItem = styled.li<{ $expanded: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px; 
  padding: 1.5rem;
  background-color: ${props => (props.$expanded ? '#303030' : '#2a2a2a')};
  border-radius: 10px;
  border: 1px solid #404040;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${props => (props.$expanded ? '0 6px 20px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)')};
  
  &:hover {
    transform: scale(1.05); 
    border-color: #f9a826;
  }
  
  h3 {
    font-size: 1.2rem;
    color: #ffffff;
    margin-bottom: ${props => (props.$expanded ? '1rem' : '0')};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .details {
    display: ${props => (props.$expanded ? 'block' : 'none')};
    color: #e1e5eb;
    font-size: 0.95rem;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(249, 168, 38, 0.2);
    border-radius: 50%;
    border-top-color: #f9a826;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
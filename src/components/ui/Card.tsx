import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  padding?: string;
  hoverable?: boolean;
  style?: React.CSSProperties; 
}

const CardContainer = styled.div<{ padding?: string; hoverable?: boolean; onClick?: () => void }>`
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: ${props => props.padding || 'clamp(1rem, 5vw, 1.5rem)'};
  transition: var(--transition);
  border: 1px solid #e1e5eb;
  height: 100%;
  box-shadow: var(--shadow);
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  overflow: hidden; 
  
  ${props => props.hoverable && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-color: var(--accent);
    }
    
    @media (max-width: 768px) {
      &:hover {
        transform: translateY(-3px); 
      }
    }
    
    @media (max-width: 480px) {
      &:active {
        transform: translateY(-2px); 
      }
    }
  `}
  
  @media (max-width: 480px) {
    padding: ${props => props.padding || '0.75rem'};
  }
`;

export const Card = ({ children, onClick, padding, hoverable = false, style }: CardProps) => {
  return (
    <CardContainer 
      onClick={onClick} 
      padding={padding} 
      hoverable={hoverable}
      style={style} 
    >
      {children}
    </CardContainer>
  );
};
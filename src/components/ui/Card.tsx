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
  padding: ${props => props.padding || '1.5rem'};
  transition: var(--transition);
  border: 1px solid #e1e5eb;
  height: 100%;
  box-shadow: var(--shadow);
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  ${props => props.hoverable && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-color: var(--accent);
    }
  `}
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
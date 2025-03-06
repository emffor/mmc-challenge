import styled from 'styled-components';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const ButtonStyled = styled.button<ButtonProps>`
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; 
  
  background: ${props => 
    props.variant === 'outline' ? 'transparent' : 
    props.variant === 'secondary' ? '#f8f9fa' : 
    'var(--accent)'};
  color: ${props => 
    props.variant === 'outline' || props.variant === 'secondary' ? 
    'var(--text-primary)' : 'white'};
  border: ${props => 
    props.variant === 'outline' ? '1px solid var(--accent)' : 
    props.variant === 'secondary' ? '1px solid #e1e5eb' : 
    'none'};
  
  padding: ${props => 
    props.size === 'small' ? '0.5rem 1rem' : 
    props.size === 'large' ? '1rem 1.5rem' : 
    '0.7rem 1.2rem'};
  font-size: ${props => 
    props.size === 'small' ? '0.875rem' : 
    props.size === 'large' ? '1rem' : 
    '0.9rem'};
  
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${props => 
        props.variant === 'outline' ? 'rgba(249, 168, 38, 0.1)' :
        props.variant === 'secondary' ? '#f1f3f5' : 
        'var(--accent-hover)'};
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  @media (hover: none) {
    &:active:not(:disabled) {
      background: ${props => 
        props.variant === 'outline' ? 'rgba(249, 168, 38, 0.2)' :
        props.variant === 'secondary' ? '#e9ecef' : 
        'var(--accent-hover)'};
      transform: translateY(1px);
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 480px) {
    min-height: 40px;
    min-width: 90px; 
    font-size: 0.85rem;
    padding: ${props => 
      props.size === 'small' ? '0.4rem 0.8rem' : 
      props.size === 'large' ? '0.8rem 1.2rem' : 
      '0.6rem 1rem'};
  }
`;

export const Button = ({ children, variant = 'primary', size = 'medium', fullWidth = false, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled variant={variant} size={size} fullWidth={fullWidth} {...rest}>
      {children}
    </ButtonStyled>
  );
};
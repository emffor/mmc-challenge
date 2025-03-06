import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const InputLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: clamp(0.75rem, 4vw, 1rem) clamp(1rem, 5vw, 1.2rem);
  background: #ffffff;
  border: 1px solid ${props => props.hasError ? 'var(--error)' : '#e1e5eb'};
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: var(--transition);
  
  &:focus {
    border-color: ${props => props.hasError ? 'var(--error)' : 'var(--accent)'};
    box-shadow: 0 0 0 3px ${props => 
      props.hasError ? 'rgba(255, 59, 48, 0.15)' : 'rgba(249, 168, 38, 0.15)'};
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
  }
  
  @supports (-webkit-touch-callout: none) {
    font-size: 16px; 
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 0.8rem;
  margin-top: 0.4rem;
`;

export const Input = ({ error, label, fullWidth = false, ...rest }: InputProps) => {
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput hasError={!!error} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};
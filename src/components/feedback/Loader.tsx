import styled from 'styled-components';

interface LoaderProps {
  size?: string;
  color?: string;
  centered?: boolean;
}

const LoaderContainer = styled.div<{ centered?: boolean }>`
  ${props => props.centered && `
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    width: 100%;
  `}
`;

const SpinnerElement = styled.div<{ size?: string; color?: string }>`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 3px solid ${props => props.color ? `${props.color}20` : 'rgba(249, 168, 38, 0.1)'};
  border-radius: 50%;
  border-top-color: ${props => props.color || 'var(--accent)'};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const Loader = ({ size, color, centered = true }: LoaderProps) => {
  return (
    <LoaderContainer centered={centered}>
      <SpinnerElement size={size} color={color} />
    </LoaderContainer>
  );
};
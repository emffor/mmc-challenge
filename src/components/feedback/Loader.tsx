import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  size?: string;
  color?: string;
  centered?: boolean;
  fullPage?: boolean;
  text?: string;
}

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoaderContainer = styled.div<{ centered?: boolean; fullPage?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${props => props.fullPage ? '100vh' : props.centered ? '200px' : 'auto'};
  position: ${props => props.fullPage ? 'fixed' : 'relative'};
  top: ${props => props.fullPage ? '0' : 'auto'};
  left: ${props => props.fullPage ? '0' : 'auto'};
  right: ${props => props.fullPage ? '0' : 'auto'};
  bottom: ${props => props.fullPage ? '0' : 'auto'};
  background: ${props => props.fullPage ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  z-index: ${props => props.fullPage ? '9999' : '1'};
  backdrop-filter: ${props => props.fullPage ? 'blur(5px)' : 'none'};
  animation: ${fadeIn} 0.3s ease;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const SpinnerElement = styled.div<{ size?: string; color?: string; fullPage?: boolean }>`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
  position: relative;
  
  &:before, &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
  }
  
  &:before {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 40%, ${props => props.color || 'var(--accent)'});
    animation: ${rotate} 1.5s linear infinite;
  }
  
  &:after {
    width: 85%;
    height: 85%;
    background: ${props => props.fullPage ? 'white' : 'var(--bg-primary)'};
    top: 7.5%;
    left: 7.5%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const LoaderText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
  animation: ${pulse} 2s infinite ease-in-out;
`;

export const Loader = ({ size, color, centered = true, fullPage = false, text }: LoaderProps) => {
  return (
    <LoaderContainer centered={centered} fullPage={fullPage}>
      <SpinnerWrapper>
        <SpinnerElement size={size} color={color} fullPage={fullPage} />
      </SpinnerWrapper>
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  );
};
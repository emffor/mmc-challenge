import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const twinkle = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  position: relative;
  overflow: hidden;
  padding: 1rem;
`;

export const StarsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 3px);
    background-size: 50px 50px;
    background-position: 0 0, 25px 25px;
    animation: ${twinkle} 4s infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 2px);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
    animation: ${twinkle} 3s infinite;
    animation-delay: 1s;
  }
`;

export const AuthCard = styled.div<{ $show: boolean }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)'};
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease;
`;

export const LogoImage = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--accent), #F76B1C);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 4px 10px rgba(249, 168, 38, 0.4);
  animation: ${float} 3s ease-in-out infinite;
  margin-right: 15px;
`;

export const LogoText = styled.h2`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
  background: linear-gradient(90deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.2rem;
  animation: ${fadeIn} 0.8s ease;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
`;

export const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.8s ease;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const RegisterLink = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    color: var(--accent);
  }
`;

export const Highlight = styled.span`
  color: var(--accent);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
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
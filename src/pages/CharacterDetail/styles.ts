import styled from 'styled-components';

const breakpoints = {
  smallMobile: '380px',
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

export const Container = styled.div<{ $isSmallScreen?: boolean }>`
  padding: ${props => props.$isSmallScreen ? '0.75rem' : 'clamp(1rem, 4vw, 2rem)'};
  min-height: 100vh;
  background-color: var(--bg-secondary);
  background-image: linear-gradient(to bottom, #f8f9fa, #f0f2f5);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 0.5rem;
  }
`;

export const BackButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid #e1e5eb;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.8rem, 3vw, 0.9rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  transition: all 0.3s ease;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  &:hover, &:active {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(249, 168, 38, 0.05);
  }
  @media (hover: hover) {
    &:hover {
      transform: translateX(-5px);
      box-shadow: 0 5px 15px rgba(249, 168, 38, 0.1);
    }
  }
  &:active {
    transform: translateX(-2px);
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: center;
  }
`;

export const Card = styled.div<{ $isSmallScreen?: boolean }>`
  background: var(--card-bg);
  border-radius: ${props => props.$isSmallScreen ? '12px' : '16px'};
  padding: ${props => props.$isSmallScreen ? '1rem 0.75rem' : 'clamp(1.25rem, 5vw, 2.5rem)'};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(225, 229, 235, 0.6);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  h1 {
    font-size: clamp(1.5rem, 6vw, 2.2rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: clamp(1.25rem, 5vw, 2rem);
    position: relative;
    padding-bottom: 0.75rem;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: clamp(50px, 30%, 80px);
      height: 4px;
      background: linear-gradient(90deg, var(--accent), #f9ca24);
      border-radius: 4px;
    }
  }
  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 12px;
    padding: 1.25rem 0.75rem;
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    padding: 1rem 0.5rem;
  }
`;

export const InfoGrid = styled.div<{ $isSmallScreen?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: clamp(1rem, 4vw, 1.5rem);
  margin-top: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: clamp(2rem, 6vw, 3rem);
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
  }
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr));
  }
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

export const InfoItem = styled.div<{ $fullWidth?: boolean }>`
  backdrop-filter: blur(10px);
  padding: clamp(0.75rem, 3vw, 1rem);
  border-radius: 12px;
  transition: all 0.3s ease;
  grid-column: ${props => props.$fullWidth ? '1 / -1' : 'auto'};
  @media (hover: hover) {
    &:hover {
      background: rgba(249, 249, 249, 0.5);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
      transform: translateY(-3px);
    }
    &:hover h3::after {
      width: 40px;
    }
  }
  @media (hover: none) {
    &:active {
      background: rgba(249, 249, 249, 0.5);
    }
  }
  h3 {
    font-size: clamp(0.75rem, 3vw, 0.9rem);
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 20px;
      height: 2px;
      background: var(--accent);
      transition: width 0.3s ease;
      border-radius: 2px;
    }
  }
  p {
    font-size: clamp(0.9rem, 3.5vw, 1.1rem);
    color: var(--text-primary);
    font-weight: 500;
    word-break: break-word;
  }
  strong {
    font-weight: 600;
    color: var(--text-primary);
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    padding: 0.6rem;
    h3 {
      font-size: 0.75rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
`;

export const FilmsList = styled.div<{ $isSmallScreen?: boolean }>`
  margin: ${props => props.$isSmallScreen ? '1.25rem 0' : 'clamp(1.75rem, 6vw, 2.5rem) 0'};
  h2 {
    font-size: clamp(1.25rem, 5vw, 1.5rem);
    margin-bottom: clamp(1.25rem, 5vw, 1.5rem);
    color: var(--text-primary);
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40%;
      height: 4px;
      background: linear-gradient(90deg, var(--accent), transparent);
      border-radius: 4px;
    }
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${props => props.$isSmallScreen ? '0.5rem' : 'clamp(0.75rem, 3vw, 1rem)'};
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    margin: 1rem 0;
    h2 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
  }
`;

export const FilmItem = styled.li<{ $expanded: boolean; $isSmallScreen?: boolean }>`
  position: relative;
  width: 100%;
  padding: ${props => props.$expanded ? (props.$isSmallScreen ? '1rem 0.75rem' : 'clamp(1.25rem, 4vw, 1.5rem)') : (props.$isSmallScreen ? '0.6rem 0.5rem' : 'clamp(0.8rem, 3vw, 1rem)')};
  margin-bottom: ${props => props.$isSmallScreen ? '0.5rem' : 'clamp(0.75rem, 3vw, 1rem)'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.25s ease, transform 0.3s ease;
  overflow: hidden;
  touch-action: manipulation;
  background: ${props => props.$expanded ? 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  border: 1px solid ${props => props.$expanded ? 'transparent' : '#e0e0e0'};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: ${props => props.$expanded ? 'linear-gradient(135deg, var(--accent), #74b9ff)' : 'transparent'};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: ${props => props.$expanded ? 1 : 0};
    transition: opacity 0.4s ease;
  }
  @media (hover: hover) {
    transform: ${props => props.$expanded ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)'};
  }
  @media (hover: none) {
    transform: ${props => props.$expanded ? 'translateY(-2px)' : 'translateY(0)'};
  }
  box-shadow: ${props => props.$expanded ? '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)' : '0 2px 5px rgba(0, 0, 0, 0.05)'};
  h3 {
    position: relative;
    font-size: ${props => props.$isSmallScreen ? '0.9rem' : 'clamp(1rem, 4vw, 1.2rem)'};
    font-weight: 600;
    margin-bottom: ${props => props.$expanded ? 'clamp(1rem, 4vw, 1.2rem)' : '0'};
    transition: all 0.4s ease;
    color: var(--text-primary);
    padding-right: 30px;
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: ${props => props.$expanded ? 'clamp(40px, 20%, 60px)' : '0'};
      height: 3px;
      background: linear-gradient(90deg, var(--accent), #74b9ff);
      transition: width 0.5s ease;
      border-radius: 3px;
    }
  }
  .details {
    animation: slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    p {
      margin-bottom: ${props => props.$isSmallScreen ? '0.3rem' : 'clamp(0.4rem, 2vw, 0.5rem)'};
      font-size: ${props => props.$isSmallScreen ? '0.8rem' : 'clamp(0.85rem, 3.5vw, 0.95rem)'};
      line-height: 1.6;
      color: var(--text-secondary);
      strong {
        color: var(--text-primary);
        font-weight: 600;
      }
    }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${props => props.$expanded ? '1.25rem 1rem' : '0.8rem'};
    .details {
      p {
        font-size: 0.85rem;
      }
    }
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    padding: ${props => props.$expanded ? '0.9rem 0.7rem' : '0.6rem 0.5rem'};
    border-radius: 8px;
    h3 {
      font-size: 0.9rem;
      padding-right: 24px;
    }
    .details {
      p {
        font-size: 0.8rem;
        margin-bottom: 0.3rem;
      }
    }
  }
  @media (hover: none) {
    &:active {
      opacity: 0.9;
    }
    ${props => props.$expanded && `
      transform: translateY(-2px);
    `}
  }
`;

export const CloseButton = styled.button<{ $isExpanded: boolean; $isSmallScreen?: boolean }>`
  content: '+';
  position: absolute;
  top: ${props => props.$isExpanded ? (props.$isSmallScreen ? '0.5rem' : 'clamp(0.6rem, 3vw, 0.75rem)') : (props.$isSmallScreen ? '0.4rem' : 'clamp(0.5rem, 2vw, 0.5rem)')};
  right: ${props => props.$isExpanded ? (props.$isSmallScreen ? '0.5rem' : 'clamp(0.75rem, 3vw, 1rem)') : (props.$isSmallScreen ? '0.5rem' : 'clamp(0.6rem, 2.5vw, 0.75rem)')};
  width: ${props => props.$isExpanded ? (props.$isSmallScreen ? '24px' : 'clamp(28px, 6vw, 32px)') : (props.$isSmallScreen ? '20px' : 'clamp(22px, 5vw, 26px)')};
  height: ${props => props.$isExpanded ? (props.$isSmallScreen ? '24px' : 'clamp(28px, 6vw, 32px)') : (props.$isSmallScreen ? '20px' : 'clamp(22px, 5vw, 26px)')};
  border-radius: 50%;
  border: none;
  padding: 0;
  background: ${props => props.$isExpanded ? 'linear-gradient(135deg, var(--accent), #f9ca24)' : 'var(--accent)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$isExpanded ? (props.$isSmallScreen ? '16px' : 'clamp(18px, 4.5vw, 22px)') : (props.$isSmallScreen ? '14px' : 'clamp(16px, 4vw, 20px)')};
  transform: ${props => props.$isExpanded ? 'rotate(45deg)' : 'rotate(0)'};
  transition: all 0.4s ease;
  opacity: ${props => props.$isExpanded ? 1 : 0.8};
  cursor: pointer;
  z-index: 5;
  &::before {
    content: '+';
  }
  @media (hover: hover) {
    &:hover {
      opacity: 1;
      transform: ${props => props.$isExpanded ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1.1)'};
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }
  }
  @media (hover: none) {
    width: ${props => props.$isExpanded ? '32px' : '28px'};
    height: ${props => props.$isExpanded ? '32px' : '28px'};
    &:active {
      transform: ${props => props.$isExpanded ? 'rotate(45deg) scale(0.9)' : 'rotate(0) scale(0.9)'};
      opacity: 0.8;
    }
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  .spinner {
    width: clamp(40px, 10vw, 50px);
    height: clamp(40px, 10vw, 50px);
    border: 4px solid rgba(249, 168, 38, 0.1);
    border-radius: 50%;
    border-top-color: var(--accent);
    animation: spin 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border-radius: 50%;
      border: 1px solid transparent;
      border-top-color: rgba(249, 168, 38, 0.3);
      animation: spin 2s linear infinite;
    }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    min-height: 200px;
    .spinner {
      width: 35px;
      height: 35px;
      border-width: 3px;
      &::before {
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
      }
    }
  }
`;
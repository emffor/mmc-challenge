import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const LoaderWrapper = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CharacterCardWrapper = styled.div<{ $isLoading: boolean }>`
  transition: all 0.5s ease;
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  transform: ${props => props.$isLoading ? 'translateY(10px)' : 'translateY(0)'};
  
  ${props => props.$isLoading && css`
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        var(--shimmer-start, rgba(255, 255, 255, 0.1)) 25%, 
        var(--shimmer-mid, rgba(255, 255, 255, 0.2)) 50%, 
        var(--shimmer-start, rgba(255, 255, 255, 0.1)) 75%);
      background-size: 200% 100%;
      animation: ${shimmer} 1.5s infinite;
      z-index: 1;
      pointer-events: none;
      border-radius: var(--border-radius);
    }

    [data-theme='dark'] &::before {
      --shimmer-start: rgba(30, 30, 30, 0.2);
      --shimmer-mid: rgba(40, 40, 40, 0.3);
    }
  `}
`;

export const InfoGrid = styled.div<{ $isSmallScreen?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: clamp(1rem, 4vw, 1.5rem);
  margin: clamp(1.5rem, 5vw, 2rem) 0 clamp(2rem, 6vw, 3rem);
  position: relative;
  animation: ${fadeIn} 0.5s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--divider-color, rgba(0,0,0,0.05)), transparent);
  }

  [data-theme='dark'] &::after {
    --divider-color: rgba(255,255,255,0.1);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

export const InfoItem = styled.div<{ $fullWidth?: boolean }>`
  padding: clamp(0.75rem, 3vw, 1rem);
  border-radius: 12px;
  transition: all 0.3s ease;
  grid-column: ${props => props.$fullWidth ? '1 / -1' : 'auto'};
  animation: ${fadeIn} 0.5s ease;
  
  &:hover {
    background: var(--hover-bg, rgba(249, 249, 249, 0.5));
    box-shadow: var(--hover-shadow, 0 4px 15px rgba(0, 0, 0, 0.03));
    transform: translateY(-3px);
  }

  [data-theme='dark'] &:hover {
    --hover-bg: rgba(40, 40, 40, 0.5);
    --hover-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
`;

export const FilmsList = styled.div<{ $isSmallScreen?: boolean }>`
  margin: ${props => props.$isSmallScreen ? '1.25rem 0' : 'clamp(1.75rem, 6vw, 2.5rem) 0'};
  animation: ${fadeIn} 0.5s ease;
  
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
`;

export const FilmItem = styled.li<{ $expanded: boolean; $isSmallScreen?: boolean }>`
  position: relative;
  width: 100%;
  padding: ${props => props.$expanded ? 
    (props.$isSmallScreen ? '1rem 0.75rem' : 'clamp(1.25rem, 4vw, 1.5rem)') : 
    (props.$isSmallScreen ? '0.6rem 0.5rem' : 'clamp(0.8rem, 3vw, 1rem)')};
  margin-bottom: ${props => props.$isSmallScreen ? '0.5rem' : 'clamp(0.75rem, 3vw, 1rem)'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  touch-action: manipulation;
  background: ${props => props.$expanded ? 
    'var(--expanded-film-bg, linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%))' : 
    'var(--film-bg, linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%))'};
  border: 1px solid ${props => props.$expanded ? 'transparent' : 'var(--film-border, #e0e0e0)'};
  animation: ${fadeIn} 0.5s ease;
  transform: ${props => props.$expanded ? 'translateY(-5px)' : 'translateY(0)'};
  box-shadow: ${props => props.$expanded ? 
    'var(--expanded-film-shadow, 0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05))' : 
    'var(--film-shadow, 0 2px 5px rgba(0, 0, 0, 0.05))'};

  [data-theme='dark'] & {
    --film-bg: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
    --expanded-film-bg: linear-gradient(135deg, #222 0%, #2a2a2a 100%);
    --film-border: #444;
    --film-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    --expanded-film-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
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
`;

export const CloseButton = styled.button<{ $isExpanded: boolean; $isSmallScreen?: boolean }>`
  position: absolute;
  top: ${props => props.$isExpanded ? 
    (props.$isSmallScreen ? '0.5rem' : 'clamp(0.6rem, 3vw, 0.75rem)') : 
    (props.$isSmallScreen ? '0.4rem' : 'clamp(0.5rem, 2vw, 0.5rem)')};
  right: ${props => props.$isExpanded ? 
    (props.$isSmallScreen ? '0.5rem' : 'clamp(0.75rem, 3vw, 1rem)') : 
    (props.$isSmallScreen ? '0.5rem' : 'clamp(0.6rem, 2.5vw, 0.75rem)')};
  width: ${props => props.$isExpanded ? 
    (props.$isSmallScreen ? '24px' : 'clamp(28px, 6vw, 32px)') : 
    (props.$isSmallScreen ? '20px' : 'clamp(22px, 5vw, 26px)')};
  height: ${props => props.$isExpanded ? 
    (props.$isSmallScreen ? '24px' : 'clamp(28px, 6vw, 32px)') : 
    (props.$isSmallScreen ? '20px' : 'clamp(22px, 5vw, 26px)')};
  border-radius: 50%;
  border: none;
  background: ${props => props.$isExpanded ? 
    'linear-gradient(135deg, var(--accent), #f9ca24)' : 'var(--accent)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$isExpanded ? 
    (props.$isSmallScreen ? '16px' : 'clamp(18px, 4.5vw, 22px)') : 
    (props.$isSmallScreen ? '14px' : 'clamp(16px, 4vw, 20px)')};
  transform: ${props => props.$isExpanded ? 'rotate(45deg)' : 'rotate(0)'};
  transition: all 0.4s ease;
  opacity: ${props => props.$isExpanded ? 1 : 0.8};
  cursor: pointer;
  z-index: 5;
  
  &::before {
    content: '+';
  }
  
  &:hover {
    opacity: 1;
    transform: ${props => props.$isExpanded ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1.1)'};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
`;
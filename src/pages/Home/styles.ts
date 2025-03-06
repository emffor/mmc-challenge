import styled, { keyframes, css } from 'styled-components';
import { Card } from '../../components/ui/Card';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const ContentWrapper = styled.div<{ $isLoading: boolean }>`
  position: relative;
  min-height: 400px;
  transition: all 0.3s ease;
  
  ${props => props.$isLoading && css`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.05);
      pointer-events: none;
      z-index: 1;
    }
  `}
`;

export const OverlayLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(3px);
  z-index: 5;
  animation: ${fadeIn} 0.3s ease;
  border-radius: var(--border-radius);
`;

export const CharacterCard = styled(Card)<{ $dimmed?: boolean }>`
  position: relative;
  transition: all 0.3s ease;
  opacity: ${props => props.$dimmed ? 0.7 : 1};
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px);
    }
    
    &:hover:before {
      opacity: 1;
    }
  }
  
  @media (hover: none) {
    &:active {
      transform: translateY(-4px);
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent) 0%, #5D6DF1 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

export const CharacterName = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  background: linear-gradient(90deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    width: 100%; 
  }
`;

export const BirthYear = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(0,0,0,0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const AttributeRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const AttributeLabel = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-width: 70px;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    min-width: 60px;
  }
`;

export const AttributeValue = styled.span`
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const Badge = styled.div<{ color?: string }>`
  background: ${props => props.color || 'var(--accent)'};
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  display: inline-block;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.15rem 0.5rem;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  margin: 1rem 0;
  
  @media (max-width: 480px) {
    margin: 0.75rem 0;
  }
`;

export const FilmBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

export const FilmBadge = styled.div<{ filmId: number }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => `hsl(${props.filmId * 35}, 70%, 60%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
  
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
    font-size: 0.65rem;
  }
`;

export const StatusBar = styled.div<{ width: number, color?: string }>`
  height: 4px;
  background: #eaeaea;
  border-radius: 2px;
  overflow: hidden;
  flex-grow: 1;
  
  &:after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => `${props.width}%`};
    background: ${props => props.color || 'var(--accent)'};
    border-radius: 2px;
    transition: width 0.5s ease;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem 0;
  
  span {
    text-align: center;
  }
  
  @media (max-width: 480px) {
    margin-top: 1.5rem;
  }
`;
// src/pages/Home/styles.ts
import styled from 'styled-components';
import { Card } from '../../components/ui/Card';

export const CharacterCard = styled(Card)`
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
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
  
  &:hover:before {
    opacity: 1;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const CharacterName = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  background: linear-gradient(90deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

export const BirthYear = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(0,0,0,0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

export const AttributeRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export const AttributeLabel = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-width: 70px;
`;

export const AttributeValue = styled.span`
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
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
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  margin: 1rem 0;
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
  
  &:hover {
    transform: scale(1.1);
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
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;
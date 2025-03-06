import styled from 'styled-components';

interface GridProps {
  children: React.ReactNode;
  columns?: string;
  gap?: string;
}

const StyledGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fill, minmax(280px, 1fr))'};
  gap: ${props => props.gap || '1.5rem'};
  width: 100%;
`;

export const Grid = ({ children, ...props }: GridProps) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};
import styled from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
  padding?: string;
  maxWidth?: string;
  centerContent?: boolean;
}

const StyledContainer = styled.div<ContainerProps>`
  padding: ${props => props.padding || '1.5rem'};
  max-width: ${props => props.maxWidth || '1280px'};
  width: 100%;
  margin: 0 auto;
  ${props => props.centerContent && `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  `}
`;

export const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};
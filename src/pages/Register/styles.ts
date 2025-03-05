import styled from 'styled-components';
import { Form as LoginForm, Input, Button, Link } from '../Login/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding: 2rem;
`;

export const Form = styled(LoginForm)`
  max-width: 450px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0;
  }
`;

export { Input, Button, Link };
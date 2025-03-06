import styled from 'styled-components';
import { Form as LoginForm,  Link } from '../Login/styles';

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

export const ErrorMessage = styled.p`
  color: var(--error);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

export { Link };
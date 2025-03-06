import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { LoginFormData } from './types';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        navigate('/home');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <S.Input 
          type="email"
          name="email"
          placeholder="E-mail" 
          value={formData.email}
          onChange={handleChange}
          required
        />
        <S.Input 
          type="password"
          name="password" 
          placeholder="Senha" 
          value={formData.password}
          onChange={handleChange}
          required
        />
        <S.Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </S.Button>
        <S.Link onClick={() => navigate('/register')}>
          Não tem uma conta? Registre-se
        </S.Link>
      </S.Form>
    </S.Container>
  );
};

export default Login;
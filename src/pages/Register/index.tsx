import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { RegisterFormData } from './types';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem('user', JSON.stringify({ 
          name: formData.name, 
          email: formData.email 
        }));
        navigate('/home');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <h1>Criar Conta</h1>
        
        <S.Input 
          type="text"
          name="name" 
          placeholder="Nome completo" 
          value={formData.name}
          onChange={handleChange}
          required
        />
        
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
        
        <S.Input 
          type="password"
          name="confirmPassword" 
          placeholder="Confirmar senha" 
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        
        <S.Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Registrar'}
        </S.Button>
        
        <S.Link onClick={() => navigate('/login')}>
          Já tem uma conta? Faça login
        </S.Link>
      </S.Form>
    </S.Container>
  );
};

export default Register;
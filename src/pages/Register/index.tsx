import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { RegisterFormData } from './types';
import * as S from '../../styles/authStyles';

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
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'confirmPassword' || name === 'password') {
      setError('');
    }
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
    <S.AuthContainer>
      <S.StarsBackground />
      <S.AuthCard $show={animation}>
        <S.LogoArea>
          <S.LogoImage>SW</S.LogoImage>
          <S.LogoText>Star Wars Explorer</S.LogoText>
        </S.LogoArea>
        
        <form onSubmit={handleSubmit}>
          <S.FormTitle>
            Criar Conta
          </S.FormTitle>
          
          <S.InputGroup>
            <S.InputLabel>Nome Completo</S.InputLabel>
            <Input 
              type="text"
              name="name" 
              placeholder="Seu nome completo" 
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.InputLabel>Email</S.InputLabel>
            <Input 
              type="email"
              name="email" 
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.InputLabel>Senha</S.InputLabel>
            <Input 
              type="password"
              name="password" 
              placeholder="Crie uma senha" 
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.InputLabel>Confirme a Senha</S.InputLabel>
            <Input 
              type="password"
              name="confirmPassword" 
              placeholder="Digite a senha novamente" 
              value={formData.confirmPassword}
              onChange={handleChange}
              error={error}
              fullWidth
              required
            />
          </S.InputGroup>
          
          <S.ButtonWrapper>
            <Button 
              type="submit" 
              disabled={loading}
              size="large"
              fullWidth
            >
              {loading ? <Loader size="20px" centered={false} /> : 'Registrar'}
            </Button>
          </S.ButtonWrapper>
          
          <S.RegisterLink onClick={() => navigate('/login')}>
            Já tem uma conta? <S.Highlight>Faça login</S.Highlight>
          </S.RegisterLink>
        </form>
      </S.AuthCard>
    </S.AuthContainer>
  );
};

export default Register;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { LoginFormData } from './types';
import * as S from '../../styles/authStyles';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

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
    <S.AuthContainer>
      <S.StarsBackground />
      <S.AuthCard $show={animation}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <ThemeToggle />
        </div>

        <S.LogoArea>
          <S.LogoImage>MMC</S.LogoImage>
          <S.LogoText>Star Wars Explorer</S.LogoText>
        </S.LogoArea>
        
        <form onSubmit={handleSubmit}>
          <S.FormTitle>
            Login
          </S.FormTitle>
          
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
              placeholder="Sua senha" 
              value={formData.password}
              onChange={handleChange}
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
              {loading ? <Loader size="20px" centered={false} /> : 'Entrar'}
            </Button>
          </S.ButtonWrapper>
          
          <S.RegisterLink onClick={() => navigate('/register')}>
            Não tem uma conta? <S.Highlight>Registre-se</S.Highlight>
          </S.RegisterLink>
        </form>
      </S.AuthCard>
    </S.AuthContainer>
  );
};

export default Login;
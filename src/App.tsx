import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes'
import { ThemeProvider } from './context/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './store'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import { useAppDispatch } from './hook/useTypedRedux'

function AuthCheck({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  return <>{children}</>;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthCheck>
          <GlobalStyle />
          <AppRoutes />
        </AuthCheck>
      </ThemeProvider>
    </Provider>
  )
}

export default App
import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
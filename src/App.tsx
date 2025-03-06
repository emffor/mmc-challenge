import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes'
import { ThemeProvider } from './context/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  )
}

export default App
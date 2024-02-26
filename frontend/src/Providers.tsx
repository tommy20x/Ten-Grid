import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import { light, dark } from 'theme'
import { useThemeManager } from 'state/user/hooks'
import { getLibrary } from 'utils/web3React'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'

const ThemeProviderWrapper = (props) => {
  const [isDark] = useThemeManager()
  return <ThemeProvider theme={isDark ? dark : light} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <StyledEngineProvider injectFirst>
              <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
            </StyledEngineProvider>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers

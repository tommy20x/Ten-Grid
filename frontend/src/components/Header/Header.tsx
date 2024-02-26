import { AppBar, Toolbar, IconButton } from '@mui/material'
import { useTheme } from '@emotion/react'
import { useThemeManager } from 'state/user/hooks'
import ThemeSwitch from '../ThemeSwitch'
import LinkButton from './LinkButton'
import UserMenu from './UserMenu'
import './style.css'

export default function Header() {
  const theme = useTheme()
  const [isDark, toggleTheme] = useThemeManager()

  return (
    <AppBar position="fixed" style={{ padding: '0 20px' }}>
      <Toolbar disableGutters={true} className="toolbarRoot">
        <IconButton color="inherit" aria-label="Open drawer" className="menuButton"></IconButton>
        <div className="menubar">
          <LinkButton to="/" label="Home" />
          <LinkButton to="/help" label="How it works" />
          <LinkButton to="/buyers" label="Buyers" />
          <LinkButton to="/faq" label="FAQ" />
          <LinkButton to="/news" label="News" />
          <LinkButton to="/contact" label="Contact" />
          {/* <LinkButton to="/login" label="Login" /> */}
          <ThemeSwitch checked={isDark} onChange={toggleTheme}></ThemeSwitch>
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  )
}

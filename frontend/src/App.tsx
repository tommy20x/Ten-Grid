import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastListener } from './contexts/ToastsContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Help from './pages/Help'
import { Login, Signup } from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <MainLayout>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
        </MainLayout>
      </Switch>
      <ToastListener/>
    </Router>
  )
}

export default App

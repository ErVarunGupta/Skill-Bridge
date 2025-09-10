
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './layouts/LandingPage'
import { MyContext } from './MyContext'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  const providerValues = {

  }

  return (
    <>
      <MyContext.Provider value = {providerValues}>
        <Routes>
            <Route path={"/"} element={<LandingPage/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/dashboard"} element={<Dashboard/>}/>
        </Routes>
      </MyContext.Provider>
    </>
  )
}

export default App

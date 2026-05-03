import './App.css'
import { Route , Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className="w-full h-screen">
      <Toaster position="top-right" />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin/*' element={<AdminPage />} />
      </Routes>

    </div>

  )
}

export default App
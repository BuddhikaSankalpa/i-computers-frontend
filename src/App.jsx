import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import ForgetPasswordPage from './pages/forgetPassword'
import PCBuilderPage from './pages/PCBuilder'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ChatBotWidget from './components/ChatBotWidget';

function App() {
  return (
    <GoogleOAuthProvider clientId="993841355250-otst2f3p5v2fkv9bbd8p5595o5uig4aa.apps.googleusercontent.com">
      <div className='w-full h-screen '>
        <Toaster position='top-right' />
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/forget-password' element={<ForgetPasswordPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/pc-builder' element={<PCBuilderPage />} />
        </Routes>
        <ChatBotWidget />
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
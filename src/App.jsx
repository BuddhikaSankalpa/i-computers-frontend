import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import ForgetPasswordPage from './pages/forgetPassword'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ChatBotWidget from './components/ChatBotWidget';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='w-full h-screen '>
        <Toaster position='top-right' />
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/forget-password' element={<ForgetPasswordPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
        </Routes>
        {!isAdminRoute && <ChatBotWidget />}
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
import './App.css'
import ProductCard from './components/productCard'
import { Route , Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'

function App() {

  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/signin' element={<LoginPage />} />
      </Routes>
    </div>

  )
}

export default App

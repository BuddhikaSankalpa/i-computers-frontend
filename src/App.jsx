import './App.css'
import ProductCard from './components/productCard'
import { Route , Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'

function App() {

  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin/*' element={<AdminPage />} />
      </Routes>
    </div>

  )
}

export default App

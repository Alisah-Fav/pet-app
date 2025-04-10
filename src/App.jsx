import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Hero from './pages/Hero'
import DashLayout from './layout/DashLayout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import Reports from './pages/Reports'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero/>}/>


      <Route path="/dashboard" element={<DashLayout/>}>
        <Route index={true} element={<Dashboard/>}/>
        <Route path="transactions" element={<Transactions/>}/>
        <Route path="add-transaction" element={<AddTransaction/>}/>
        <Route path="reports" element={<Reports/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

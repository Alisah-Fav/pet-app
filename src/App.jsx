import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Hero from './pages/Hero'
import DashLayout from './layout/DashLayout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import Reports from './pages/Reports'
import Profile from './pages/Profile'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="add-transaction" element={<AddTransaction />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

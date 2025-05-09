import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App'
import App from './App'
import Dashboard from './Dashboard'
import './index.css'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App></App>} ></Route>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
 
)

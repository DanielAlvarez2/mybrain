import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router'
import './index.css'
import App from './App.jsx'
import Ady from './Ady.jsx'
import TestAdy from './TestAdy.jsx'
import TestDad from './TestDad.jsx'
import Birthdays from './Birthdays.jsx'
import Appointments from './Appointments.jsx'
import History from './History.jsx'
import Recurring from './Recurring.jsx'
import DadView from './DadView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ady' element={<Ady />} />
        <Route path='/test-dad' element={<TestDad />} />
        <Route path='/dad-view' element={<DadView />} />
        <Route path='/test-ady' element={<TestAdy />} />
        <Route path='/birthdays' element={<Birthdays />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/recurring' element={<Recurring />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

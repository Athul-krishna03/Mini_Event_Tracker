import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import OrganizerRegistration from './pages/organizer-registration'
import OrganizerLogin from './pages/organizer-login'
import { DashboardPage } from './pages/DashboardPage'
import { EventDetailsPage } from './pages/EventDetailsPage'
import { ScannerPage } from './pages/ScannerPage'
import { PublicRoute } from './utils/Protectors/PublicRoutes'
import { ProtectedRoute } from './utils/Protectors/ProtectedRoute'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute element={<OrganizerLogin />} />} />
          <Route path="/login" element={<PublicRoute element={<OrganizerLogin />} />} />
          <Route path="/register" element={<PublicRoute element={<OrganizerRegistration />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
          <Route path="/event/:id" element={<ProtectedRoute element={<EventDetailsPage />} />} />
          <Route path="/scanner" element={<ProtectedRoute element={<ScannerPage />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App

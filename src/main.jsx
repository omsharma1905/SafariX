import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import App from './App.jsx';
import CreateTrip from './create-trip/index.jsx';
import Viewtrip from './view-trip/[tripId]';
import MyTrips from './my-trips/index';
import Header from './components/custom/Header';
import Footer from './view-trip/[tripId]/components/Footer';
import { Toaster } from './components/ui/sonner';

import { validateUserSession } from '@/utils/auth';

// eslint-disable-next-line react-refresh/only-export-components
function AppLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      await validateUserSession()
      setCheckingAuth(false)
    }
    checkSession()
  }, [])

  if (checkingAuth) return null

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/create-trip', element: <CreateTrip /> },
      { path: '/view-trip/:tripId', element: <Viewtrip /> },
      { path: '/my-trips', element: <MyTrips /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
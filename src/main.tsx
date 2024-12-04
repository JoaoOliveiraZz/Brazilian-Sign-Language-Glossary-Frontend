import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Category } from './pages/Category.tsx'
import { Signals } from './pages/Signals.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Category />,
    errorElement: <ErrorPage />
  },
  {
    path: "signals/:categoryId",
    element: <Signals />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)

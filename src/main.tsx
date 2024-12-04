import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Category } from './pages/Category.tsx'
import { Signals } from './pages/Signals.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import { NewCategoryForm } from './components/NewCategoryForm.tsx'
import { NewSignalForm } from './components/NewSignalForm.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Category />,
    errorElement: <ErrorPage />
  },
  {
    path: "signals/:categoryId",
    element: <Signals />
  },
  {
    path: "/newCategory",
    element: <NewCategoryForm />
  },
  {
    path: "/newSignal",
    element: <NewSignalForm />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
import { DarkModeProvider } from "./context/DarkModeContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </DarkModeProvider>
  </StrictMode>,
)

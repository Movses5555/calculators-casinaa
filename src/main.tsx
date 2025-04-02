
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render the React application
root.render(<App />);

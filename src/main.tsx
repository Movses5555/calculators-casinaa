
import { createRoot } from 'react-dom/client'
import Index from './pages/index.tsx'
import './index.css'

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render the React application
root.render(<Index />);

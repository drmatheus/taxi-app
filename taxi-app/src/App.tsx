import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './router';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <RouterConfig />
    </Router>
  );
}

export default App;

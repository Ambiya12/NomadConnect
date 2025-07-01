import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import DestinationPage from './pages/Destination/DestinationPage';
import DestinationDetailPage from './pages/Destination/DestinationDetail/DestinationDetailPage';
import CreateDestinationPage from './pages/Destination/createDestination/CreateDestination';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/destinations" element={<DestinationPage />} />
          <Route path="/destination/:id" element={<DestinationDetailPage />} />
          <Route path="/create-destination" element={<CreateDestinationPage/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
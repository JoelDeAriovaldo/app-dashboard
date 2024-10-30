import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Common/PrivateRoute';
import Header from './components/shared/Header';
import Sidebar from './components/shared/Sidebar';
import Login from './pages/Login';
import Vagas from './components/Dashboard/Vagas';
import Candidatos from './components/Dashboard/Candidatos';
import ProcessoSeletivo from './components/Dashboard/ProcessoSeletivo';
import ExEstagiarios from './components/Dashboard/ExEstagiarios';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={<PrivateRoute element={<MainLayout component={<Vagas />} />} />}
            />
            <Route
              path="/jobs"
              element={<PrivateRoute element={<MainLayout component={<Vagas />} />} />}
            />
            <Route
              path="/candidates"
              element={<PrivateRoute element={<MainLayout component={<Candidatos />} />} />}
            />
            <Route
              path="/selection-process"
              element={<PrivateRoute element={<MainLayout component={<ProcessoSeletivo />} />} />}
            />
            <Route
              path="/ex-interns"
              element={<PrivateRoute element={<MainLayout component={<ExEstagiarios />} />} />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

const MainLayout = ({ component }) => (
  <>
    <Header />
    <div className="main-content">
      <Sidebar />
      <div className="content">{component}</div>
    </div>
  </>
);

export default App;

import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { api } from '../utils/api';
import './MainLayout.css';

export default function MainLayout() {
  const token = api.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

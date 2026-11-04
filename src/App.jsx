import { useApp } from './context/AppContext';
import LoginView from './components/Login';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';
export default function App(){
  const {currentUser} = useApp();
  if(!currentUser) return <LoginView />;
  return currentUser.role==='admin'? <AdminView /> : <StudentView />;
}
import { Navigate, Outlet } from 'react-router-dom';
import { isTeacherAuthenticated } from '../utils/storage';

export default function TeacherOnlyRoute() {
  return isTeacherAuthenticated() ? <Outlet /> : <Navigate to="/teacher" replace />;
}

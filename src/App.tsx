import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonOnePage from './pages/LessonOnePage';
import PresentationPage from './pages/PresentationPage';
import TeacherPage from './pages/TeacherPage';
import WorksheetPage from './pages/resources/WorksheetPage';
import LessonPlanPage from './pages/resources/LessonPlanPage';
import AnswerKeyPage from './pages/resources/AnswerKeyPage';
import PrepChecklistPage from './pages/resources/PrepChecklistPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson/1" element={<LessonOnePage />} />
      <Route path="/present/1" element={<PresentationPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route path="/teacher/resources/lesson-1/worksheet" element={<WorksheetPage />} />
      <Route path="/teacher/resources/lesson-1/lesson-plan" element={<LessonPlanPage />} />
      <Route path="/teacher/resources/lesson-1/answer-key" element={<AnswerKeyPage />} />
      <Route path="/teacher/resources/lesson-1/prep" element={<PrepChecklistPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonOnePage from './pages/LessonOnePage';
import PresentationPage from './pages/PresentationPage';
import LessonTwoPage from './pages/LessonTwoPage';
import LessonTwoPresentationPage from './pages/LessonTwoPresentationPage';
import TeacherPage from './pages/TeacherPage';
import WorksheetPage from './pages/resources/WorksheetPage';
import LessonPlanPage from './pages/resources/LessonPlanPage';
import AnswerKeyPage from './pages/resources/AnswerKeyPage';
import PrepChecklistPage from './pages/resources/PrepChecklistPage';
import LessonTwoWorksheetPage from './pages/resources/LessonTwoWorksheetPage';
import LessonTwoLessonPlanPage from './pages/resources/LessonTwoLessonPlanPage';
import LessonTwoAnswerKeyPage from './pages/resources/LessonTwoAnswerKeyPage';
import LessonTwoPrepChecklistPage from './pages/resources/LessonTwoPrepChecklistPage';
import LessonTwoReadingPage from './pages/resources/LessonTwoReadingPage';
import TeacherOnlyRoute from './components/TeacherOnlyRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson/1" element={<LessonOnePage />} />
      <Route path="/present/1" element={<PresentationPage />} />
      <Route path="/lesson/2" element={<LessonTwoPage />} />
      <Route path="/present/2" element={<LessonTwoPresentationPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route element={<TeacherOnlyRoute />}>
        <Route path="/teacher/resources/lesson-1/worksheet" element={<WorksheetPage />} />
        <Route path="/teacher/resources/lesson-1/lesson-plan" element={<LessonPlanPage />} />
        <Route path="/teacher/resources/lesson-1/answer-key" element={<AnswerKeyPage />} />
        <Route path="/teacher/resources/lesson-1/prep" element={<PrepChecklistPage />} />
        <Route path="/teacher/resources/lesson-2/worksheet" element={<LessonTwoWorksheetPage />} />
        <Route path="/teacher/resources/lesson-2/lesson-plan" element={<LessonTwoLessonPlanPage />} />
        <Route path="/teacher/resources/lesson-2/answer-key" element={<LessonTwoAnswerKeyPage />} />
        <Route path="/teacher/resources/lesson-2/prep" element={<LessonTwoPrepChecklistPage />} />
        <Route path="/teacher/resources/lesson-2/reading" element={<LessonTwoReadingPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonOnePage from './pages/LessonOnePage';
import PresentationPage from './pages/PresentationPage';
import LessonTwoPage from './pages/LessonTwoPage';
import LessonTwoPresentationPage from './pages/LessonTwoPresentationPage';
import LessonThreePage from './pages/LessonThreePage';
import LessonThreePresentationPage from './pages/LessonThreePresentationPage';
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
import LessonThreeWorksheetPage from './pages/resources/LessonThreeWorksheetPage';
import LessonThreeLessonPlanPage from './pages/resources/LessonThreeLessonPlanPage';
import LessonThreeAnswerKeyPage from './pages/resources/LessonThreeAnswerKeyPage';
import LessonThreePrepChecklistPage from './pages/resources/LessonThreePrepChecklistPage';
import LessonThreeDataCardsPage from './pages/resources/LessonThreeDataCardsPage';
import TeacherOnlyRoute from './components/TeacherOnlyRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson/1" element={<LessonOnePage />} />
      <Route path="/present/1" element={<PresentationPage />} />
      <Route path="/lesson/2" element={<LessonTwoPage />} />
      <Route path="/present/2" element={<LessonTwoPresentationPage />} />
      <Route path="/lesson/3" element={<LessonThreePage />} />
      <Route path="/present/3" element={<LessonThreePresentationPage />} />
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
        <Route path="/teacher/resources/lesson-3/worksheet" element={<LessonThreeWorksheetPage />} />
        <Route path="/teacher/resources/lesson-3/lesson-plan" element={<LessonThreeLessonPlanPage />} />
        <Route path="/teacher/resources/lesson-3/answer-key" element={<LessonThreeAnswerKeyPage />} />
        <Route path="/teacher/resources/lesson-3/prep" element={<LessonThreePrepChecklistPage />} />
        <Route path="/teacher/resources/lesson-3/data-cards" element={<LessonThreeDataCardsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

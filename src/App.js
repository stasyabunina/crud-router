import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewPostPage from './pages/NewPostPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path={process.env.REACT_APP_NEW_POST_URL_PATH} element={<NewPostPage />} />
          <Route path={process.env.REACT_APP_POST_URL_PATH} element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

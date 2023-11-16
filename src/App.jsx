import './App.css'
import Posts from './post/Posts'
import Auth from './user/Auth'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/posts" element={<Posts />} />
      <Route path="/" element={<Auth />} />
    </Routes>
  );
}

export default App

import './App.css'
import NewPost from './post/NewPost';
import Posts from './post/Posts'
import Auth from './user/Auth'
import { UserProvider } from "./userContext";
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>
    </UserProvider>
  );
}

export default App

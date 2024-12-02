import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "../src/components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create-post" element={<PostForm />} />
        <Route path="/edit-post/:id" element={<PostForm />} />
      </Routes>
    </Router>
  );
};

export default App;

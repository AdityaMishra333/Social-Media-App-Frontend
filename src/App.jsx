import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Feed from "./pages/feed"
import CreatePost from "./pages/createpost"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
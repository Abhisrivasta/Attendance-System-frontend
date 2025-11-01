import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Home from "./pages/dashboard/Home"
import ProfilePage from "./pages/settings/ProfilePage"
import Register from "./pages/auth/Register"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </>
  )
}

export default App

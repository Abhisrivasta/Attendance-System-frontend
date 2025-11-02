import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Home from "./pages/dashboard/Home"
import ProfilePage from "./pages/settings/ProfilePage"
import Register from "./pages/auth/Register"
import { Toaster,toast } from "react-hot-toast"
import UniversityPage from "./pages/university/UniversityPage"
import CollegeForm from "./components/college/CollegeForm"
import CourseForm from "./components/courses/CourseForm"
import BatchForm from "./components/Batch/BatchForm"


function App() {

  return (
    <>
      <Toaster position="top-right" />
      <button onClick={() => toast.success("completed")}>
        Show Toast
      </button>
      <UniversityPage/>
      <CollegeForm/>
      <CourseForm/>
      <BatchForm/>
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

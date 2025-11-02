import { useEffect, useState } from "react"
import { getUniversities } from "../../api/universityApi"
import { useAuth } from "../../context/AuthContext";
import Loading from "../common/Loader";

const UniversityList = () => {
  const [universities ,setUniversities] = useState([]);
  const {loading} = useAuth();

  useEffect(()=>{
    const fetchUniversity = async () => {

      try {
          const response = await getUniversities();
          setUniversities(response.data.universities);   
      } catch (error) {
          console.error("Failed to fetch universities", error);
      }
    }
    fetchUniversity()
  },[])
  
  // console.log(universities)

  if(loading) return <Loading/>

  return (
    <div>
      <h1>University Data</h1>
      <ul>
        {(universities as { id: string | number, name: string, code: string }[]).map((uni) => (
          <li key={uni.id}>{uni.name} || {uni.code}</li>
        ))}
      </ul>
    </div>
  )
}

export default UniversityList
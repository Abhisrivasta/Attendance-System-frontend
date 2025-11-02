import UniversityForm from "../../components/university/UniversityForm";
import UniversityList from "../../components/university/UniversityList";

export default function UniversityPage() {
  return (
    <div className="p-10 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">🎓 University Management</h1>
      <UniversityForm onSuccess={() => window.location.reload()} />
      <UniversityList /> 
    </div>
  );
}

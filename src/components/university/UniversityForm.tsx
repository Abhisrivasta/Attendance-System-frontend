import { useState } from "react";
import { toast } from "react-hot-toast";
import { createUniversity } from "../../api/universityApi";

export default function UniversityForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return toast.error("All fields required");
    try {
      await createUniversity({ name, code, colleges: [] });
      toast.success("University created!");
      setName("");
      setCode("");
      onSuccess();
    } catch (err) {
      toast.error("Failed to create");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md flex gap-3 flex-col w-full max-w-md"
    >
      <input
        type="text"
        placeholder="University Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 rounded"
      />
      <button className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
        Create University
      </button>
    </form>
  );
}

import { useState } from "react";
import { supabase } from "../../auth/supabaseClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: "STUDENT", name }, // store role & name in Supabase metadata
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;
      const session = data.session;

      // ✅ Send user info to backend
      if (user) {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token || ""}`,
          },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name,
            role: user.user_metadata?.role || "STUDENT",
          }),
        });
      }

      alert("Registration successful! Check your email for confirmation.");
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Register;

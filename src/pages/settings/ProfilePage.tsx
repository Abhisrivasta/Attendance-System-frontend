import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import type { UserProfile } from "../../types/user";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log("Profile page :",data)
        setProfile(data);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div>
      <h2>Welcome, {profile.name || profile.email}</h2>
      <p>Role: {profile.role}</p>

      {profile.role === "STUDENT" && profile.student && (
        <>
          <p>Roll No: {profile.student.rollNo}</p>
          <p>Batch: {profile.student.batch.name}</p>
          <p>Course: {profile.student.batch.course.name}</p>
          <p>College: {profile.student.college.name}</p>
        </>
      )}

      {profile.role === "TEACHER" && profile.teacher && (
        <>
          <p>Employee ID: {profile.teacher.employeeId}</p>
          <p>College: {profile.teacher.college?.name}</p>
          <p>
            Subjects:{" "}
            {profile.teacher.subjectLinks
              ?.map((link) => link.subject.name)
              .join(", ") || "None"}
          </p>
        </>
      )}
    </div>
  );
};

export default ProfilePage;

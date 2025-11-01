// src/types/UserProfile.ts
export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
    student?: {
      rollNo: string;
      batch: { name: string; course: { name: string } };
      college: { name: string };
    };
    teacher?: {
      employeeId: string;
      college?: { name: string };
      subjectLinks?: { subject: { name: string } }[];
    };
  }
  
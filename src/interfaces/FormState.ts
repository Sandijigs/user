export interface FormState {
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  status: "active" | "inactive";
  profilePhoto: File | null;
}

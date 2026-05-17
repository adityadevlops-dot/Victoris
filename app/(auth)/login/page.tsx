import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Victoris",
  description: "Enter the arena to resume your competitive coding battles.",
};

export default function LoginPage() {
  return <LoginForm />;
}

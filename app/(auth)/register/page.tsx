import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Victoris",
  description: "Create your gladiator identity and enter the arena.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

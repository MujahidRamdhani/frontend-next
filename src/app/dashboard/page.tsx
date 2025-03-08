"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";
import DashboardLayout from "../layout/DahsboardLayout";

const Page = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
     if(!user){
      router.push("/");
     }
  }, [user]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold ml-4 mt-4">Welcome Back {user?.fullName}</h1>
    </DashboardLayout>
  );
};

export default Page;

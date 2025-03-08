"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store/authStore";
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "./button";

export default function AppSidebar() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout(); 
    router.push("/"); 
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 font-bold text-lg">Title</div>
        <div className="p-4">Home</div>
     
        <Button className="p-4 cursor-pointer text-white font-semibold ml-2" onClick={handleLogout}>
          Logout
        </Button>
      
      
        <SidebarTrigger className="md:hidden ml-4" />
      </SidebarContent>
    </Sidebar>
  );
}

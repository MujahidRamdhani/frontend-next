import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// Pastikan path sesuai dengan struktur proyekmu

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="ml-4 mt-2" />
        {children}
      </main>
    </SidebarProvider>
  );
}

import { DashboardMainHeader } from "@/components/dashboard/dashboard-main-header";
import { DashboardMainSidebar } from "@/components/dashboard/dashboard-main-sidebar";
import { DashboardMobileSidebar } from "@/components/dashboard/dashboard-mobile-sidebar";
import { DashboardMobileHeader } from "@/components/dashboard/dashboard-mobile-header";
import { Layout } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardMobileSidebar />
      <DashboardMainSidebar />
      <Layout>
        <DashboardMainHeader />
        <DashboardMobileHeader />
        <div className="h-full rounded-md p-8 overflow-hidden">{children}</div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

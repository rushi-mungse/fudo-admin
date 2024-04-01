import { MobileDashboardLayout } from "@/components/dashboard/mobile-dashboard-layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <MobileDashboardLayout>{children}</MobileDashboardLayout>;
};

export default DashboardLayout;

import Navbar from "./_components/navbar";

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayoutPage;

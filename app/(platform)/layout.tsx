import { ClerkProvider } from "@clerk/nextjs";

const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>;
};

export default PlatFormLayout;

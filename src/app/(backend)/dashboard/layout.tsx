import Sidebar from "../../../components/Dashboard/SideBar";


export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className=" flex flex-row">
          <div><Sidebar/></div>
          <div className=" mx-auto"> {children}</div>
        </main>

  );
}
import Navbar from "./Navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      Layout
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

"use client";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="max-w-screen-xl mx-auto">{children}</div>;
};

export default Layout;

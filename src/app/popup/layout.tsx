import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  return <div className="w-full h-full fixed top-0 left-0 bg-white">{children}</div>;
}

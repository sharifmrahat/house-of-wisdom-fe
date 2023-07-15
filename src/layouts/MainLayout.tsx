import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="max-w-7xl">
        <Outlet />
      </main>
    </>
  );
}

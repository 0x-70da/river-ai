import { Outlet } from "react-router";

import { Sidebar } from "@/components/Sidebar";

export function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

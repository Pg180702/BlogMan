import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "./index.css";
export default function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

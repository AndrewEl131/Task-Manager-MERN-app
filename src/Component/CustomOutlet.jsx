import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export default function CustomOutlet() {
  return (
    <div>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

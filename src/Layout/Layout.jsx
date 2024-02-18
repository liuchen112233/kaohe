import React from "react";
import Router from "../router/index";
export default function Layout() {
    console.log(Router);
  return (
    <div>
      <div>Layout</div>
      <div>
        <Router></Router>
      </div>
    </div>
  );
}

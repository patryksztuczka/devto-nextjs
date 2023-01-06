import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import { IMainlayoutProps } from "./MainLayout.types";

const MainLayout = ({ children }: IMainlayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;

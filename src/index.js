import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ScorePage from "./components/scorePage";

const root = createRoot(document.getElementById("root"));
root.render(<ScorePage />);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Chat } from "./screens/Chat";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Chat />
  </StrictMode>,
);

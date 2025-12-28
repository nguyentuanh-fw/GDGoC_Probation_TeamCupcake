import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home as MainHome } from "./screens/Home";
import { Home as RouteHome } from "./routes/Home/screens/Home";
import { QA } from "./routes/QA";
import { History } from "./routes/History";
import { AIChat } from "./routes/AIChat";
import { Menu } from "./routes/Menu";
import { Chat } from "./routes/Chat";

export const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/home" element={<RouteHome />} />
        <Route path="/q-a" element={<QA />} />
        <Route path="/history" element={<History />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
};

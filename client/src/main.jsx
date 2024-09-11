// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MyPostContextProvider from "./contexts/MyPostContextProvider.jsx";
import NavBarContextProvider from "./contexts/NavBarContextProvider.jsx";
import RecommendPostsContextProvider from "./contexts/RecommendPostsContextProvider.jsx";
import ChatContextProvider from "./contexts/ChatContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <NavBarContextProvider>
    <MyPostContextProvider>
      <RecommendPostsContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </RecommendPostsContextProvider>
    </MyPostContextProvider>
  </NavBarContextProvider>
);

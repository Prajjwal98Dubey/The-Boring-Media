// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MyPostContextProvider from "./contexts/MyPostContextProvider.jsx";
import NavBarContextProvider from "./contexts/NavBarContextProvider.jsx";
import RecommendPostsContextProvider from "./contexts/RecommendPostsContextProvider.jsx";
import ChatContextProvider from "./contexts/ChatContextProvider.jsx";
import RoomContextProvider from "./contexts/RoomContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <NavBarContextProvider>
    <MyPostContextProvider>
      <RecommendPostsContextProvider>
        <ChatContextProvider>
          <RoomContextProvider>
          <App />
          </RoomContextProvider>
        </ChatContextProvider>
      </RecommendPostsContextProvider>
    </MyPostContextProvider>
  </NavBarContextProvider>
);

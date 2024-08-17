/* eslint-disable react/prop-types */
import { useState } from "react";
import RecommendPostsContext from "./RecommendPostsContext";

function RecommendPostsContextProvider({ children }) {
  const [recommendPosts, setRecommendPosts] = useState([]);
  return (
    <RecommendPostsContext.Provider
      value={{ recommendPosts, setRecommendPosts }}
    >
      {children}
    </RecommendPostsContext.Provider>
  );
}

export default RecommendPostsContextProvider;

import axios from "axios";
import { HANDLE_BOOKMARKS } from "../apis/backendapi";

export const handleBookMark = async (post) => {
  await axios.post(
    HANDLE_BOOKMARKS,
    {
      postId: post._id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("devil-auth")).refreshToken
        }`,
      },
    }
  );
};

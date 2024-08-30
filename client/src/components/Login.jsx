import { useEffect, useState } from "react";
import Auth from "../pages/Auth";
import { CLOSE_EYE, OPEN_EYE } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_USER } from "../apis/backendapi";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("devil-auth")) return navigate("/");
  }, [navigate]);
  const handleLogin = async (user, pass) => {
    if (!user || !pass) return alert("enter all mandatory fields.");
    await axios
      .post(LOGIN_USER, {
        username: user,
        password: pass,
        withCredentials: true,
        headers: { crossDomain: true, "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        if (data.msg) return alert(data.msg);
        localStorage.setItem("devil-auth", JSON.stringify(data));
        navigate("/");
        return data.token;
      });
  };
  return (
    <>
      <div className="w-full h-[100vh] flex font-rubik ">
        <Auth />
        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="h-[45%] w-[65%] border border-white flex justify-center rounded-lg shadow-sm shadow-white">
            <div>
              <div className="flex justify-center text-3xl font-bold text-white p-1 m-1">
                Login...
              </div>
              <div>
                <input
                  type="text"
                  className="w-[350px] h-[35px] rounded-md border border- bg-gray-600 text-white p-2 m-1"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="enter username"
                />
              </div>
              <div className="relative">
                <input
                  type={!showPass ? "password" : "text"}
                  className="w-[350px] h-[35px] rounded-md border border- bg-gray-600 text-white p-2 m-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter password"
                />
                <span className="absolute right-2 top-[25%]">
                  <img
                    className="z-10 cursor-pointer"
                    src={!showPass ? OPEN_EYE : CLOSE_EYE}
                    onClick={() => setShowPass(!showPass)}
                    alt=""
                  />
                </span>
              </div>
              <div>
                <button
                  className="w-[350px] h-[35px] rounded-md border border- bg-green-700 text-white p-2 m-1 mt-2 flex justify-center items-center font-semibold hover:bg-green-600"
                  onClick={() => handleLogin(userName, password)}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  className="w-[350px] h-[35px] rounded-md border border- bg-blue-700 text-white p-2 m-1 mt-2 flex justify-center items-center font-semibold hover:bg-blue-600"
                  onClick={() => handleLogin("guest", "guest")}
                >
                  Guest Login
                </button>
              </div>
              <div className="text-center text-white">
                new user
                <Link to="/auth/register">
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    {" "}
                    register here
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

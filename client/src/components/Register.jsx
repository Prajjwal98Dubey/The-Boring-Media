import { useEffect, useState } from "react";
import { CLOSE_EYE, OPEN_EYE } from "../assets/icons";
import Auth from "../pages/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { REGISTER_USER, UPLOAD_USERS_PIC } from "../apis/backendapi";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[photo,setPhoto] = useState("")
  const [showPass, setShowPass] = useState(false);
  const [fileData, setFileData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("devil-auth")) navigate("/");
  }, [navigate]);

  const handleRegister = async () => {
    if (!userName || !email || !password || !confirmPassword) {
      return alert("Enter All Mandatory fields.");
    }
    if (confirmPassword !== password)
      return alert("Password does not match!!!");
    await axios
      .post(
        REGISTER_USER,
        {
          name: userName,
          email,
          password,
          photo
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        if (data.msg) return alert(data.msg);
        localStorage.setItem("devil-auth", JSON.stringify(data));
        navigate("/");
        return data.token;
      });
    // then(async (token) => {
    //   await axios.get(DECODE_TOKEN + `?token=${token}`, {
    //     headers: {
    //       'Content-Type': "application/json"
    //     }
    //   }
    //   ).then(({ data }) => {
    //     localStorage.setItem('devil-auth-id', JSON.stringify(data.id));
    //     navigate('/');
    //   })
    // })
    // if (data.msg) return alert(data.msg);
    // localStorage.setItem("devil-auth", JSON.stringify(data.token))
    // navigate('/')
    // return
    /*
    const { data } = await axios.post(REGISTER_USER, {
      name: userName, email, password
    }, {
      headers: {
        'Content-Type': "application/json"
      }
    })
    if (data.msg) return alert(data.msg);
    localStorage.setItem("devil-auth", JSON.stringify(data.token))
    navigate('/')
    return
    */
  };

  const handleFileData = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user-image", fileData);
    await fetch(UPLOAD_USERS_PIC, {
      method: "POST",
      body: data
    })
      .then((res) => res.json()).then((data)=>{
        setPhoto(data)
        alert('photo upload success.')
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="w-full h-[100vh] flex font-rubik">
        <Auth />
        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="h-[60%] w-[65%] border border-white flex justify-center rounded-lg shadow-sm shadow-white">
            <div>
              <div className="flex justify-center text-3xl font-bold text-white p-1 m-1">
                Sign Up...
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
              <div>
                <input
                  type="text"
                  className="w-[350px] h-[35px] rounded-md border border- bg-gray-600 text-white p-2 m-1 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email"
                />
              </div>
              <div className="relative">
                <input
                  type={!showPass ? "password" : "text"}
                  className=" w-[350px] h-[35px] rounded-md border border- bg-gray-600 text-white p-2 m-1"
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
              <div className="relative">
                <input
                  type={!showPass ? "password" : "text"}
                  className="w-[350px] h-[35px] rounded-md border border- bg-gray-600 text-white p-2 m-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="confirm password"
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
                {/* <button className="w-[350px] h-[35px] rounded-md border border- bg-gray-600 p-2 m-1 text-gray-400 flex justify-center items-center">add photo</button> */}
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <input
                    type="file"
                    name="user-image"
                    className="text-white"
                    onChange={(e) => handleFileData(e)}
                  />
                  <button
                    className="w-[120px] h-[35px] bg-blue-500 text-white hover:bg-blue-600 cursor-pointer rounded-md"
                    type="submit"
                  >
                    upload
                  </button>
                </form>
              </div>
              <div>
                <button
                  className="w-[350px] h-[35px] rounded-md border border- bg-blue-700 text-white p-2 m-1 mt-2 flex justify-center items-center font-semibold hover:bg-blue-600"
                  onClick={handleRegister}
                >
                  Submit
                </button>
              </div>
              <div className="text-center text-white">
                <Link to="/auth/login">
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    Login here
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

export default Register;

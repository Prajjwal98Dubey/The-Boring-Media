import vid from "../assets/videos/v.mp4"
const Test = () => {
  return (
    <div className="text-white flex justify-center">
            <video loop width="45%" controls src={vid} ></video>
    </div>
  )
}

export default Test

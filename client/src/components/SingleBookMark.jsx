/* eslint-disable react/prop-types */


const SingleBookMark = ({postContent,username}) => {
  return (
    <div className="w-[550px] h-fit text-white font-rubik p-1 m-1 border border-gray-300 rounded-md">
        <div className=" text-xl flex justify-center text-white font-bold">{username}</div>
        <div className="text-white">{postContent}</div>
        {/* {postPhoto!=="" && <div><img src={postPhoto} alt="loading.." className="w-[250px] h-[200px] rounded-md" /></div>} */}
    </div>
  )
}

export default SingleBookMark

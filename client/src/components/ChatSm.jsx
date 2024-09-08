import { CHAT_SYMBOL_ICON } from "../assets/icons"

const ChatSm = () => {
  return (
    <div className="w-[70px] h-[70px] rounded-full flex justify-center items-center border border-gray-300 hover:cursor-pointer hover:border-purple-500">
        <img src={CHAT_SYMBOL_ICON} alt="loading" className="w-[35px] h-[35px]" />
    </div>
  )
}

export default ChatSm

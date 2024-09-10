export const chatRoomId = (mem1,mem2)=>{
    let tmp = [mem1,mem2]
    tmp.sort()
    return tmp.join("@")   // "rohit@virat" => unique
} 
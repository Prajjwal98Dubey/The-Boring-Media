export const trimString = (title)=>{
    if (title.length > 15) return title.substring(0,16) + "..."
    return title
}
import { Link } from 'react-router-dom'
import tbm from '../assets/images/TBM1.png'
const Brand = () => {
  return (
    <div className='fixed bottom-2 left-7'>
      <Link to="/">
      <img src={tbm} alt="loading" className='w-[65px] h-[65px] rounded-lg border border-yellow-400 z-10 cursor-pointer shadow-sm shadow-yellow-300' />
      </Link>
    </div>
  )
}

export default Brand

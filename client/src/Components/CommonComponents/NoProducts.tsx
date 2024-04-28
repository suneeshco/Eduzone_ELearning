
import Image from '../../assets/images/DefaultImages/noCourses.jpg'

const NoProducts = () => {
  return (
    
    <div className='w-full md:w-5/6 bg-gradient-to-b from-blue-100 to-white px-60 m-45 rounded-lg '>
      <img src={Image} className='' alt="No Product Found" />
    </div>
   
  )
}

export default NoProducts

import React from 'react'
import image from '../../../assets/images/HomePage/Land1.png'

const AboutUs = () => {
  return (
    <div className='mt-14'>
       <div className="bg-gray-100 h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            At our e-learning platform, we are dedicated to providing high-quality education accessible to everyone.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                className="h-96 w-full object-cover rounded-lg"
                src={image}
                alt="About Us"
              />
            </div>
            <div className="mt-8 md:mt-0 md:ml-8">
              <h3 className="text-2xl font-extrabold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-lg text-gray-500">
                We believe that education is the key to unlocking human potential and creating a better future for all. Our mission is to provide accessible, affordable, and high-quality education to learners around the globe, empowering them to acquire new skills, advance their careers, and pursue their passions.
              </p>
              <h3 className="mt-6 text-2xl font-extrabold text-gray-900">Our Approach</h3>
              <p className="mt-4 text-lg text-gray-500">
                Our approach combines cutting-edge technology with proven pedagogical methods to create an engaging and effective learning experience. We collaborate with industry experts, renowned educators, and subject matter specialists to curate comprehensive curricula that meet the evolving needs of learners and industries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AboutUs

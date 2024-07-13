import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const MainComponent = () => {
  return (
    <div className='flex md:flex-row flex-col max-w-7xl mx-auto items-center'>
        <div className="w-full md:h-[100vh]"><RightSide/></div>
        <div className="md:w-[80%] w-full font-sans"><LeftSide/></div>
    </div>
  )
}

export default MainComponent
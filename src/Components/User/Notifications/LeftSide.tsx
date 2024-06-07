import React from 'react'

interface ILeftInterface{

}
const LeftSide:React.FC<ILeftInterface> = () => {
  return (
    <div className="md:col-span-3 shadow-lg bg-white min-h-[100px] rounded-lg hidden sm:block"></div>
  )
}

export default LeftSide

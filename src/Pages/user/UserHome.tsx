import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/store'

function UserHome() {

  const navigate = useNavigate()


  const { userData } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!userData) navigate('/');
  }, [userData]);

  
  return (
    <div>
      <h1>This is user home page.</h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis tenetur amet! Voluptate alias excepturi necessitatibus consequuntur. Molestiae, est. Iusto sequi inventore aperiam odit doloribus! Eaque ducimus doloremque consequatur eligendi.
    </div>
  )
}

export default UserHome

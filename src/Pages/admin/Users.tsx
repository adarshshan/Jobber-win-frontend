import React, { useEffect, useState } from 'react';
import { blockUser, getAllUsers } from '../../Api/admin';
import Swal from 'sweetalert2';
import { Button, Pagination, Tooltip } from '@nextui-org/react';
import toast from 'react-hot-toast';

interface UserData {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  role: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    const fetctData = async () => {
      try {
        const res = await getAllUsers()
        setUsers(res?.data.data.users);
      } catch (error) {
        console.log(error as Error);
      }
    }
    fetctData();
  }, [block])

  const handleBlock = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.isConfirmed) {
          blockUser(id).then((result) => {
            if (result?.data.success) {
              setBlock(!block);
              Swal.fire({
                title: "success!",
                text: "",
                icon: "success"
              });
            } else toast.error(result?.data.message);
          });

        }
      });
    } catch (error) {
      console.log(error as Error);
    }
  }

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">
          Users
        </h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {users && !users.length && <h1 className='text-red-500'>NO DATA FOUND!</h1>}
            {users?.map((row, index) => (
              <tr key={index} className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="p-3 px-5 cursor-pointer"><input type="text" value={row.name} className="bg-transparent cursor-pointer" readOnly /></td>
                <td className="p-3 px-5 cursor-pointer"><input type="email" value={row.email} className="bg-transparent cursor-pointer" readOnly /></td>
                <td className="p-3 px-5"><input type="text" value={row.role} className="bg-transparent cursor-pointer" readOnly /> </td>
                <td className="p-3 px-5 flex justify-end">

                  <Tooltip content={row.isBlocked ? 'click to unblock' : 'click to block'}>
                    <Button onClick={() => handleBlock(row._id)} style={{ color: row.isBlocked ? 'green' : 'red' }}>{row.isBlocked ? 'unblock' : 'block'}</Button>
                  </Tooltip>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination className='ms-10 mb-3 ' total={10} initialPage={1} />
    </div>
  );
};

export default UsersTable;

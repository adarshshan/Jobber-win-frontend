import React, { useLayoutEffect, useState } from 'react';
import { blockUser, getAllUsers } from '../../Api/admin';

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
  useLayoutEffect(() => {
    const fetctData = async () => {
      const res = await getAllUsers()
      setUsers(res?.data.data.users);
    }
    fetctData();
  }, [block])

  const handleBlock = async (id: string) => {
    try {
      const result = await blockUser(id);
      setBlock(!block);
      console.log(result);
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
            {users?.map((row, index) => (
              <tr key={index} className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="p-3 px-5 cursor-pointer"><input type="text" value={row.name} className="bg-transparent cursor-pointer" readOnly /></td>
                <td className="p-3 px-5 cursor-pointer"><input type="email" value={row.email} className="bg-transparent cursor-pointer" readOnly /></td>
                <td className="p-3 px-5"><input type="text" value={row.role} className="bg-transparent cursor-pointer" readOnly /> </td>
                <td className="p-3 px-5 flex justify-end">
                  {row.isBlocked && <button onClick={() => handleBlock(row._id)} type="button" className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Unblock</button>}
                  {!row.isBlocked && <button onClick={() => handleBlock(row._id)} type="button" className="mr-3 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Block</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

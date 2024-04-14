import React from 'react';

const UsersTable: React.FC = () => {
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
            {[...Array(5)].map((_, index) => (
              <tr key={index} className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="p-3 px-5 cursor-pointer"><input type="text" value="user.name" className="bg-transparent cursor-pointer" readOnly/></td>
                <td className="p-3 px-5 cursor-pointer"><input type="text" value="user.email" className="bg-transparent cursor-pointer" readOnly/></td>
                <td className="p-3 px-5"><input type="text" value="Recruiter" className="bg-transparent cursor-pointer" readOnly/> </td>
                <td className="p-3 px-5 flex justify-end">
                  <button type="button" className="mr-3 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Block</button>
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

import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../Modal/UpdateUserModal'
import {useMutation} from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast';

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();
  // console.log(user);
  const axiosSecure = useAxiosSecure()
  const [isOpen,setIsOpen] =useState(false)

  const {mutateAsync} = useMutation({
    mutationFn: async role =>{
     const {data} = await axiosSecure.patch(`/users/update/${user?.email}`,role)
     return data
    },
    onSuccess: (data) =>{
      console.log(data);
      refetch()
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User role updated successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setIsOpen(false);
    }
  })


  // modal handler
  const modalHandler = async selected => {
    if(loggedInUser.email === user.email) {
      toast.error('Action Not Allowed')
      return setIsOpen(false);
    }
    // if(user?.status === 'Verified') return toast.success('user nije teke role updated korte chayna')
    // console.log('user modal handler',selected);
    const userRole = {
      role: selected,
      status: 'Verified',
    }
    try{
    await mutateAsync(userRole)
    }catch(err){
      console.log(err);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500
      })
    }
    // setIsOpen(false)
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} modalHandler={modalHandler} user={user}></UpdateUserModal>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
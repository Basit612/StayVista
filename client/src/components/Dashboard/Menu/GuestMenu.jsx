import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../hooks/useRole'
import HostModal from '../../Modal/HostRequestModal'
import Swal from 'sweetalert2'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'

const GuestMenu = () => {
  const axiosSecure = useAxiosSecure();
  const { user} = useAuth();
  const [role] =useRole();

  // for modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };


    // modalHandler button
    const modalHandler = async () => {
      console.log("i want to be a host");
  
      try {
        const currentUser = {
          email: user?.email,
          role: "guest",
          status: "Requested",
        };
        const { data } = await axiosSecure.put(
          `${import.meta.env.VITE_API_URL}/user`,
          currentUser
        );
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your request has been sent admin confirmation",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Please Wait for admin approval",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
      } finally {
        closeModal();
      }
    };
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

     {role === 'guest' &&  <div  onClick={() => setIsOpenModal(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </div>}
      {/* Modal */}
      <HostModal
                  isOpen={isOpenModal}
                  closeModal={closeModal}
                  modalHandler={modalHandler}
                ></HostModal>
    </>
  )
}

export default GuestMenu
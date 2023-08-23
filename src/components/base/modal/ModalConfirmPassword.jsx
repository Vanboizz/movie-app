import { db } from '@/firebase'
import { UserAuth } from '@/hooks/useAuth'
import { EmailAuthProvider, deleteUser, getAuth, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalConfimPasswordAccount = (props) => {
    const { type, setModalConfirmPassword, email, password, firstName, lastName } = props
    const passwordRef = useRef()
    const { user, setUser } = UserAuth()
    const auth = getAuth()
    const docRef = doc(db, "user", user.uid)

    const handleReauthetication = (e) => {
        e.preventDefault()
        try {
            setModalConfirmPassword(false)
            const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordRef.current.value)
            reauthenticateWithCredential(auth.currentUser, credential)
                .then((value) => {
                    toast.success("Reautheticated is succesfull")
                    if (value !== null) {
                        if (type === "Change Email") {
                            //Change Email
                            updateEmail(auth.currentUser, email)
                                .then(() => {
                                    updateDoc(docRef, {
                                        email: email
                                    })
                                        .then(() => {
                                            const newUser = {
                                                ...user,
                                                email: email
                                            }
                                            setUser(newUser)
                                            localStorage.setItem("credential", JSON.stringify(newUser))
                                        })
                                        .catch(error => console.log(error))
                                })
                                .catch(error => console.log(error))
                        }
                        else if (type === "Change Password") {
                            // Change Password
                            updatePassword(auth.currentUser, password)
                                .then(() => {
                                    console.log("Sucess");
                                })
                                .catch(error => console.log(error))
                        }
                        else if (type === "Change Name") {
                            // Change Name
                            updateProfile(auth.currentUser, {
                                firstName: firstName,
                                lastName: lastName
                            })
                                .then(() => {
                                    updateDoc(docRef, {
                                        displayName: firstName + lastName
                                    })
                                        .then(() => {
                                            const newUser = {
                                                ...user,
                                                displayName: firstName + lastName
                                            }
                                            setUser(newUser)
                                            localStorage.setItem("credential", JSON.stringify(newUser))
                                        })
                                        .catch(error => console.log(error))

                                })
                                .catch(error => console.log(error))
                        } else if (type === "Delete Account") {
                            // Delete Account
                            deleteUser(auth.currentUser)
                                .then(() => {
                                    deleteDoc(docRef)
                                        .then(() => {
                                            setUser(null)
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })
                                })
                                .catch(error => console.log(error))
                        }
                    }
                })
                .catch(() => toast.error("Password is not match"))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form className='z-10 fixed min-h-[230px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-[#333335] rounded-md px-3 py-2 w-[500px]'>
                <p className='text-white font-medium mb-6 text-lg text-center'>Type your password again to reauthenticate</p>
                <input type="password" ref={passwordRef} className='bg-[#49494B] py-3 rounded-md px-5 text-white mb-4 w-full outline-none' placeholder='Type your password...' />
                <div className='absolute left-1/2 -translate-x-1/2 selection:text-blue'>
                    <button onClick={handleReauthetication} className='px-6 py-2 bg-[#5B5B5E] rounded-xl text-white'>Continue</button>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default ModalConfimPasswordAccount
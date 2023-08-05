import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logo, sidebarData } from '@/constants';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { UserAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const FullNavbar = () => {
    const { user, logOut, setUser } = UserAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            logOut()
            setUser(null)
            localStorage.removeItem("credential")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={"w-[260px] pl-8 pt-10 sticky left-0 top-0"}>
            <Link href="/" className="flex items-center gap-3" >
                <Image src={logo} width={40} height={40} alt="logo" />
                <h1 className="text-2xl">
                    <span className="text-white font-semibold">TBT</span>
                    <span className="text-blue font-semibold">WORLD</span>
                </h1>
            </Link>
            {
                sidebarData.map((values, index) => (
                    <div key={index}>
                        <div className="text-white font-semibold mt-12 text-lg">
                            {values.title.toUpperCase()}
                        </div>
                        {
                            values.items.map((value, index) => (
                                <div key={index} className='mt-8 ml-4 flex flex-col gap-4 text-[#989898]'>
                                    <Link
                                        href={value.path}
                                        className={router.pathname === value.path ?
                                            "flex font-medium items-center gap-4 text-lg after:absolute after:right-0 after:bg-blue after:h-4 after:w-1.5 text-blue transition duration-300" :
                                            "flex gap-4"
                                        }
                                    >
                                        {value.icon}
                                        <p>{value.name.charAt(0).toUpperCase() + value.name.slice(1)}</p>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
            <div className='mt-8 ml-4 flex flex-col gap-4 text-[#989898]'>
                {
                    user ?
                        <Link onClick={handleSignOut} href="" className="flex font-normal items-center gap-4 text-lg">
                            <BiLogOut size={24} />
                            <p>Logout</p>
                        </Link> :
                        <Link href="/login" className="flex font-normal items-center gap-4 text-lg">
                            <BiLogIn size={24} />
                            <p>Login</p>
                        </Link>
                }
            </div>
        </div>
    );
};

export default FullNavbar;

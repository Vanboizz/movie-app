import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logo } from '@/constants';
import { AiOutlineHome, AiOutlineSearch, AiOutlineHistory } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { BsBookmarkHeart } from 'react-icons/bs';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';
import { UserAuth } from '@/hooks/useAuth';

const Navbar = () => {
    const { user, logOut, setUser } = UserAuth()
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
        <div className={`w-[260px] pl-8 pt-10 sticky left-0 top-0 `}>
            <Link href="/" className="flex items-center gap-3">
                <Image src={logo} width={40} height={40} alt="logo" />
                <h1 className="text-2xl">
                    <span className="text-white font-semibold">TBT</span>
                    <span className="text-blue font-semibold">WORLD</span>
                </h1>
            </Link>
            <div className="text-white font-semibold mt-12 text-lg">MENU</div>
            <div className="mt-8 ml-4 flex flex-col gap-4 text-[#989898]">
                <Link
                    href="/"
                    className="flex font-normal items-center gap-4 text-lg text-blue border-r-4 border-blue"
                >
                    <AiOutlineHome size={24} />
                    <p>Home</p>
                </Link>
                <Link href="explore" className="flex font-normal items-center gap-4 text-lg">
                    <MdOutlineExplore size={24} />
                    <p>Explore</p>
                </Link>
                <Link href="search" className="flex font-normal items-center gap-4 text-lg">
                    <AiOutlineSearch size={24} />
                    <p>Search</p>
                </Link>
            </div>
            <div className="text-white font-semibold mt-12 text-lg">PERSONAL</div>
            <div className="mt-8 ml-4 flex flex-col gap-4 text-[#989898]">
                <Link href="bookmarked" className="flex font-normal items-center gap-4 text-lg">
                    <BsBookmarkHeart size={24} />
                    <p>Bookmarked</p>
                </Link>
                <Link href="history" className="flex font-normal items-center gap-4 text-lg">
                    <AiOutlineHistory size={24} />
                    <p>History</p>
                </Link>
            </div>
            <div className="text-white font-semibold mt-12 text-lg">GENERAL</div>
            <div className="mt-8 ml-4 flex flex-col gap-4 text-[#989898]">
                <Link href="profile" className="flex font-normal items-center gap-4 text-lg">
                    <BiUserCircle size={24} />
                    <p>Profile</p>
                </Link>
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

export default Navbar;

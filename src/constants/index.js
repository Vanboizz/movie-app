import * as yup from 'yup';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHistory,
  AiFillLike,
  AiFillHeart,
} from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { BsBookmarkHeart, BsFillEmojiLaughingFill } from 'react-icons/bs';
import { FaSadTear, FaAngry } from 'react-icons/fa';

// array images
export const arrayImages = [
  '/assest/images/avatar-one.webp',
  '/assest/images/avatar-two.jpg',
  '/assest/images/avatar-three.jpg',
  '/assest/images/avatar-four.jpg',
  '/assest/images/avatar-five.jpg',
  '/assest/images/avatar-six.jpg',
  '/assest/images/avatar-seven.jpg',
  '/assest/images/avatar-eight.jpg',
];

// Logo
export const logo = '/assest/images/logo.png';

// backround
export const background = '/assest/images/background.jpg';

// router
export const appRouter = {
  login: '/login',
  home: '/',
  profile: '/profile',
  register: '/register',
  explore: '/explore',
  history: '/history',
};

// schema register
export const schemaRegister = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Your password is too short'),
});

// schema password
export const schemaPassword = yup.object().shape({
  password: yup.string().required('Password is required').min(8, 'Your password is too short'),
});

// schema login
export const schemaLogin = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Your password is too short'),
});

// type
export const inputType = {
  PASSWORD: 'password',
  EMAIL: 'email',
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
};

// tabs
export const tabs = ['tv', 'movie'];

// navbar
export const sidebarData = [
  {
    title: 'MENU',
    items: [
      {
        name: 'home',
        path: '/',
        icon: <AiOutlineHome size={28} />,
      },
      {
        name: 'explore',
        path: '/explore',
        icon: <MdOutlineExplore size={28} />,
      },
      {
        name: 'search',
        path: '/search',
        icon: <AiOutlineSearch size={28} />,
      },
    ],
  },
  {
    title: 'PERSONAL',
    items: [
      {
        name: 'bookmarked',
        path: '/bookmarked',
        icon: <BsBookmarkHeart size={28} />,
      },
      {
        name: 'history',
        path: '/history',
        icon: <AiOutlineHistory size={28} />,
      },
    ],
  },
  {
    title: 'PERSONAL',
    items: [
      {
        name: 'profile',
        path: '/profile',
        icon: <BiUserCircle size={28} />,
      },
    ],
  },
];

export const listSelectOptions = [
  { name: 'Most Popular', value: 'popularity.desc' },
  { name: 'Most Rating', value: 'vote_average.desc' },
  { name: 'Most Recent', value: 'release_date.desc' },
];

export const queryMovieDefault = {
  PAGE: 1,
  selected: 'popularity.desc',
  type: 'tv',
  from: '2022-02-02',
  to: '2022-03-03',
  genres: [],
  min: 0,
  max: 200,
};

export const tabsDetailMovie = ['Overall', 'Cast', 'Reviews', 'Seasons'];

// list Reaction
export const listReaction = [
  {
    button: <button className='text-[#3B82F6] font-medium'>Like</button>,
    name: 'Like',
    icon: <AiFillLike size={20} className="text-[#3B82F6] hover:scale-125 transition duration-300" />
  },
  {
    button: <button className='text-[#EF4444] font-medium'>Love</button>,
    name: 'Love',
    icon: <AiFillHeart size={20} className="text-[#EF4444] hover:scale-125 transition duration-300" />
  },
  {
    button: <button className='text-[#EAB308] font-medium'>Haha</button>,
    name: 'Haha',
    icon: <BsFillEmojiLaughingFill
      size={20}
      className="text-[#EAB308] hover:scale-125 transition duration-300"
    />
  },
  {
    button: <button className='text-[#A855F7] font-medium'>Sad</button>,
    name: 'Sad',
    icon: <FaSadTear size={20} className="text-[#A855F7] hover:scale-125 transition duration-300" />

  },
  {
    button: <button className='text-[#F97316] font-medium'>Angry</button>,
    name: 'Angry',
    icon: <FaAngry size={20} className="text-[#F97316] hover:scale-125 transition duration-300" />
  },
];

// export const commnents = [
//   {
//     idUser: 1,
//     message: "Xin chào",
//     parent_id: null,
//     reactions: [
//       { user_id: 1, name: 'van', type: 1 },
//       { user_id: 2, name: 'nam', type: 2 }
//     ]

//   },
//   {
//     idUser: 2,
//     message: "Xin chào 1",
//     parent_id: 1,
//     reactions: [
//       { user_id: 1, name: 'van', type: 1 },
//       { user_id: 2, name: 'nam', type: 2 }
//     ]
//   },
//   {
//     idUser: 3,
//     message: "Xin chào 1",
//     parent_id: 1,
//     reactions: [
//       { user_id: 1, name: 'phap', type: 1 },
//       { user_id: 2, name: 'van', type: 2 }
//     ]
//   },
//   {
//     idUser: 4,
//     message: "Tạm biệt",
//     parent_id: null,
//     reactions: [
//       { user_id: 1, name: 'van', type: 1 },
//       { user_id: 2, name: 'nam', type: 2 }
//     ]
//   }
// ]

import * as yup from 'yup';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHistory
} from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { BsBookmarkHeart } from 'react-icons/bs';

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
  password: yup.string().required('Password is required').min(8, 'Your password must be more 8 characters'),
});

// schema password
export const schemaPassword = yup.object().shape({
  password: yup.string().required('Password is required').min(8, 'Your password must be more 8 characters'),
});

// schema login
export const schemaLogin = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Your password must be more 8 characters'),
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


export const sortBy = ['Latest', 'Popular']
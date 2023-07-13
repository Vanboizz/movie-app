import * as yup from 'yup';

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

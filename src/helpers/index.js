// render avatar
import axiosClient from '@/apis/axiosConfig';
import { arrayImages } from '@/constants';

// render avatar
export const renderAvatar = () => {
  return arrayImages[Math.floor(Math.random() * arrayImages.length)];
};

// interceptor
export const handleFetchData = async (url) => {
  const response = await axiosClient.get(url);
  return response.data;
};

// get genre_name
export const handleGetGener = (genre_ids, data) => {
  return data.filter((item) => genre_ids.includes(item.id));
};

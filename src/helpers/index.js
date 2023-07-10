// render avatar
import { arrayImages } from '@/constants';

export const renderAvatar = () => {
  return arrayImages[Math.floor(Math.random() * arrayImages.length)];
};

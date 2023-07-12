// render avatar
import { arrayImages } from '@/constants';

// render avatar
export const renderAvatar = () => {
  return arrayImages[Math.floor(Math.random() * arrayImages.length)];
};

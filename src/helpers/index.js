// render avatar
import axiosClient from '@/apis/axiosConfig';
import { arrayImages } from '@/constants';
import moment from 'moment';

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

// total season
export const totalSeason = (detailMovie) => {
  return detailMovie.seasons.reduce(
    (accumulator, currentValue) => accumulator + currentValue.season_number,
    0,
  );
};

// total episodes
export const totalEpisodes = (detailMovie) => {
  return detailMovie.seasons.reduce(
    (accumulator, currentValue) => accumulator + currentValue.episode_count,
    0,
  );
};

// pare date ago
export const parseDateTime = (review) => {
  return moment(review.created_at).fromNow();
};

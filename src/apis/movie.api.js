import { queryMovieDefault } from '@/constants';
import axiosClient from './axiosConfig';

const apiMovie = {
  getListDiscover: async (query) => {
    const {
      type = queryMovieDefault.type,
      selected = queryMovieDefault.selected,
      page = queryMovieDefault.PAGE,
      from = queryMovieDefault.from,
      to = queryMovieDefault.to,
    } = query;
    const url = `/3/discover/${type}?api_key=${process.env.customKey}&sort_by=${selected}&primary_release_date.gte=${from}&primary_release_date.lte=${to}&air_date.gte=${from}&air_date.lte=${to}&page=${page}`;
    return axiosClient.get(url);
  },
};

export default apiMovie;

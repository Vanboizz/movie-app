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
      genres = queryMovieDefault.genres,
      min = queryMovieDefault.min,
      max = queryMovieDefault.max,
    } = query;
    const url = `/3/discover/${type}?api_key=${process.env.customKey}&sort_by=${selected}&with_genres=${genres}&with_runtime.gte=${min}&with_runtime.lte=${max}&primary_release_date.gte=${from}&primary_release_date.lte=${to}&air_date.gte=${from}&air_date.lte=${to}&page=${page}`;
    return axiosClient.get(url);
  },
  getDetailMovie: async (query) => {
    const { type = queryMovieDefault.type, movieid } = query;
    const url = `/3/${type}/${movieid}?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getCredits: async (query) => {
    const { type = queryMovieDefault.type, movieid } = query;
    const url = `/3/${type}/${movieid}/credits?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getReviews: async (query) => {
    const { type = queryMovieDefault.type, movieid } = query;
    const url = `/3/${type}/${movieid}/reviews?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getVideos: async (query) => {
    const { type = queryMovieDefault.type, movieid } = query;
    const url = `/3/${type}/${movieid}/videos?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getSimilar: async (query) => {
    const { type = queryMovieDefault.type, movieid } = query;
    const url = `/3/${type}/${movieid}/similar?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
};

export default apiMovie;

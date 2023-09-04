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
    const { tab = queryMovieDefault.type, id } = query;
    const url = `/3/${tab}/${id}?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getCredits: async (query) => {
    const { tab = queryMovieDefault.type, id } = query;
    const url = `/3/${tab}/${id}/credits?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getReviews: async (query) => {
    const { tab = queryMovieDefault.type, id } = query;
    const url = `/3/${tab}/${id}/reviews?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getVideos: async (query) => {
    const { tab = queryMovieDefault.type, id } = query;
    const url = `/3/${tab}/${id}/videos?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getSimilar: async (query) => {
    const { tab = queryMovieDefault.type, id } = query;
    const url = `/3/${tab}/${id}/similar?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getSeason: async (query, seasonNumber) => {
    const { tab = queryMovieDefault.type, id } = query;
    const url = `/3/${tab}/${id}/season/${seasonNumber}?api_key=${process.env.customKey}`;
    return axiosClient.get(url);
  },
  getRecommendation: async (query) => {
    const { tab = queryMovieDefault.type, id } = query
    const url = `/3/${tab}/${id}/recommendations?api_key=${process.env.customKey}`
    return axiosClient.get(url)
  }
};

export default apiMovie;

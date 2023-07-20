/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    minimumCacheTTL: 1500000,
  },
  env: {
    customKey:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzI2ZjNhOTBlZWNiNGE0OTU5OGNlZTdlNTU3YjE1MCIsInN1YiI6IjY0YTYxMDQ3Y2FlNjMyMDEwMjg3ZmEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5JD8YLN_zojye6DWoXdUNODUzFcrrAIg_0yjs1d-CFM',
  },
};

module.exports = nextConfig;

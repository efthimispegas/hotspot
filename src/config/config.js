const config = {
  DB_URL: 'mongodb://localhost:27017/hotspot',
  JWT_SECRET: 'secret',
  RADIUS: 5, //in km
  EARTH_RADIUS: 6378.1,
  RADIUS_RATIO: 0.000783932,
  UPLOAD_FOLDER: '/gallery',
  PUBLIC_FOLDER: '/public',
  DOMAIN_URL: 'http://192.168.10.39:3000'
};
export default config;

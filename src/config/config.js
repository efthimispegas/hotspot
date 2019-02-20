const config = {
  DB_URL: 'mongodb://localhost:27017/hotspot',
  JWT_SECRET: 'secret',
  RADIUS: 5, //in km
  EARTH_RADIUS: 6378.1,
  RADIUS_RATIO: 0.000783932,
  UPLOAD_FOLDER: '/gallery',
  PUBLIC_FOLDER: '/public',
  DOMAIN_URL: 'http://192.168.10.39:3000',
  google: {
    CLIENT_ID:
      '924883342846-v1g24lb4r7jgboq1l3km0olofg4gbth3.apps.googleusercontent.com',
    CLIENT_SECRET: 'a0zBGTH1loO38TdbM6OS3Tsu'
  },
  facebook: {
    CLIENT_ID: '2691571627520475',
    CLIENT_SECRET: 'ae12d6b74495de2992df48b497c77a6d'
  }
};

export default config;

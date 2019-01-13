import mongoose from 'mongoose';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/hotspotme');
  mongoose.connection
    .once('open', () => {
      console.log('Mongodb is up and running!');
    })
    .on('error', err => console.error(err));
};

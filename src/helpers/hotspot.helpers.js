export const checkInput = req => {
  const { text, loc } = req.body;
  let lat, lng, description;
  if (loc) {
    lat = loc.lat;
    lng = loc.lng;
  }
  if (text) {
    description = text.substr(0, 150);
  }

  return { lat, lng, description };
};

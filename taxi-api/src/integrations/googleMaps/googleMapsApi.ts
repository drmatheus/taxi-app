import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = 'https://maps.googleapis.com/maps/api';

const googleMapsApi = axios.create({
  baseURL,
  params: {
    key: process.env.GOOGLE_API_KEY,
  },
});

export default googleMapsApi;

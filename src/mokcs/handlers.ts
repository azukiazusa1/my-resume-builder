import { rest } from "msw";

import postcodes from './api/postcodes';
import upload from './api/upload';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const handlers = [
  rest.post(`${baseURL}/api/upload`, upload.post),
  rest.get(`/api/postcodes`, postcodes.get),
];

export default handlers;
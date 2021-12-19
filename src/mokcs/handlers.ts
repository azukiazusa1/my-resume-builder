import { rest } from "msw";
import upload from './api/upload';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const handlers = [
  rest.post(`http://localhost:3000/api/upload`, (req, res, ctx) => {
    console.log(req)
    return res(
      ctx.json({
        url: `/images/sample.png`
      })
    )
  }),
];

export default handlers;
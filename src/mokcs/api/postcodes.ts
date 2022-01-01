import type { ResponseComposition, RestContext, RestRequest } from 'msw'

const resolvers = {
  get: (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const postcode = req.url.searchParams.get('postcode')
    return res(
      ctx.json({
        postcode,
        hiragana: 'とうきょうとしぶやく',
        prefecture: '東京都',
        address: '渋谷区',
      }),
    );
  }
}

export default resolvers
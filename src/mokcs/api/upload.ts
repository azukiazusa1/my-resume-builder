import type { RestRequest, ResponseComposition, RestContext } from 'msw'

const resolvers = {
  post: (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(
      ctx.json({
        url: '/images/sample.png'
      })
    )
  }
}

export default resolvers
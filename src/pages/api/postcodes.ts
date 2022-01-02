import { NextApiRequest, NextApiResponse } from 'next';

const baseURL = 'https://apis.postcode-jp.com/api/v5'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postcode = req.query.postcode
  const result = await fetch(`${baseURL}/postcodes/${postcode}?fields=postcode,hiragana.allAddress,pref,city,town`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.POSTCODE_API_KEY as string,
    },
  })

  const data = await result.json()

  if (result.status === 200) {
    if (!data || data.length === 0) {
      res.status(404).json({
        message: 'Not Found',
      })
    } else {
      res.json({
        postcode,
        hiragana: data[0].hiragana.allAddress,
        prefecture: data[0].pref,
        address: data[0].city + data.town,
      })
    }
  } else {
    res.status(result.status).json(data)
  }
}

export default handler
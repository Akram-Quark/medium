import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
import { json } from 'node:stream/consumers'
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',

  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
}
const client = sanityClient(config)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, name, email, comment } = JSON.parse(req.body)

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Couldn't submit comment", error })
  }
  console.log('nice')
  return res.status(200).json({ message: 'comment submitted' })
}

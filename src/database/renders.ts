import { ObjectId } from 'mongodb'
import { DB, mongoClient } from './mongodb'

export type Finality =
  | {
      type: 'success'
      url: string
      outputSize: number
    }
  | {
      type: 'error'
      errors: string
    }

export type FinalitySucceed = Exclude<Finality, { type: 'error' }>

export type Render = {
  renderId: string | null
  finality: Finality | null
}

export async function rendersCollection() {
  const client = await mongoClient

  return client.db(DB).collection<Render>('renders')
}

export async function getRenders() {
  const collection = await rendersCollection()

  return collection.find()
}

export async function getRenderById(id: string) {
  if (!ObjectId.isValid(id)) {
    return null
  }

  const collection = await rendersCollection()

  return collection.findOne(new ObjectId(id))
}

export async function insertRender({ renderId }: { renderId: string }) {
  const collection = await rendersCollection()

  return collection.insertOne({
    finality: null,
    renderId
  })
}

export const updateRenderWithFinality = async ({
  finality,
  renderId
}: {
  finality: Finality
  renderId: string
}) => {
  const collection = await rendersCollection()

  return collection.updateOne(
    {
      renderId
    },
    {
      $set: {
        finality
      }
    }
  )
}

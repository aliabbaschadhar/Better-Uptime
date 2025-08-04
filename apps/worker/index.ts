import axios from "axios"
import { bulkXAck, xAck, xReadGroup } from "redisstream/client"
import { prismaClient } from "store/client"
import { promise } from "zod"

const REGION_ID = String(process.env.REGION_ID)
const WORKER_ID = String(process.env.WORKER_ID)

// todo: check whether those RegionId exists in DB or not 

if (!REGION_ID) throw new Error("Region doesn't exists")

if (!WORKER_ID) throw new Error("Worker Id does not exists")

async function main() {
  while (true) {
    //read from the stream
    const response = await xReadGroup(REGION_ID, WORKER_ID)

    if (!response) {
      console.log("Response not found")
      continue;
    }

    const redisStreamIdsList = response.map(({ id }) => id) // Map will return the array


    let promises = response.map(({ id, message }) => fetchWebsites(message.url, message.id))
    await Promise.all(promises)
    console.log(promises.length)


    // process the website and store the result in the DB. 
    // todo: It should be routed through a queue in a bulk DB request

    // Ack back to the queue that his event has been processed
    bulkXAck(REGION_ID, redisStreamIdsList)
  }

}

function fetchWebsites(url: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now()
    axios.get(url)
      .then(async () => {
        const endTime = Date.now()
        await prismaClient.websiteTick.create({
          data: {
            websiteId: id,
            status: "Up",
            response_time_ms: endTime - startTime,
            regionId: REGION_ID
          }
        })
        resolve()
      })
      .catch(async () => {
        const endTime = Date.now()
        await prismaClient.websiteTick.create({
          data: {
            websiteId: id,
            status: "Down",
            response_time_ms: endTime - startTime,
            regionId: REGION_ID
          }
        })
        resolve()
      })
  })
}

main()
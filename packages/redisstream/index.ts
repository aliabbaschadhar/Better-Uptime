import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.error("Redis Client Error:", err))
  .connect();


const STREAM_NAME = "betteruptime:website"
type WebsiteEvent = { url: string, id: string }
type MessageType = {
  id: string,
  message: {
    url: string,
    id: string
  }
}


async function xAdd({ url, id }: WebsiteEvent) {
  try {
    await client.xAdd(
      STREAM_NAME, "*", {
      url,
      id
    });
  } catch (error) {
    // Handle error (e.g., log or rethrow)
    console.error("Failed to add to stream:", error);
    throw error;
  }
}

export async function xAddBulk(websites: WebsiteEvent[]) {
  for (const { url, id } of websites) {
    await xAdd({
      url: url,
      id: id
    })
  }
}


// More optimized approach
export async function xAddBulkPipeline(websites: WebsiteEvent[]) {

  // Start a Redis pipeline using MULTI
  // This queues all the following commands to be sent in one batch.
  // Redis processes them sequentially after .exec() is called.
  const pipeline = client.multi()

  // Add each website event to the Redis stream in the pipeline queue
  for (const { url, id } of websites) {
    pipeline.xAdd(STREAM_NAME, "*", { url, id })
  }

  try {

    // Execute all queued commands in a single request to Redis
    // Returns an array of responses or errors for each command
    await pipeline.exec()
    console.log(`Added ${websites.length} events to the stream`)
  } catch (err) {
    console.error("Failed to add events to Redis stream in bulk:", err)
    throw err;
  }
}

export async function xReadGroup(consumerGroup: string, workerId: string): Promise<MessageType[] | undefined> {
  const res = await client.xReadGroup(
    consumerGroup,
    workerId,
    {
      key: STREAM_NAME,
      id: ">"
    }, {
    COUNT: 10
  }
  )

  if (!res) {
    throw new Error("Response is empty!")
  }
  //@ts-ignore
  let messages: MessageType[] | undefined = res?.[0]?.messages ?? [];
  console.log(messages)
  return messages
}

export async function xAck(consumerGroup: string, eventId: string) {
  await client.xAck(STREAM_NAME, consumerGroup, eventId)
}

export async function bulkXAck(consumerGroup: string, eventIds: string[]) {
  Promise.all(eventIds.map((eventId) => xAck(consumerGroup, eventId)))
}
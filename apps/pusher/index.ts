import { prismaClient } from "store/client";
import { xAddBulk } from "redisstream/client";

async function main() {
  let websites = await prismaClient.website.findMany({
    select: {
      url: true,
      id: true
    }
  })

  console.log(websites.length)
  await xAddBulk(websites)
}

main()

setInterval(() => main(), 3 * 1000)
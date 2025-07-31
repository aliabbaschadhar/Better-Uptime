import { prismaClient } from "store/client"

export const seedDummyData = async () => {
  try {
    console.log("🌱 Seeding dummy data...")

    // Create dummy users
    const dummyUsers = [
      { username: "john_doe", password: "password123" },
      { username: "jane_smith", password: "password123" },
      { username: "admin_user", password: "admin123" }
    ]

    const createdUsers = []
    for (const userData of dummyUsers) {
      try {
        const user = await prismaClient.user.create({
          data: userData
        })
        createdUsers.push(user)
        console.log(`✅ Created user: ${user.username}`)
      } catch (error) {
        console.log(`⚠️  User ${userData.username} already exists`)
      }
    }

    // Get existing users if some were already created
    const allUsers = await prismaClient.user.findMany()

    // Create dummy websites
    const dummyWebsites = [
      { url: "https://google.com", userId: allUsers[0]?.id },
      { url: "https://github.com", userId: allUsers[1]?.id },
      { url: "https://stackoverflow.com", userId: allUsers[0]?.id },
      { url: "https://vercel.com", userId: null }, // Anonymous website
      { url: "https://prisma.io", userId: allUsers[2]?.id }
    ]

    for (const websiteData of dummyWebsites) {
      try {
        const website = await prismaClient.website.create({
          data: websiteData
        })
        console.log(`✅ Created website: ${website.url}`)
      } catch (error) {
        console.log(`⚠️  Website ${websiteData.url} might already exist`)
      }
    }

    // Create dummy regions
    const dummyRegions = [
      { name: "US-East" },
      { name: "US-West" },
      { name: "Europe" },
      { name: "Asia" }
    ]

    for (const regionData of dummyRegions) {
      try {
        const region = await prismaClient.region.create({
          data: regionData
        })
        console.log(`✅ Created region: ${region.name}`)
      } catch (error) {
        console.log(`⚠️  Region ${regionData.name} might already exist`)
      }
    }

    // Get all websites and regions for creating ticks
    const allWebsites = await prismaClient.website.findMany()
    const allRegions = await prismaClient.region.findMany()

    // Create dummy website ticks (status checks)
    const statusOptions = ["Up", "Down", "Unknown"] as const

    for (const website of allWebsites.slice(0, 3)) { // Only for first 3 websites
      for (const region of allRegions.slice(0, 2)) { // Only for first 2 regions
        try {
          const tick = await prismaClient.websiteTick.create({
            data: {
              websiteId: website.id,
              regionId: region.id,
              status: statusOptions[Math.floor(Math.random() * statusOptions.length)] as any,
              response_time_ms: Math.floor(Math.random() * 1000) + 100 // Random response time 100-1100ms
            }
          })
          console.log(`✅ Created tick for ${website.url} from ${region.name}`)
        } catch (error) {
          console.log(`⚠️  Tick creation failed for ${website.url}`)
        }
      }
    }

    console.log("🎉 Dummy data seeding completed!")

  } catch (error) {
    console.error("❌ Error seeding dummy data:", error)
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const destinations = [
  {
    slug: "sigiriya",
    name: "Sigiriya",
    country: "Sri Lanka",
    description: "Ancient rock fortress, jungle plains, frescoes, and sunrise climbs.",
    image: "/images/sigiriya2.jpg",
    highlights: ["Lion Rock", "Village safari", "Ancient frescoes"],
    isFeatured: true,
  },
  {
    slug: "kandy",
    name: "Kandy",
    country: "Sri Lanka",
    description: "Temple city framed by lake views, gardens, and Kandyan heritage.",
    image: "/images/kandy.jpg",
    highlights: ["Temple of the Tooth", "Royal Botanical Gardens", "Lakefront stays"],
    isFeatured: true,
  },
  {
    slug: "ella",
    name: "Ella",
    country: "Sri Lanka",
    description: "Hill country retreat with tea estates, waterfalls, and scenic train journeys.",
    image: "/images/Ella_sri_lanka.jpg",
    highlights: ["Nine Arch Bridge", "Tea plantations", "Little Adam's Peak"],
    isFeatured: true,
  },
  {
    slug: "galle",
    name: "Galle",
    country: "Sri Lanka",
    description: "UNESCO-listed fort city with coastal dining, boutiques, and heritage walks.",
    image: "/images/galle-fort-1050x700-1.jpg",
    highlights: ["Galle Fort", "Coastal galleries", "Sunset ramparts"],
    isFeatured: true,
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    country: "Sri Lanka",
    description: "Southern beach escape known for whale watching, surfing, and relaxed luxury.",
    image: "/images/mirissa.jpg",
    highlights: ["Whale watching", "Beach clubs", "Private yacht cruises"],
    isFeatured: true,
  },
  {
    slug: "yala",
    name: "Yala",
    country: "Sri Lanka",
    description: "Wildlife region with leopard safaris, coastal lodges, and national parks.",
    image: "/images/cinematic.webp",
    highlights: ["Leopard safari", "Luxury tented camps", "Bird watching"],
    isFeatured: false,
  },
  {
    slug: "phuket",
    name: "Phuket",
    country: "Thailand",
    description: "Island beaches, private boat trips, old town dining, and resort living.",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80",
    highlights: ["Island hopping", "Luxury resorts", "Old Phuket Town"],
    isFeatured: true,
  },
  {
    slug: "chiang-mai",
    name: "Chiang Mai",
    country: "Thailand",
    description: "Northern Thailand's temple-rich cultural capital with mountains and markets.",
    image: "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=1400&q=80",
    highlights: ["Temple trails", "Night markets", "Elephant sanctuaries"],
    isFeatured: false,
  },
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    description: "Modern skyline, premium shopping, multicultural food, and iconic towers.",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80",
    highlights: ["Petronas Towers", "Street food", "Luxury hotels"],
    isFeatured: true,
  },
  {
    slug: "langkawi",
    name: "Langkawi",
    country: "Malaysia",
    description: "Tropical archipelago with rainforest villas, beaches, and private cruises.",
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1400&q=80",
    highlights: ["Sky Bridge", "Mangrove cruises", "Beach resorts"],
    isFeatured: true,
  },
];

const tours = [
  {
    slug: "sri-lanka-4-day-coastal",
    title: "Sri Lanka 4-Day Coastal Retreat",
    country: "Sri Lanka",
    durationDays: 4,
    shortDescription: "A short luxury beach escape with private transfers and boutique seaside nights.",
    overview:
      "Designed for travelers with limited time, this itinerary blends Mirissa's ocean calm with the heritage atmosphere of Galle Fort.",
    startingPrice: 1599,
    priceMin: 1599,
    priceMax: 1899,
    bestSeason: "December - April",
    groupSize: "2-6 guests",
    featuredImage: "/images/mirissa.jpg",
    isFeatured: false,
    destinationSlugs: ["mirissa", "galle"],
    images: ["/images/cinematic.webp", "/images/mirissa.jpg", "/images/meaningful.webp"],
    activities: [
      ["Whale Watching", "Early morning private whale watching cruise from Mirissa.", "Waves", "/images/mirissa.jpg", 85],
      ["Galle Fort Walk", "Guided heritage walk through colonial streets and seaside ramparts.", "Map", "/images/galle-fort-1050x700-1.jpg", 45],
      ["Beachfront Dinner", "Private candlelit dinner arranged beside the southern coast.", "Utensils", "/images/meaningful.webp", 120],
    ],
    itineraryDays: [
      [1, "Arrival and Coastal Relaxation", "Mirissa", "Private arrival, beachfront check-in, and a candlelit seaside dinner.", ["Private chauffeur", "Beachfront villa"]],
      [2, "Ocean Adventure", "Mirissa", "Whale watching cruise and afternoon beachside leisure.", ["Whale watching", "Spa time"]],
      [4, "Heritage Departure", "Galle", "Private tour of the fort city before a luxury transfer to the airport.", ["Fort walk", "Airport transfer"]],
    ],
  },
  {
    slug: "sri-lanka-7-day-escape",
    title: "Sri Lanka 7-Day Signature Escape",
    country: "Sri Lanka",
    durationDays: 7,
    shortDescription: "From cultural wonders to coastal luxury, experience Sri Lanka in a single flawless itinerary.",
    overview:
      "A polished island introduction with Sigiriya, Kandy, Ella, and Galle connected by private transfers and boutique stays.",
    startingPrice: 2399,
    priceMin: 2399,
    priceMax: 3199,
    bestSeason: "November - April",
    groupSize: "2-8 guests",
    featuredImage: "/images/sigiriya2.jpg",
    isFeatured: true,
    destinationSlugs: ["sigiriya", "kandy", "ella", "galle"],
    images: ["/images/sigiriya.webp", "/images/Ella_sri_lanka.jpg", "/images/galle-fort-1050x700-1.jpg", "/images/kandy.jpg"],
    activities: [
      ["Private Temple Tour", "A guided cultural ceremony and temple visit in Kandy.", "Landmark", "/images/kandy.jpg", 60],
      ["Luxury Train Ride", "Reserved scenic rail segment through tea country.", "Train", "/images/Ella_sri_lanka.jpg", 95],
      ["Tea Estate Walk", "Private tea estate walk and tasting experience.", "Leaf", "/images/Ella_sri_lanka.jpg", 55],
    ],
    itineraryDays: [
      [1, "Arrival and Coastal Welcome", "Negombo", "Luxury transfer from the airport to a beachfront villa.", ["VIP arrival", "Sunset dinner"]],
      [2, "Cultural Discovery", "Sigiriya", "Guided climb up the ancient rock fortress followed by a private village safari.", ["Rock fortress", "Village lunch"]],
      [5, "Hill Country Elegance", "Ella", "Tea plantation walk, scenic train journey, and boutique resort relaxation.", ["Tea country", "Nine Arch Bridge"]],
      [7, "Seaside Farewell", "Galle", "Heritage city tour, private coastal dinner, and a luxury departure transfer.", ["Fort tour", "Coastal dinner"]],
    ],
  },
  {
    slug: "sri-lanka-14-day-premier",
    title: "Sri Lanka 14-Day Premier Journey",
    country: "Sri Lanka",
    durationDays: 14,
    shortDescription: "The ultimate island tour blending luxury resorts, wildlife, heritage, and coastal serenity.",
    overview:
      "A fuller Sri Lanka journey across cultural icons, hill country, safari landscapes, and the southern coast.",
    startingPrice: 4999,
    priceMin: 4999,
    priceMax: 5799,
    bestSeason: "December - March",
    groupSize: "2-12 guests",
    featuredImage: "/images/Ella_sri_lanka.jpg",
    isFeatured: true,
    destinationSlugs: ["sigiriya", "kandy", "ella", "yala", "mirissa", "galle"],
    images: ["/images/cinematic.webp", "/images/mirissa.jpg", "/images/meaningful.webp", "/images/sigiriya2.jpg"],
    activities: [
      ["Yala Safari", "Private jeep safari with an expert naturalist.", "Binoculars", "/images/cinematic.webp", 140],
      ["Private Yacht Dining", "Southern coast dinner aboard a private yacht.", "Ship", "/images/mirissa.jpg", 280],
      ["Cultural Performance", "Reserved seats for a traditional Kandyan performance.", "Music", "/images/kandy.jpg", 45],
    ],
    itineraryDays: [
      [1, "Arrival Reception", "Negombo", "VIP transfer and welcome dinner at a premium beachfront hotel.", ["VIP transfer", "Welcome dinner"]],
      [5, "Heritage and Hills", "Kandy", "Temple tour, cultural performance, and a private lake dinner.", ["Temple ceremony", "Lake dinner"]],
      [9, "Tea Country and Trains", "Ella", "Luxury train ride, tea estate exploration, and hilltop rest.", ["Scenic rail", "Tea tasting"]],
      [12, "Wild South", "Yala", "Safari drives and slow evenings at a luxury wilderness lodge.", ["Leopard safari", "Tented camp"]],
      [14, "Coastal Sunset Departure", "Galle", "Fort city stroll and a final sunset farewell meal.", ["Fort walk", "Sunset meal"]],
    ],
  },
  {
    slug: "thailand-7-day-island-and-temple",
    title: "Thailand 7-Day Island and Temple Escape",
    country: "Thailand",
    durationDays: 7,
    shortDescription: "A balanced Thailand journey through Phuket beaches and Chiang Mai culture.",
    overview:
      "Pair island days, private boat charters, and northern temple experiences in a refined Thailand itinerary.",
    startingPrice: 2699,
    priceMin: 2699,
    priceMax: 3499,
    bestSeason: "November - March",
    groupSize: "2-8 guests",
    featuredImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80",
    isFeatured: true,
    destinationSlugs: ["phuket", "chiang-mai"],
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=1400&q=80",
    ],
    activities: [
      ["Private Island Hopping", "Chartered boat day across turquoise bays and limestone cliffs.", "Ship", "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80", 240],
      ["Temple Trail", "Curated Chiang Mai temple route with a local cultural host.", "Landmark", "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=1400&q=80", 75],
    ],
    itineraryDays: [
      [1, "Phuket Arrival", "Phuket", "Private airport welcome and resort check-in near the beach.", ["Resort arrival", "Sunset dinner"]],
      [3, "Private Boat Day", "Phuket", "Island hopping by private boat with a catered lunch.", ["Boat charter", "Hidden coves"]],
      [5, "Northern Culture", "Chiang Mai", "Fly north for markets, temples, and mountain dining.", ["Temple tour", "Night market"]],
      [7, "Slow Departure", "Chiang Mai", "Final brunch and private airport transfer.", ["Brunch", "Airport transfer"]],
    ],
  },
  {
    slug: "malaysia-7-day-city-and-island",
    title: "Malaysia 7-Day City and Island Journey",
    country: "Malaysia",
    durationDays: 7,
    shortDescription: "Kuala Lumpur skyline energy paired with Langkawi's relaxed island luxury.",
    overview:
      "A Malaysia itinerary for travelers who want modern city comforts followed by tropical downtime.",
    startingPrice: 2499,
    priceMin: 2499,
    priceMax: 3299,
    bestSeason: "December - August",
    groupSize: "2-8 guests",
    featuredImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80",
    isFeatured: false,
    destinationSlugs: ["kuala-lumpur", "langkawi"],
    images: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1400&q=80",
    ],
    activities: [
      ["Skyline Dining", "Private Kuala Lumpur dinner with skyline views.", "Utensils", "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80", 130],
      ["Langkawi Mangrove Cruise", "Guided private cruise through mangrove channels.", "Leaf", "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1400&q=80", 110],
    ],
    itineraryDays: [
      [1, "Kuala Lumpur Arrival", "Kuala Lumpur", "Private welcome, hotel check-in, and skyline dinner.", ["Airport arrival", "Skyline dinner"]],
      [3, "City Icons", "Kuala Lumpur", "Petronas Towers, cultural quarters, and curated food stops.", ["Petronas Towers", "Street food"]],
      [5, "Langkawi Island Time", "Langkawi", "Fly to Langkawi for rainforest villas and beach leisure.", ["Island flight", "Beach resort"]],
      [7, "Mangroves and Departure", "Langkawi", "Morning mangrove cruise before departure transfer.", ["Mangrove cruise", "Departure transfer"]],
    ],
  },
  {
    slug: "southeast-asia-20-day-grand-tour",
    title: "Southeast Asia 20-Day Grand Tour",
    country: "Sri Lanka",
    durationDays: 20,
    shortDescription: "A multi-country signature journey across Sri Lanka, Thailand, and Malaysia.",
    overview:
      "A premium long-form itinerary connecting Sri Lanka's cultural south, Thailand's island life, and Malaysia's city-island contrast.",
    startingPrice: 7999,
    priceMin: 7999,
    priceMax: 9799,
    bestSeason: "December - March",
    groupSize: "2-10 guests",
    featuredImage: "/images/cinematic.webp",
    isFeatured: true,
    destinationSlugs: ["sigiriya", "ella", "galle", "phuket", "kuala-lumpur", "langkawi"],
    images: [
      "/images/cinematic.webp",
      "/images/sigiriya2.jpg",
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80",
    ],
    activities: [
      ["Cross-Country Concierge", "End-to-end itinerary management across three countries.", "ConciergeBell", "/images/cinematic.webp", 0],
      ["Signature Food Trail", "Curated dining experiences from Galle to Kuala Lumpur.", "Utensils", "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80", 180],
      ["Island Charter Day", "Private boat charter in Thailand or Langkawi.", "Ship", "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1400&q=80", 320],
    ],
    itineraryDays: [
      [1, "Sri Lanka Welcome", "Colombo", "VIP arrival and hosted welcome dinner.", ["VIP arrival", "Hosted dinner"]],
      [4, "Cultural Triangle", "Sigiriya", "Private fortress climb and village experience.", ["Sigiriya", "Village lunch"]],
      [8, "Hill Country", "Ella", "Tea estates, scenic rail, and slow hill-country evenings.", ["Tea estates", "Scenic train"]],
      [11, "Southern Coast", "Galle", "Heritage walks and beachside dining before flying onward.", ["Galle Fort", "Coastal dinner"]],
      [14, "Thailand Island Days", "Phuket", "Private boat trips and resort downtime.", ["Island hopping", "Resort leisure"]],
      [17, "Malaysia Skyline", "Kuala Lumpur", "City icons, food trail, and premium shopping.", ["Petronas Towers", "Food trail"]],
      [20, "Langkawi Farewell", "Langkawi", "Mangrove cruise and final private departure.", ["Mangroves", "Departure transfer"]],
    ],
  },
];

const testimonials = [
  {
    name: "Asha Perera",
    country: "Sri Lanka",
    role: "Honeymoon Couple",
    message:
      "Beyond Sea Travels crafted a perfect luxury itinerary for us with private transport, incredible dining, and attentive service from start to finish.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
  {
    name: "Michael Tan",
    country: "Singapore",
    role: "Solo Adventure",
    message:
      "The team delivered immersive local experiences and flawless logistics. Every detail felt premium, effortless, and unforgettable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
  {
    name: "Sofia Almeida",
    country: "Portugal",
    role: "Family Retreat",
    message:
      "Our family loved the private tours, boutique stays, and the thoughtful itinerary that balanced culture with relaxation.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
  {
    name: "Daniel Brooks",
    country: "United Kingdom",
    role: "Cultural Traveler",
    message:
      "The 14-day Sri Lanka route felt deeply personal. Our guide, hotels, and daily pacing were all excellent.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    isFeatured: false,
  },
  {
    name: "Nadia Rahman",
    country: "Malaysia",
    role: "Friends Getaway",
    message:
      "Transfers were smooth, stops were thoughtfully chosen, and the coastal recommendations were exactly what we wanted.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    isFeatured: false,
  },
];

const transferLocations = [
  ["colombo", "Colombo", "city", "Sri Lanka's commercial capital and common luxury transfer hub."],
  ["airport", "Bandaranaike International Airport", "airport", "Main international arrival point near Colombo."],
  ["galle", "Galle", "beach", "UNESCO fort city and southern coast gateway."],
  ["mirissa", "Mirissa", "beach", "Relaxed beach town known for surfing and whale watching."],
  ["ella", "Ella", "mountain", "Hill country village with waterfalls, trails, and tea estates."],
  ["kandy", "Kandy", "city", "Cultural capital centered around the Temple of the Tooth."],
  ["sigiriya", "Sigiriya", "mountain", "Ancient rock fortress and cultural triangle landmark."],
  ["yala", "Yala", "wildlife", "Safari region for Yala National Park and wilderness lodges."],
  ["negombo", "Negombo", "beach", "Coastal arrival town close to the airport."],
];

const transferRoutes = [
  ["colombo", "galle", 120, 180, "2h 15m", ["Bentota Turtle Hatchery", "Madu River Safari"]],
  ["colombo", "ella", 220, 320, "5h 45m", ["Tea Plantation Tours", "Ravana Falls"]],
  ["colombo", "kandy", 115, 170, "3h 15m", ["Pinnawala Elephant Care", "Spice Garden"]],
  ["colombo", "sigiriya", 165, 240, "4h 15m", ["Dambulla Cave Temple", "Village Lunch"]],
  ["colombo", "yala", 280, 380, "6h 30m", ["Southern Expressway Stop", "Tissa Lake"]],
  ["airport", "mirissa", 180, 240, "3h 30m", ["Bentota Turtle Hatchery", "Madu River Safari"]],
  ["airport", "galle", 140, 200, "2h 45m", ["Bentota Turtle Hatchery", "Galle Fort Arrival Walk"]],
  ["airport", "kandy", 135, 190, "3h 30m", ["Pinnawala Elephant Care", "Spice Garden"]],
  ["airport", "ella", 240, 340, "6h 15m", ["Tea Plantation Tours", "Waterfall Viewpoint"]],
  ["airport", "sigiriya", 185, 260, "4h 30m", ["Dambulla Cave Temple", "Local Lunch"]],
  ["kandy", "ella", 85, 140, "2h 45m", ["Tea Plantation Tours", "Ramboda Falls"]],
  ["sigiriya", "kandy", 70, 120, "2h 15m", ["Dambulla Cave Temple", "Matale Spice Garden"]],
  ["galle", "mirissa", 50, 90, "1h 10m", ["Unawatuna Beach", "Weligama Surf Bay"]],
  ["mirissa", "yala", 120, 180, "2h 45m", ["Tangalle Coast", "Tissa Lake"]],
  ["ella", "yala", 115, 175, "3h 15m", ["Ravana Falls", "Buduruwagala Temple"]],
  ["galle", "airport", 140, 200, "2h 45m", ["Madu River Safari", "Expressway Rest Stop"]],
];

const main = async () => {
  await prisma.activity.deleteMany();
  await prisma.itineraryDay.deleteMany();
  await prisma.tourImage.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.transferRoute.deleteMany();
  await prisma.transferLocation.deleteMany();

  await prisma.destination.createMany({ data: destinations });
  await prisma.testimonial.createMany({ data: testimonials });

  for (const tour of tours) {
    await prisma.tour.create({
      data: {
        slug: tour.slug,
        title: tour.title,
        country: tour.country,
        durationDays: tour.durationDays,
        shortDescription: tour.shortDescription,
        overview: tour.overview,
        startingPrice: tour.startingPrice,
        priceMin: tour.priceMin,
        priceMax: tour.priceMax,
        bestSeason: tour.bestSeason,
        groupSize: tour.groupSize,
        featuredImage: tour.featuredImage,
        isFeatured: tour.isFeatured,
        destinations: {
          connect: tour.destinationSlugs.map((slug) => ({ slug })),
        },
        images: {
          create: tour.images.map((url, index) => ({
            url,
            alt: `${tour.title} image ${index + 1}`,
          })),
        },
        activities: {
          create: tour.activities.map(([title, description, icon, image, estimatedPrice]) => ({
            title: String(title),
            description: String(description),
            icon: String(icon),
            image: String(image),
            estimatedPrice: Number(estimatedPrice),
          })),
        },
        itineraryDays: {
          create: tour.itineraryDays.map(([dayNumber, title, location, description, highlights]) => ({
            dayNumber: Number(dayNumber),
            title: String(title),
            location: String(location),
            description: String(description),
            highlights: highlights as string[],
          })),
        },
      },
    });
  }

  const createdLocations = await Promise.all(
    transferLocations.map(([slug, name, type, description]) =>
      prisma.transferLocation.create({
        data: {
          slug,
          name,
          type,
          description,
        },
      }),
    ),
  );

  const locationBySlug = new Map(createdLocations.map((location) => [location.slug, location.id]));

  for (const [pickup, dropoff, distanceKm, basePrice, estimatedDuration, recommendedStops] of transferRoutes) {
    const pickupLocationId = locationBySlug.get(String(pickup));
    const dropoffLocationId = locationBySlug.get(String(dropoff));

    if (!pickupLocationId || !dropoffLocationId) {
      throw new Error(`Missing transfer location for ${pickup} to ${dropoff}`);
    }

    await prisma.transferRoute.create({
      data: {
        pickupLocationId,
        dropoffLocationId,
        distanceKm: Number(distanceKm),
        basePrice: Number(basePrice),
        estimatedDuration: String(estimatedDuration),
        recommendedStops: recommendedStops as string[],
      },
    });
  }
};

main()
  .then(async () => {
    console.log("Seed data created successfully.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

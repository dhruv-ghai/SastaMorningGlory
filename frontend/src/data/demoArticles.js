const demoArticles = [
  {
    _id: 'demo-rare-earths-scheme',
    title: 'Cabinet clears ₹7,200 crore rare earths scheme to cut China dependence',
    slug: 'cabinet-rare-earths-scheme',
    category: 'Business',
    author: 'Policy Desk',
    content:
      '<p>The Union Cabinet has approved a ₹7,200 crore production-linked incentive scheme aimed at accelerating India’s rare-earth processing capacity over the next five years. The move is designed to reduce downstream manufacturers’ dependence on Chinese magnets and batteries.</p><p>The scheme will support private miners, engineering firms, and start-ups that can demonstrate technology for refining neodymium, dysprosium, and other critical minerals. Industry bodies hailed the decision, calling it a “necessary insurance” for India’s EV and defence ambitions.</p>',
    metaDescription: 'PLI for rare earths cleared to build local supply chains for EVs and defence.',
    keywords: ['Rare Earths', 'PLI', 'EV', 'China'],
    tags: ['Economy', 'EV', 'MakeInIndia'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-26T05:10:00.000Z'
  },
  {
    _id: 'demo-gaganyaan-parachute',
    title: 'ISRO tests supersonic parachutes ahead of Gaganyaan crewed flight',
    slug: 'isro-gaganyaan-parachute-test',
    category: 'Technology',
    author: 'Science Desk',
    content:
      '<p>ISRO successfully completed a high-altitude drop test of the parachute system that will slow down the Gaganyaan crew module during re-entry. The test, performed at the Rajasthan desert range, simulated a 7-km release point with peak loads of 31 tonnes.</p><p>The space agency said all sensors and pyros responded within tolerance, paving the way for the next abort demonstration mission early next year. The human spaceflight team is now integrating upgraded avionics for the crew module.</p>',
    metaDescription: 'Supersonic parachutes pass key test for India’s first human spaceflight.',
    keywords: ['ISRO', 'Gaganyaan', 'Parachute Test'],
    tags: ['Space', 'Innovation'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-25T13:40:00.000Z',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    _id: 'demo-delhi-weather-labs',
    title: 'Delhi’s “Weather Labs” pilot uses AI to time anti-pollution sprays',
    slug: 'delhi-weather-labs-ai-pollution',
    category: 'National',
    author: 'Civic Bureau',
    content:
      '<p>The Delhi government launched mini “Weather Labs” across five boroughs to predict stagnant wind pockets and dispatch anti-smog water sprayers in real time. The labs use AI trained on IMD wind models and city sensor data.</p><p>Officials claim the predictive dispatch has cut dust spikes during morning rush hour by 12%. The pilot runs through January before expanding to the NCR towns.</p>',
    metaDescription: 'AI-enabled weather labs in Delhi dispatch targeted anti-smog measures.',
    keywords: ['Delhi', 'Pollution', 'AI'],
    tags: ['AirQuality', 'SmartCity'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-24T06:30:00.000Z'
  },
  {
    _id: 'demo-smart-mobility-hyderabad',
    title: 'Hyderabad opens India’s first integrated smart-mobility metro hub',
    slug: 'hyderabad-smart-mobility-hub',
    category: 'National',
    author: 'Metro Desk',
    content:
      '<p>The Raidurg metro hub now combines metro rail, airport shuttle pods, bike docks, and EV charging lanes on a single ticketing backbone. The Telangana government claims the interchange can move 150,000 commuters daily with 40% lower dwell time.</p><p>A dedicated sky-deck houses solar canopies powering smart street furniture and public Wi-Fi. Tech majors in HITEC City said the hub finally delivers the “last-mile predictability” global teams expect.</p>',
    metaDescription: 'Raidurg metro hub blends rail, pods, bikes, and EV chargers under one ticket.',
    keywords: ['Hyderabad', 'Metro', 'Mobility'],
    tags: ['Infrastructure', 'Transport'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-23T10:20:00.000Z'
  },
  {
    _id: 'demo-mumbai-street-food',
    title: 'Mumbai street food carts to get IoT hygiene badges before tourist season',
    slug: 'mumbai-street-food-iot',
    category: 'National',
    author: 'Food & Travel Desk',
    content:
      '<p>Over 2,000 licensed street-food vendors in Mumbai will be fitted with IoT temperature badges that track cold storage and cooking zones. The Brihanmumbai Municipal Corporation said the badges sync with a public map so tourists can verify compliance instantly.</p><p>Food delivery platforms have pledged incentives for carts that maintain green ratings for 60 consecutive days. Restaurateurs say the move “formalises” India’s street food economy without losing neighbourhood charm.</p>',
    metaDescription: 'IoT hygiene badges aim to modernise Mumbai’s street food circuit.',
    keywords: ['Mumbai', 'Street Food', 'IoT'],
    tags: ['Lifestyle', 'SmartCity'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1528830690936-4be920f52d26?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-21T08:00:00.000Z'
  },
  {
    _id: 'demo-uttarakhand-hydrogen',
    title: 'Uttarakhand commissions micro green-hydrogen plant for border posts',
    slug: 'uttarakhand-green-hydrogen-border',
    category: 'National',
    author: 'Energy Desk',
    content:
      '<p>The BRO commissioned India’s first micro green-hydrogen plant to power remote posts near the India-China border. The containerised system cracks hydrogen using glacier meltwater and solar power.</p><p>The pilot supplies 80 kWh each night, replacing diesel drums that were airlifted every 12 days. Defence experts say the system could be replicated for Himalayan villages that remain cut off for months.</p>',
    metaDescription: 'Green hydrogen plant powers high-altitude border posts and villages.',
    keywords: ['Hydrogen', 'Border Roads', 'Renewables'],
    tags: ['Sustainability', 'Defence'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-20T04:45:00.000Z'
  },
  {
    _id: 'demo-indo-us-chip-taskforce',
    title: 'Indo-US chip taskforce picks Bengaluru for joint packaging facility',
    slug: 'indo-us-chip-taskforce',
    category: 'Business',
    author: 'Tech Policy Desk',
    content:
      '<p>The Indo-US semiconductor taskforce finalised Bengaluru as the site for a joint advanced packaging facility backed by two American fabless firms and an Indian PSU. The 35-acre campus will focus on 3D stacking for automotive and defence chips.</p><p>Commerce Ministry officials said the centre will anchor a supply chain of local bumping houses and substrate makers, creating 9,000 direct jobs over four years.</p>',
    metaDescription: 'Joint US-India chip packaging campus headed to Bengaluru.',
    keywords: ['Semiconductors', 'US-India', 'Bengaluru'],
    tags: ['Technology', 'Manufacturing'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1509223197845-458d87318791?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-19T15:00:00.000Z'
  },
  {
    _id: 'demo-social-commerce-northeast',
    title: 'Northeast weavers tap social commerce; exports jump 38%',
    slug: 'northeast-weavers-social-commerce',
    category: 'Business',
    author: 'Markets Desk',
    content:
      '<p>Over 4,500 weavers from the Northeast joined ONDC-powered social commerce storefronts this quarter, unlocking direct exports to Japan and Australia. Handloom cooperatives report a 38% jump in average ticket sizes.</p><p>The Commerce Ministry is now funding a freight consolidation centre in Guwahati so artisans can share cold-chain and packaging infrastructure.</p>',
    metaDescription: 'ONDC storefronts boost Northeast handloom exports.',
    keywords: ['ONDC', 'Handloom', 'Exports'],
    tags: ['SMB', 'Commerce'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1455894127589-22f75500213a?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-18T11:25:00.000Z'
  },
  {
    _id: 'demo-himalayan-apple-train',
    title: 'Himalayan “Apple Express” freight train to slash wastage this winter',
    slug: 'himalayan-apple-express',
    category: 'Business',
    author: 'Agri Desk',
    content:
      '<p>Indian Railways launched a climate-controlled “Apple Express” connecting Himachal’s Bhakra siding to Mumbai’s cold storage yards. The rake can move 1,600 tonnes of apples in 40 hours, cutting wastage by half.</p><p>Growers say the service finally offers parity with imported Washington apples that dominate metros during winter.</p>',
    metaDescription: 'Climate-controlled freight train to move Himachal apples nationwide.',
    keywords: ['Apple Express', 'Railways', 'Agriculture'],
    tags: ['AgriTech', 'Logistics'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-17T07:30:00.000Z'
  },
  {
    _id: 'demo-davos-ev-supply',
    title: 'At Davos-like India Energy Week, EV supply deals worth $4.1 bn signed',
    slug: 'india-energy-week-ev-deals',
    category: 'Business',
    author: 'Energy Desk',
    content:
      '<p>Battery majors, auto OEMs, and port operators signed $4.1 billion worth of supply agreements on day one of India Energy Week in Goa. The deals include long-term cathode sourcing and port-based recycling units.</p><p>Analysts say the contracts bring clarity to India’s EV roadmap just as the FAME subsidy winds down.</p>',
    metaDescription: 'EV supply chain deals worth $4.1 bn inked at India Energy Week.',
    keywords: ['EV', 'Energy Week', 'Batteries'],
    tags: ['Energy', 'Investments'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-16T09:45:00.000Z'
  },
  {
    _id: 'demo-ipl-media-townhall',
    title: 'IPL media rights townhall hints at split-feed interactive matches',
    slug: 'ipl-media-rights-interactive',
    category: 'Entertainment',
    author: 'Sports & Media Desk',
    content:
      '<p>The BCCI’s broadcasters’ townhall showcased prototype “split-feed” matches where fans can drag-and-drop stats, spider cams, and vernacular commentary tiles on mobile apps.</p><p>Broadcasters say the feature will roll out during the playoffs, giving advertisers new shoppable overlays.</p>',
    metaDescription: 'Split-feed IPL broadcasts to allow fan-controlled stats and cams.',
    keywords: ['IPL', 'Media Rights', 'Interactive TV'],
    tags: ['Cricket', 'OTT'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-15T14:00:00.000Z'
  },
  {
    _id: 'demo-odisha-hockey-village',
    title: 'Odisha builds “Hockey Village” dorms ahead of Champions Trophy',
    slug: 'odisha-hockey-village',
    category: 'Sports',
    author: 'Sports Desk',
    content:
      '<p>The Odisha government unveiled eco-friendly dorms that will host 400 athletes during the Hockey Champions Trophy in Bhubaneswar. The village uses bamboo composites, solar roofing, and locally woven furnishings.</p><p>FIH representatives called the venue a “template for mid-sized tournaments” in Asia.</p>',
    metaDescription: 'Eco-friendly hockey village readied in Odisha for Champions Trophy.',
    keywords: ['Hockey', 'Odisha', 'Sports Infrastructure'],
    tags: ['Sports', 'Sustainability'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-14T05:30:00.000Z'
  },
  {
    _id: 'demo-space-startups-australia',
    title: 'Indian space startups win Down Under: launch tie-ups inked in Darwin',
    slug: 'indian-space-startups-australia',
    category: 'Technology',
    author: 'Start-up Desk',
    content:
      '<p>Two Indian small-sat launch companies signed agreements with Australia’s Equatorial Launch Australia to use the Arnhem Space Centre. The tie-up gives Indian payloads access to a southern-hemisphere corridor ideal for sun-synchronous missions.</p><p>Start-ups will share telemetry stations and clean rooms, cutting mission prep timelines by 20%.</p>',
    metaDescription: 'Indian space start-ups secure Australian launch pads for sun-synchronous missions.',
    keywords: ['Space Startups', 'Australia', 'Launch'],
    tags: ['Space', 'Startups'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1473929734670-85c3c5338849?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1473929734670-85c3c5338849?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-13T12:05:00.000Z'
  },
  {
    _id: 'demo-ai-lok-sabha-transcripts',
    title: 'AI engine to auto-translate Lok Sabha debates into 12 Indian languages',
    slug: 'ai-lok-sabha-translations',
    category: 'Politics',
    author: 'Parliament Desk',
    content:
      '<p>Parliament launched “Bhashini Sabha”, an AI pipeline that translates Lok Sabha transcripts into 12 languages within minutes. Citizens can view bilingual Hansard entries with speaker-wise timestamps.</p><p>The tool will next support live subtitling for committee webcasts, making proceedings more inclusive.</p>',
    metaDescription: 'Bhashini Sabha AI tool to translate Lok Sabha debates in near real-time.',
    keywords: ['Lok Sabha', 'AI', 'Bhashini'],
    tags: ['Governance', 'Technology'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-12T09:00:00.000Z'
  },
  {
    _id: 'demo-g20-youth-climate-fund',
    title: 'G20 youth climate fund picks 14 Indian ideas for micro-grants',
    slug: 'g20-youth-climate-fund-india',
    category: 'International',
    author: 'Climate Desk',
    content:
      '<p>The G20 youth climate fund announced 14 Indian winners building river-cleaning drones, regenerative farming toolkits, and low-cost air quality sensors. Each project receives $150,000 plus mentorship.</p><p>Organisers said India accounted for the highest number of shortlisted ideas thanks to strong campus incubators.</p>',
    metaDescription: 'Indian students secure most spots in the G20 youth climate challenge.',
    keywords: ['G20', 'Climate', 'Youth'],
    tags: ['ClimateAction', 'Innovation'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-11T07:20:00.000Z'
  },
  {
    _id: 'demo-solar-floating-kerala',
    title: 'Kerala switches on India’s largest floating solar park inside a dam',
    slug: 'kerala-floating-solar-park',
    category: 'National',
    author: 'Energy Desk',
    content:
      '<p>The Kerala State Electricity Board commissioned a 100 MW floating solar park inside the Idukki reservoir. The panels use wave-riding pontoons that automatically tilt to maximise sun exposure.</p><p>The project will power 62,000 homes and reduce reservoir evaporation by 15%, according to state engineers.</p>',
    metaDescription: 'Floating solar park in Kerala to power 62,000 homes and cut evaporation.',
    keywords: ['Kerala', 'Floating Solar', 'Renewables'],
    tags: ['Energy', 'Sustainability'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-10T05:55:00.000Z'
  },
  {
    _id: 'demo-ladakh-dark-sky-rail',
    title: 'Ladakh to run night-safari sky trains for astro tourism',
    slug: 'ladakh-dark-sky-rail',
    category: 'Jammu & Kashmir',
    author: 'Travel Desk',
    content:
      '<p>Ladakh’s tourism department will run limited-night heritage trains between Leh and the Hanle Dark Sky Reserve. The glass-roof coaches feature reclining seats, on-board astronomers, and 5G-enabled AR overlays.</p><p>Tickets sold out for the first fortnight within hours, signalling rising demand for astro-tourism in India.</p>',
    metaDescription: 'Glass-roof night trains planned in Ladakh’s Hanle Dark Sky Reserve.',
    keywords: ['Ladakh', 'Dark Sky', 'Tourism'],
    tags: ['Travel', 'Space'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-09T14:10:00.000Z'
  },
  {
    _id: 'demo-jk-saffron-chain',
    title: 'J&K saffron gets blockchain-backed GI traceability card',
    slug: 'jk-saffron-blockchain',
    category: 'Jammu & Kashmir',
    author: 'Agri Desk',
    content:
      '<p>The Jammu & Kashmir administration rolled out GI traceability cards for saffron farmers. Each lot now carries a QR code tied to a blockchain ledger recording farm coordinates, drying conditions, and lab tests.</p><p>Exporters say the card helps counter fake imports and commands a 20% premium in West Asia.</p>',
    metaDescription: 'Blockchain-enabled GI cards to protect Kashmiri saffron authenticity.',
    keywords: ['Saffron', 'Blockchain', 'GI Tag'],
    tags: ['AgriTech', 'Blockchain'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15c?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15c?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-08T06:20:00.000Z'
  },
  {
    _id: 'demo-south-africa-tour',
    title: 'Team India set for South Africa tour with fresh pace duo debut',
    slug: 'india-south-africa-tour-preview',
    category: 'Sports',
    author: 'Cricket Desk',
    content:
      '<p>Selectors named rookies Vidit Tyagi and Samar Gill in the ODI squad for the South Africa tour, citing their left-arm pace options. Rohit Sharma said the team will rotate seamers across the six-match white-ball leg to manage workloads.</p><p>Coach Rahul Dravid added that data analysts have simulated Centurion and Paarl conditions to prep batters for extra bounce.</p>',
    metaDescription: 'Two uncapped pacers drafted for India’s South Africa tour.',
    keywords: ['Cricket', 'South Africa Tour', 'Rohit Sharma'],
    tags: ['Sports', 'Cricket'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d1?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-07T09:30:00.000Z'
  },
  {
    _id: 'demo-beyond-visual-drones',
    title: 'DGCA clears beyond-visual drone deliveries for lifesaving meds',
    slug: 'dgca-bvlos-med-drone',
    category: 'Technology',
    author: 'Aviation Desk',
    content:
      '<p>India’s aviation regulator granted BVLOS (beyond visual line of sight) exemptions to three drone operators delivering temperature-sensitive medicines in Karnataka and Rajasthan. Routes will connect district hospitals to PHCs within a 40 km radius.</p><p>The exemptions demand redundant parachutes, ADS-B receivers, and geo-fencing baked into flight plans.</p>',
    metaDescription: 'BVLOS drones cleared for medicine deliveries in rural India.',
    keywords: ['BVLOS', 'Drones', 'DGCA'],
    tags: ['HealthTech', 'Aviation'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=600&fit=crop',
    publishedAt: '2025-11-06T07:55:00.000Z'
  }
];

export default demoArticles;


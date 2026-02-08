export const portfolioProjectsData = [
  // ============ ENTERPRISE (3) ============
  {
    title: 'MediConnect Pro',
    slug: 'mediconnect-pro',
    tagline: 'Transforming Patient Care with Unified Healthcare Management',
    description:
      'A comprehensive cloud-based healthcare management platform that unifies patient records, appointment scheduling, and clinic operations across 50+ locations with real-time data synchronization.',
    client: {
      name: 'HealthFirst India',
      industry: 'HealthTech',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/healthcare-infographic-template_23-2148370836.jpg?w=740',
    images: [],
    category: 'enterprise' as const,
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    challenge:
      'Managing patient records across 50+ clinics with paper-based systems causing delays and errors. Critical medical information was siloed, leading to duplicate tests, missed follow-ups, and frustrated patients waiting in long queues.',
    solution:
      'Built a unified cloud-based platform with real-time sync, role-based access, and automated appointment scheduling. The system features a centralized patient database with instant search, digital prescriptions, and an integrated billing module that reduced manual data entry by 80%.',
    results: [
      {
        metric: 'Admin Time Reduction',
        value: '60%',
        description: 'Reduced administrative overhead from 6 hours to 2.4 hours daily',
      },
      {
        metric: 'Patient Satisfaction',
        value: '94%',
        description: 'Up from 72% before implementation',
      },
      {
        metric: 'Clinics Onboarded',
        value: '50+',
        description: 'Across 3 states in 4 months',
      },
    ],
    duration: '4 months',
    teamSize: 6,
    testimonial: {
      quote:
        'MediConnect Pro transformed how we operate. What used to take hours now happens in seconds.',
      author: 'Dr. Rajesh Kumar',
      position: 'CTO, HealthFirst India',
    },
    featured: true,
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: 'FinSecure Dashboard',
    slug: 'finsecure-dashboard',
    tagline: 'Real-Time Financial Intelligence at Your Fingertips',
    description:
      'A powerful real-time analytics dashboard aggregating data from 12 financial APIs into a unified interface with automated compliance reporting and risk assessment algorithms.',
    client: {
      name: 'FinSecure Capital',
      industry: 'FinTech',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/dashboard-admin-panel-with-flat-design_23-2147875438.jpg?w=740',
    images: [],
    category: 'enterprise' as const,
    tags: ['React', 'Python', 'Redis', 'Docker', 'Kubernetes'],
    challenge:
      'Financial analysts spent hours compiling reports from multiple data sources, with no real-time visibility into portfolio performance. Manual processes introduced errors and delayed critical investment decisions during volatile market conditions.',
    solution:
      'Created a real-time analytics dashboard aggregating data from 12 financial APIs with automated compliance reporting and risk assessment algorithms. Redis-backed caching ensures sub-second data refreshes, while Kubernetes orchestration provides the high availability required for financial operations.',
    results: [
      {
        metric: 'System Uptime',
        value: '99.9%',
        description: 'Zero unplanned downtime in 18 months',
      },
      {
        metric: 'Report Generation',
        value: '10x faster',
        description: 'From 4 hours to 25 minutes',
      },
      {
        metric: 'Data Sources',
        value: '12',
        description: 'APIs integrated into unified dashboard',
      },
    ],
    duration: '5 months',
    teamSize: 5,
    testimonial: {
      quote:
        'This dashboard gives us a competitive edge. The real-time insights have directly impacted our decision-making speed.',
      author: 'Vikram Malhotra',
      position: 'VP Engineering, FinSecure Capital',
    },
    featured: true,
    displayOrder: 2,
    isPublished: true,
  },
  {
    title: 'CyberShield Audit Platform',
    slug: 'cybershield-audit',
    tagline: 'Enterprise Security Monitoring & Compliance Made Simple',
    description:
      'An enterprise-grade security audit platform with vulnerability scanning visualization, compliance tracking across ISO/SOC2/GDPR, and automated remediation workflows for security teams.',
    client: {
      name: 'CyberShield Security',
      industry: 'Cybersecurity',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/business-development-dashboard-charts-template_52683-24176.jpg?w=740',
    images: [],
    category: 'enterprise' as const,
    tags: ['React', 'Go', 'PostgreSQL', 'ElasticSearch', 'Docker'],
    challenge:
      'Security teams managing audits for 200+ enterprise clients used spreadsheets to track vulnerabilities and compliance status. Reports took days to compile, and critical vulnerabilities were sometimes missed in the noise of manual tracking.',
    solution:
      'Built a centralized audit platform with real-time vulnerability scanning dashboards, automated compliance checks against ISO 27001, SOC2, and GDPR frameworks, and one-click report generation. ElasticSearch powers instant search across millions of security events.',
    results: [
      {
        metric: 'Audit Time',
        value: '-70%',
        description: 'Average audit completion reduced from 2 weeks to 4 days',
      },
      {
        metric: 'Clients Managed',
        value: '200+',
        description: 'Enterprise clients on the platform',
      },
      {
        metric: 'Compliance Score',
        value: '98%',
        description: 'Average client compliance score achieved',
      },
    ],
    duration: '6 months',
    teamSize: 6,
    testimonial: {
      quote:
        'CyberShield Audit Platform cut our audit timelines by 70%. Our clients now get real-time visibility into their security posture.',
      author: 'Manish Kumar',
      position: 'CEO, CyberShield Security',
    },
    featured: false,
    displayOrder: 3,
    isPublished: true,
  },

  // ============ E-COMMERCE (3) ============
  {
    title: 'ShopSphere',
    slug: 'shopsphere',
    tagline: 'Mobile-First Shopping Experience, Reimagined',
    description:
      'A cross-platform e-commerce application with AI-powered search, personalized product recommendations, and one-tap checkout that transformed mobile conversion rates from 1.2% to 4.8%.',
    client: {
      name: 'RetailMax',
      industry: 'E-commerce',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34862.jpg?w=740',
    images: [],
    category: 'ecommerce' as const,
    tags: ['Flutter', 'Firebase', 'Stripe', 'Algolia', 'Node.js'],
    challenge:
      "RetailMax's existing e-commerce platform had poor mobile conversion rates and slow search, losing customers to competitors. The outdated interface and clunky checkout process resulted in a cart abandonment rate exceeding 75%.",
    solution:
      'Developed a cross-platform mobile-first shopping experience with AI-powered search, personalized recommendations, and one-tap checkout. Algolia integration delivers sub-100ms search results, while Firebase handles real-time inventory updates and push notifications for price drops.',
    results: [
      {
        metric: 'Sales Increase',
        value: '200%',
        description: 'Within first 6 months of launch',
      },
      {
        metric: 'Mobile Conversion',
        value: '4.8%',
        description: 'Up from 1.2% on previous platform',
      },
      {
        metric: 'Average Order Value',
        value: '+35%',
        description: 'Through personalized recommendations',
      },
    ],
    duration: '5 months',
    teamSize: 7,
    testimonial: {
      quote:
        "ShopSphere didn't just meet our expectations\u2014it redefined what we thought was possible for our business.",
      author: 'Anita Desai',
      position: 'CEO, RetailMax',
    },
    featured: true,
    displayOrder: 4,
    isPublished: true,
  },
  {
    title: 'StyleHub Fashion',
    slug: 'stylehub-fashion',
    tagline: 'Where Fashion Meets AI-Powered Personalization',
    description:
      'A fashion e-commerce platform with AI-driven size recommendations, virtual try-on capabilities, and influencer collaboration tools that helped StyleHub capture the premium fashion market online.',
    client: {
      name: 'StyleHub Fashion',
      industry: 'Fashion Retail',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/flat-design-online-grocery-store-app-template_23-2150104122.jpg?w=740',
    images: [],
    category: 'ecommerce' as const,
    tags: ['Next.js', 'Python', 'TensorFlow', 'Stripe', 'AWS'],
    challenge:
      'High return rates of 35% plagued StyleHub due to sizing issues. The brand lacked online presence and was losing market share to D2C competitors with better digital experiences and personalized shopping journeys.',
    solution:
      'Built a fashion-focused e-commerce platform with ML-powered size recommendation engine trained on 50K+ body measurements, AR virtual try-on using TensorFlow, and an influencer marketplace for collaboration campaigns. Smart filters help shoppers discover styles by body type, occasion, and budget.',
    results: [
      {
        metric: 'Return Rate',
        value: '-60%',
        description: 'Returns dropped from 35% to 14% with AI sizing',
      },
      {
        metric: 'Online Revenue',
        value: '₹2.5Cr',
        description: 'First year online revenue from zero digital presence',
      },
      {
        metric: 'Influencer Campaigns',
        value: '150+',
        description: 'Collaborations through the built-in marketplace',
      },
    ],
    duration: '5 months',
    teamSize: 6,
    testimonial: {
      quote:
        'The AI sizing feature alone saved us crores in return logistics. Our online brand is now stronger than our physical stores.',
      author: 'Pooja Verma',
      position: 'Founder, StyleHub Fashion',
    },
    featured: false,
    displayOrder: 5,
    isPublished: true,
  },
  {
    title: 'ArtisanCraft Marketplace',
    slug: 'artisancraft-marketplace',
    tagline: 'Empowering Artisans with a Global Digital Storefront',
    description:
      'An online marketplace connecting handmade craft artisans directly with global buyers, featuring storytelling-focused product pages, quality verification, and seller analytics dashboards.',
    client: {
      name: 'ArtisanCraft',
      industry: 'Handmade Goods',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/modern-dashboard-admin-panel-with-gradient-style_23-2147872799.jpg?w=740',
    images: [],
    category: 'ecommerce' as const,
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Cloudinary', 'Razorpay'],
    challenge:
      'Rural artisans had no digital presence and were dependent on middlemen who took 40-60% margins. The existing craft marketplaces were generic and didn\'t tell the story behind handmade products, resulting in low perceived value.',
    solution:
      'Created a storytelling-first marketplace where each product features the artisan\'s journey, making process videos, and origin story. Built-in quality verification badges, a seller dashboard with inventory and earnings tracking, and Cloudinary-powered image optimization for beautiful product photography.',
    results: [
      {
        metric: 'Artisan Earnings',
        value: '+180%',
        description: 'Average artisan income nearly tripled by removing middlemen',
      },
      {
        metric: 'Active Sellers',
        value: '500+',
        description: 'Artisans onboarded across 12 states',
      },
      {
        metric: 'Repeat Buyers',
        value: '45%',
        description: 'Customer repeat purchase rate driven by storytelling',
      },
    ],
    duration: '4 months',
    teamSize: 5,
    testimonial: {
      quote:
        'For the first time, our artisans can tell their own story and earn what they deserve. This platform changed lives in our community.',
      author: 'Meera Nair',
      position: 'Director, ArtisanCraft',
    },
    featured: false,
    displayOrder: 6,
    isPublished: true,
  },

  // ============ SAAS (3) ============
  {
    title: 'EduLearn Platform',
    slug: 'edulearn-platform',
    tagline: 'Where Learning Meets Technology at Scale',
    description:
      'A full-featured learning management system with live video classes, interactive assessments, AI-driven learning paths, and analytics dashboards serving 5,000+ active students.',
    client: {
      name: 'EduLearn Academy',
      industry: 'EdTech',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap-online-education-platform-e-learning-platform-online-teaching-concept_335657-795.jpg?w=740',
    images: [],
    category: 'saas' as const,
    tags: ['Next.js', 'GraphQL', 'MongoDB', 'Redis', 'WebRTC'],
    challenge:
      "Traditional classroom model couldn't scale. Students needed interactive, self-paced learning with real-time collaboration and progress tracking. Existing tools were fragmented, forcing instructors to juggle multiple platforms for content delivery, assessments, and communication.",
    solution:
      'Built a comprehensive LMS with live video classes via WebRTC, interactive quizzes with instant feedback, AI-driven learning paths that adapt to student performance, and detailed analytics dashboards for instructors. GraphQL enables flexible data fetching for the complex course catalog and student progress views.',
    results: [
      {
        metric: 'Active Students',
        value: '5,000+',
        description: 'Within 8 months of platform launch',
      },
      {
        metric: 'Course Completion',
        value: '78%',
        description: 'Industry average is 15% for online courses',
      },
      {
        metric: 'Instructor Revenue',
        value: '3x',
        description: 'Average instructor earnings tripled',
      },
    ],
    duration: '6 months',
    teamSize: 8,
    testimonial: {
      quote:
        'The platform exceeded every metric we set. Our instructors and students love it equally.',
      author: 'Meera Krishnan',
      position: 'Founder, EduLearn Academy',
    },
    featured: true,
    displayOrder: 7,
    isPublished: true,
  },
  {
    title: 'LogiTrack Pro',
    slug: 'logitrack-pro',
    tagline: 'Data-Driven Logistics for the Modern Fleet',
    description:
      'An IoT-integrated fleet management SaaS with real-time GPS tracking, automated delivery notifications, predictive maintenance alerts, and intelligent route optimization serving 500+ vehicles.',
    client: {
      name: 'FastShip Logistics',
      industry: 'Supply Chain',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/customer-using-mobile-app-tracking-order-delivery-human-hand-with-smartphone-courier-van-street-with-map-pointer-vector-illustration-gps-logistics-service-concept_74855-12166.jpg?w=740',
    images: [],
    category: 'saas' as const,
    tags: ['Angular', '.NET', 'Azure', 'IoT', 'PostgreSQL'],
    challenge:
      'Manual fleet tracking and paper-based delivery confirmations caused delays, lost packages, and poor customer communication. Dispatchers had no real-time visibility into driver locations, and maintenance issues went undetected until vehicles broke down on route.',
    solution:
      'IoT-integrated fleet management system with real-time GPS tracking, automated delivery notifications, predictive maintenance alerts, and route optimization. Azure IoT Hub processes telemetry from vehicle sensors, while the .NET backend runs predictive models that flag maintenance needs before failures occur.',
    results: [
      {
        metric: 'Delivery Efficiency',
        value: '+30%',
        description: 'Overall delivery efficiency improvement',
      },
      {
        metric: 'Fuel Costs',
        value: '-18%',
        description: 'Through optimized route planning',
      },
      {
        metric: 'Customer Complaints',
        value: '-65%',
        description: 'Due to real-time tracking visibility',
      },
    ],
    duration: '6 months',
    teamSize: 7,
    testimonial: {
      quote:
        'LogiTrack Pro gave us visibility we never had before. Our logistics operations are now data-driven.',
      author: 'Arun Khanna',
      position: 'CTO, FastShip Logistics',
    },
    featured: false,
    displayOrder: 8,
    isPublished: true,
  },
  {
    title: 'HRConnect Suite',
    slug: 'hrconnect-suite',
    tagline: 'Modern HR Management for Growing Teams',
    description:
      'A comprehensive HR SaaS platform with recruitment pipeline management, employee onboarding automation, performance reviews, payroll integration, and leave management for mid-size companies.',
    client: {
      name: 'PeopleFirst HR',
      industry: 'HR Technology',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/hr-human-resources-recruitment-management-concept-template-banner-flyer-with-isometric-style-vector_82472-744.jpg?w=740',
    images: [],
    category: 'saas' as const,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    challenge:
      'Mid-size companies (50-500 employees) were stuck between expensive enterprise HR systems and basic spreadsheets. Recruitment tracking, onboarding, leave management, and performance reviews all lived in separate tools with no integration or automation.',
    solution:
      'Built an all-in-one HR platform with ATS-style recruitment pipeline, automated onboarding workflows with document e-signing, 360-degree performance review cycles, and integrated leave/attendance management. Real-time dashboards give HR teams complete workforce visibility.',
    results: [
      {
        metric: 'Onboarding Time',
        value: '-75%',
        description: 'New hire onboarding reduced from 2 weeks to 3 days',
      },
      {
        metric: 'Companies Using',
        value: '120+',
        description: 'Paying customers within first year',
      },
      {
        metric: 'HR Efficiency',
        value: '+50%',
        description: 'Time saved on repetitive HR tasks',
      },
    ],
    duration: '5 months',
    teamSize: 6,
    testimonial: {
      quote:
        'HRConnect replaced 4 different tools we were using. One platform for everything HR\u2014our team productivity has never been higher.',
      author: 'Deepa Menon',
      position: 'CEO, PeopleFirst HR',
    },
    featured: false,
    displayOrder: 9,
    isPublished: true,
  },

  // ============ MOBILE APP (3) ============
  {
    title: 'FoodHub',
    slug: 'foodhub',
    tagline: 'Hyper-Local Food Delivery, Done Right',
    description:
      'A hyper-local delivery app with real-time order tracking, dynamic pricing, restaurant analytics, and AI-powered route optimization processing 15K+ daily orders across 5 cities.',
    client: {
      name: 'QuickBite',
      industry: 'Food & Delivery',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/onboarding-screens-food-delivery-app_23-2148558743.jpg?w=740',
    images: [],
    category: 'mobile_app' as const,
    tags: ['React Native', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    challenge:
      'QuickBite needed to compete with established food delivery apps while offering a unique value proposition for local restaurants. Existing platforms charged high commissions and provided little data back to restaurant owners.',
    solution:
      'Built a hyper-local delivery app with real-time order tracking via Socket.io, dynamic surge pricing, a dedicated restaurant analytics portal, and an AI-powered delivery route optimization system that reduces delivery times and fuel costs simultaneously.',
    results: [
      {
        metric: 'Daily Orders',
        value: '15K+',
        description: 'Average daily orders within 12 months',
      },
      {
        metric: 'Delivery Time',
        value: '-22%',
        description: 'Average delivery time reduced by 22%',
      },
      {
        metric: 'Restaurant Partners',
        value: '800+',
        description: 'Onboarded across 5 cities',
      },
    ],
    duration: '4 months',
    teamSize: 6,
    testimonial: {
      quote:
        'FoodHub leveled the playing field for us. We are now competing with the big players on technology.',
      author: 'Suresh Patel',
      position: 'COO, QuickBite',
    },
    featured: true,
    displayOrder: 10,
    isPublished: true,
  },
  {
    title: 'FitLife Tracker',
    slug: 'fitlife-tracker',
    tagline: 'Fitness, Personalized for Indian Lifestyles',
    description:
      'A culturally-aware fitness app with ML-powered exercise form detection, personalized meal plans featuring regional Indian cuisines, and social fitness challenges with 100K+ monthly active users.',
    client: {
      name: 'WellnessFirst',
      industry: 'Health & Fitness',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/workout-tracker-app-interface_23-2148653680.jpg?w=740',
    images: [],
    category: 'mobile_app' as const,
    tags: ['Flutter', 'Firebase', 'ML Kit', 'Node.js', 'TensorFlow Lite'],
    challenge:
      "Generic fitness apps didn't cater to Indian dietary preferences and exercise routines, resulting in low engagement and retention. Users found irrelevant Western meal suggestions and abandoned apps within the first week.",
    solution:
      'Culturally-aware fitness app with ML-powered exercise form detection using TensorFlow Lite running on-device, personalized meal plans featuring 500+ regional Indian recipes, and social challenges with community leaderboards. Firebase handles user profiles, social feeds, and real-time challenge updates.',
    results: [
      {
        metric: 'Active Users',
        value: '100K+',
        description: 'Monthly active users within first year',
      },
      {
        metric: 'User Retention',
        value: '62%',
        description: '30-day retention rate, 3x industry average',
      },
      {
        metric: 'Workout Accuracy',
        value: '95%',
        description: 'ML model accuracy for exercise form detection',
      },
    ],
    duration: '4 months',
    teamSize: 5,
    testimonial: {
      quote:
        'FitLife Tracker understands our users in a way no international app does. The cultural customization was key.',
      author: 'Priya Rangan',
      position: 'CEO, WellnessFirst',
    },
    featured: false,
    displayOrder: 11,
    isPublished: true,
  },
  {
    title: 'GreenLeaf Organics',
    slug: 'greenleaf-organics',
    tagline: 'Farm-to-Door Organic Grocery Delivery',
    description:
      'An organic grocery delivery app connecting consumers directly with certified organic farmers, featuring subscription boxes, farmer profiles with traceability, and real-time delivery tracking.',
    client: {
      name: 'GreenLeaf Organics',
      industry: 'Organic Food',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/smart-home-app-interface_23-2148626237.jpg?w=740',
    images: [],
    category: 'mobile_app' as const,
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Razorpay', 'AWS'],
    challenge:
      'Consumers wanted organic produce but couldn\'t verify authenticity. Existing grocery apps mixed organic with conventional products, and there was no transparency about sourcing. Farmers lacked direct access to urban consumers and lost margins to distributors.',
    solution:
      'Built a farm-to-door delivery app with blockchain-verified organic certification badges, detailed farmer profiles showing farm location and practices, customizable weekly subscription boxes, and real-time delivery tracking. An admin dashboard helps farmers manage inventory and track earnings.',
    results: [
      {
        metric: 'Monthly Orders',
        value: '8K+',
        description: 'Active monthly orders within 6 months of launch',
      },
      {
        metric: 'Farmer Income',
        value: '+120%',
        description: 'Average farmer earnings doubled through direct sales',
      },
      {
        metric: 'Subscription Rate',
        value: '68%',
        description: 'Customers on weekly subscription plans',
      },
    ],
    duration: '4 months',
    teamSize: 5,
    testimonial: {
      quote:
        'GreenLeaf connected us directly with conscious consumers. Our farmers finally get the price they deserve for quality organic produce.',
      author: 'Priya Sharma',
      position: 'Founder, GreenLeaf Organics',
    },
    featured: false,
    displayOrder: 12,
    isPublished: true,
  },

  // ============ WEB APP (3) ============
  {
    title: 'PropTech Suite',
    slug: 'proptech-suite',
    tagline: 'Smart Property Management, Simplified',
    description:
      'A unified property management platform with virtual tours, automated tenant screening, maintenance workflows, and integrated payments managing 2,000+ properties across multiple cities.',
    client: {
      name: 'RealEstateHub',
      industry: 'Real Estate',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/real-estate-searching_52683-46407.jpg?w=740',
    images: [],
    category: 'web_app' as const,
    tags: ['Vue.js', 'Django', 'PostgreSQL', 'Elasticsearch', 'AWS'],
    challenge:
      'Property management across multiple locations with fragmented tools for listings, tenant communication, and maintenance tracking. Managers juggled spreadsheets, email threads, and phone calls, leading to missed maintenance requests and delayed rent collection.',
    solution:
      'Unified property management platform with 360° virtual tours, automated tenant screening with credit checks, a maintenance request system with priority queuing, and integrated payment processing. Elasticsearch powers instant property search across thousands of listings.',
    results: [
      {
        metric: 'Listings Managed',
        value: '2,000+',
        description: 'Properties managed through the platform',
      },
      {
        metric: 'Vacancy Rate',
        value: '-40%',
        description: 'Reduced vacancy periods significantly',
      },
      {
        metric: 'Maintenance Response',
        value: '4hrs',
        description: 'Average response time, down from 48hrs',
      },
    ],
    duration: '5 months',
    teamSize: 5,
    testimonial: {
      quote:
        'PropTech Suite consolidated everything into one place. Our property managers are 3x more productive.',
      author: 'Nisha Agarwal',
      position: 'Director, RealEstateHub',
    },
    featured: false,
    displayOrder: 13,
    isPublished: true,
  },
  {
    title: 'CloudNine Travel',
    slug: 'cloudnine-travel',
    tagline: 'Experiential Travel Planning & Booking Platform',
    description:
      'A travel booking platform focused on experiential travel in India with an AI-powered itinerary builder, local guide marketplace, and seamless booking management with multi-currency payments.',
    client: {
      name: 'CloudNine Travel',
      industry: 'Travel & Tourism',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/travel-booking-app-design_23-2148612820.jpg?w=740',
    images: [],
    category: 'web_app' as const,
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Google Maps API'],
    challenge:
      'Travelers seeking authentic Indian experiences couldn\'t find curated local experiences online. Generic travel platforms focused on hotel bookings but ignored experiential activities like cooking classes, heritage walks, and village stays that tourists increasingly demanded.',
    solution:
      'Built an experiential travel platform with an AI-powered itinerary builder that combines flights, stays, and local experiences. A vetted local guide marketplace lets travelers book authentic experiences, while Google Maps integration provides visual trip planning. Multi-currency payment support handles international bookings seamlessly.',
    results: [
      {
        metric: 'Bookings',
        value: '3,500+',
        description: 'Experiential bookings in first year',
      },
      {
        metric: 'Local Guides',
        value: '200+',
        description: 'Verified local guides across 25 cities',
      },
      {
        metric: 'Customer Rating',
        value: '4.8/5',
        description: 'Average experience rating from travelers',
      },
    ],
    duration: '5 months',
    teamSize: 6,
    testimonial: {
      quote:
        'CloudNine finally made it easy to discover the real India. Our bookings exceeded projections by 3x in the first quarter.',
      author: 'Rohan Deshmukh',
      position: 'CEO, CloudNine Travel',
    },
    featured: false,
    displayOrder: 14,
    isPublished: true,
  },
  {
    title: 'MediaBuzz Analytics',
    slug: 'mediabuzz-analytics',
    tagline: 'Social Media Intelligence for Influencer Marketing',
    description:
      'A social media analytics web app aggregating data from Instagram, YouTube, and Twitter for influencer campaign management with real-time dashboards and automated ROI reporting.',
    client: {
      name: 'MediaBuzz',
      industry: 'Digital Marketing',
    },
    thumbnail:
      'https://img.freepik.com/free-vector/ui-ux-analytics-dashboard-isometric-landing-page_107791-1359.jpg?w=740',
    images: [],
    category: 'web_app' as const,
    tags: ['React', 'Python', 'PostgreSQL', 'Redis', 'Chart.js'],
    challenge:
      'Brands running influencer campaigns across multiple platforms had no unified view of performance. Teams manually pulled data from Instagram, YouTube, and Twitter into spreadsheets, making real-time campaign optimization impossible and ROI reporting a monthly ordeal.',
    solution:
      'Built a unified analytics dashboard that aggregates social media data via official APIs, provides real-time campaign tracking with engagement metrics, automated weekly/monthly PDF reports, and influencer discovery with audience demographics. Redis caching ensures dashboards load in under 2 seconds even with millions of data points.',
    results: [
      {
        metric: 'Campaign ROI',
        value: '+45%',
        description: 'Average improvement in campaign ROI through real-time optimization',
      },
      {
        metric: 'Report Time',
        value: '-90%',
        description: 'From 2 days manual work to automated 1-click generation',
      },
      {
        metric: 'Brands Served',
        value: '80+',
        description: 'Active brand accounts on the platform',
      },
    ],
    duration: '4 months',
    teamSize: 5,
    testimonial: {
      quote:
        'MediaBuzz Analytics turned our influencer campaigns from guesswork into a data-driven science. The automated reporting alone saved us 20 hours a week.',
      author: 'Arjun Kapoor',
      position: 'Founder, MediaBuzz',
    },
    featured: false,
    displayOrder: 15,
    isPublished: true,
  },
]

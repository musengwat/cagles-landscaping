// Mock data in Contentful format for easy CMS migration
import type {
  Service,
  PortfolioProject,
  Testimonial,
  AboutContent,
  ContentfulAsset,
} from "@/types";

// Helper function to create Contentful-style assets
function createAsset(
  id: string,
  url: string,
  title: string,
  description: string,
  width: number = 1200,
  height: number = 800
): ContentfulAsset {
  return {
    sys: { id },
    url,
    title,
    description,
    width,
    height,
    contentType: "image/jpeg",
  };
}

// Services Data
export const services: Service[] = [
  {
    sys: { id: "lawn-care-service" },
    fields: {
      title: "Lawn Care & Maintenance",
      slug: "lawn-care",
      shortDescription:
        "Professional weekly and bi-weekly lawn maintenance to keep your grass healthy and beautiful year-round.",
      fullDescription: `Transform your lawn into the neighborhood's envy with our comprehensive lawn care services. We provide regular mowing, edging, trimming, and seasonal treatments that keep your grass healthy, thick, and vibrant throughout the growing season. Our experienced team understands Northwest Arkansas' unique climate and soil conditions, ensuring your lawn receives the proper care it needs to thrive.

Our lawn maintenance services include precision cutting at optimal heights, clean edge work along walkways and garden beds, and professional trimming around obstacles. We also provide seasonal services like leaf removal, overseeding, and fertilization programs tailored to your lawn's specific needs.`,
      icon: "Scissors",
      processSteps: [
        {
          title: "Property Assessment",
          description:
            "We evaluate your lawn's current condition, grass type, soil quality, and specific maintenance needs.",
        },
        {
          title: "Custom Care Plan",
          description:
            "Based on our assessment, we create a tailored maintenance schedule and treatment plan for optimal results.",
        },
        {
          title: "Regular Service",
          description:
            "Our team provides consistent, reliable service with detailed attention to every aspect of lawn care.",
        },
      ],
      priceRange:
        "Weekly service typically ranges from $40-80 per visit depending on lawn size and complexity",
      faqs: [
        {
          question: "How often should I have my lawn mowed?",
          answer:
            "During growing season (April-October), most lawns benefit from weekly mowing. In peak summer, some fast-growing areas may need twice-weekly service.",
        },
        {
          question: "Do you provide your own equipment?",
          answer:
            "Yes, we bring all professional-grade equipment including mowers, edgers, trimmers, and cleanup tools.",
        },
        {
          question: "What happens if it rains on my scheduled day?",
          answer:
            "We monitor weather closely and will reschedule your service to the next available day when conditions are suitable.",
        },
        {
          question: "Do you offer fertilization and weed control?",
          answer:
            "Yes, we provide comprehensive lawn treatment programs including fertilization, pre-emergent weed control, and spot treatments.",
        },
        {
          question: "Can you work around my schedule?",
          answer:
            "We offer flexible scheduling and can work around your preferences. Most clients prefer consistent weekly service on the same day.",
        },
      ],
      featuredImage: createAsset(
        "lawn-care-hero",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop",
        "Professional Lawn Mowing Service",
        "Beautifully maintained lawn with precise mowing and edging in Fayetteville, AR"
      ),
      galleryImages: [
        createAsset(
          "lawn-before-1",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Before: Overgrown Lawn",
          "Lawn before professional maintenance"
        ),
        createAsset(
          "lawn-after-1",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          "After: Pristine Lawn Care",
          "Same lawn after professional maintenance"
        ),
        createAsset(
          "lawn-care-2",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Edging Work",
          "Precise edge work along walkways"
        ),
        createAsset(
          "lawn-care-3",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lawn Striping",
          "Professional lawn striping patterns"
        ),
        createAsset(
          "lawn-care-4",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Trimming",
          "Detail trimming around trees and beds"
        ),
        createAsset(
          "lawn-care-5",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Seasonal Cleanup",
          "Fall leaf removal and cleanup"
        ),
      ],
      seo: {
        title:
          "Professional Lawn Care Services in Fayetteville, AR | Cagle's Landscaping",
        description:
          "Expert lawn maintenance, mowing, and care services in Fayetteville and Northwest Arkansas. Weekly service, fertilization, and seasonal treatments. Call (520) 358-2221.",
        keywords: [
          "lawn care fayetteville ar",
          "lawn mowing northwest arkansas",
          "grass cutting fayetteville",
          "lawn maintenance springdale",
          "yard service bentonville",
        ],
      },
    },
  },
  {
    sys: { id: "landscape-design-service" },
    fields: {
      title: "Landscape Design & Installation",
      slug: "landscape-design",
      shortDescription:
        "Custom landscape design and installation services to create beautiful, functional outdoor spaces that reflect your style.",
      fullDescription: `Bring your vision to life with our professional landscape design and installation services. We specialize in creating stunning outdoor environments that enhance your property's beauty while providing functional living spaces for your family to enjoy. From initial concept to final installation, our team works closely with you to design landscapes that complement your home's architecture and reflect your personal style.

Our design process includes site analysis, soil testing, drainage evaluation, and careful plant selection suited to Arkansas' climate. We create detailed plans that consider maintenance requirements, seasonal interest, and long-term growth patterns. Our installation team ensures every element is properly placed and established for lasting success.`,
      icon: "TreePine",
      processSteps: [
        {
          title: "Design Consultation",
          description:
            "We meet with you to discuss your vision, assess your property, and understand your lifestyle needs and preferences.",
        },
        {
          title: "Detailed Planning",
          description:
            "Our team creates comprehensive design plans including plant selections, hardscape elements, and installation timeline.",
        },
        {
          title: "Professional Installation",
          description:
            "We bring your landscape to life with expert installation, proper plant establishment, and attention to every detail.",
        },
      ],
      priceRange:
        "Design projects typically range from $3,000-15,000 depending on scope and materials",
      faqs: [
        {
          question: "How long does the design process take?",
          answer:
            "Initial designs typically take 2-3 weeks. Complex projects may require additional time for permitting or special materials.",
        },
        {
          question: "Do you provide a guarantee on plants?",
          answer:
            "Yes, we provide a one-year guarantee on all plants installed with proper maintenance guidelines followed.",
        },
        {
          question: "Can you work with my existing landscape?",
          answer:
            "Absolutely! We can incorporate existing healthy plants and features into new designs to maximize your investment.",
        },
        {
          question: "Do you handle permits for landscape projects?",
          answer:
            "We assist with permit applications when required and ensure all work meets local codes and regulations.",
        },
        {
          question: "What's the best time of year for landscape installation?",
          answer:
            "Spring and fall are ideal for most plantings in Arkansas. We can advise on optimal timing for your specific project.",
        },
      ],
      featuredImage: createAsset(
        "landscape-design-hero",
        "https://images.unsplash.com/photo-1696237583261-029171ee31fa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Beautiful Landscape Design",
        "Custom landscape design with native plants and modern hardscaping"
      ),
      galleryImages: [
        createAsset(
          "design-1",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          "Modern Landscape Design",
          "Contemporary landscape with architectural plants"
        ),
        createAsset(
          "design-2",
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop",
          "Garden Design",
          "Colorful perennial garden design"
        ),
        createAsset(
          "design-3",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Native Plant Design",
          "Arkansas native plant landscape"
        ),
        createAsset(
          "design-4",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Shade Garden",
          "Elegant shade garden design"
        ),
        createAsset(
          "design-5",
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop",
          "Front Yard Design",
          "Welcoming front yard landscape"
        ),
        createAsset(
          "design-6",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          "Backyard Retreat",
          "Private backyard sanctuary design"
        ),
      ],
      seo: {
        title:
          "Landscape Design Services in Fayetteville, AR | Custom Outdoor Designs",
        description:
          "Professional landscape design and installation in Fayetteville, Northwest Arkansas. Custom outdoor spaces, native plants, modern designs. Free consultations available.",
        keywords: [
          "landscape design fayetteville ar",
          "garden design northwest arkansas",
          "landscape architect fayetteville",
          "outdoor design springdale",
          "landscape installation bentonville",
        ],
      },
    },
  },
  {
    sys: { id: "hardscaping-service" },
    fields: {
      title: "Hardscaping & Patios",
      slug: "hardscaping",
      shortDescription:
        "Professional hardscaping services including patios, walkways, retaining walls, and outdoor living spaces.",
      fullDescription: `Enhance your outdoor living experience with our expert hardscaping services. We specialize in creating durable, beautiful hardscape features that add both function and value to your property. From intimate patios to expansive outdoor entertainment areas, our skilled craftsmen use quality materials and proven techniques to build features that will last for decades.

Our hardscaping services include natural stone patios, paver installations, retaining walls, outdoor fireplaces, walkways, and complete outdoor kitchen installations. We work with a variety of materials including natural stone, pavers, brick, and concrete to create the perfect look for your space. Each project is designed to complement your home's architecture while meeting your specific functional needs.`,
      icon: "Mountain",
      processSteps: [
        {
          title: "Site Evaluation",
          description:
            "We assess drainage, soil conditions, and existing features to design the most suitable hardscape solution.",
        },
        {
          title: "Design & Material Selection",
          description:
            "We create detailed plans and help you select materials that match your style, budget, and durability requirements.",
        },
        {
          title: "Expert Construction",
          description:
            "Our experienced team handles all aspects of construction with attention to proper drainage, base preparation, and finishing details.",
        },
      ],
      priceRange:
        "Hardscaping projects typically range from $2,500-25,000 depending on size and materials",
      faqs: [
        {
          question: "How long will my patio or hardscape last?",
          answer:
            "With proper installation and materials, hardscaping features typically last 20-30 years or more with minimal maintenance.",
        },
        {
          question: "What materials do you recommend for Arkansas weather?",
          answer:
            "We recommend materials like natural stone, concrete pavers, and brick that handle freeze-thaw cycles well and resist Arkansas' climate extremes.",
        },
        {
          question: "Do you handle drainage issues?",
          answer:
            "Yes, proper drainage is crucial for hardscaping longevity. We incorporate drainage solutions into every project design.",
        },
        {
          question: "Can you add features to existing patios?",
          answer:
            "In many cases, yes. We can often integrate new features with existing hardscaping or suggest modifications to create a cohesive design.",
        },
        {
          question: "Do you provide maintenance for hardscaping?",
          answer:
            "We offer maintenance services including cleaning, sealing, re-leveling pavers, and addressing any settling issues.",
        },
      ],
      featuredImage: createAsset(
        "hardscaping-hero",
        "https://images.unsplash.com/photo-1713383658782-60a9593d200e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Beautiful Stone Patio",
        "Custom natural stone patio with outdoor seating area"
      ),
      galleryImages: [
        createAsset(
          "hardscape-1",
          "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Stone Patio",
          "Natural stone patio installation"
        ),
        createAsset(
          "hardscape-2",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
          "Paver Walkway",
          "Elegant paver walkway design"
        ),
        createAsset(
          "hardscape-3",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
          "Retaining Wall",
          "Decorative retaining wall construction"
        ),
        createAsset(
          "hardscape-4",
          "https://images.unsplash.com/photo-1713383658782-60a9593d200e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Outdoor Kitchen",
          "Complete outdoor kitchen installation"
        ),
        createAsset(
          "hardscape-5",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
          "Fire Feature",
          "Custom fire pit with seating wall"
        ),
        createAsset(
          "hardscape-6",
          "https://images.unsplash.com/photo-1713383658782-60a9593d200e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Steps & Entrance",
          "Natural stone steps and entrance"
        ),
      ],
      seo: {
        title:
          "Hardscaping & Patio Installation in Fayetteville, AR | Stone Patios & Walkways",
        description:
          "Professional hardscaping services in Fayetteville, AR. Custom patios, walkways, retaining walls, outdoor kitchens. Quality stone and paver installation.",
        keywords: [
          "hardscaping fayetteville ar",
          "patio installation northwest arkansas",
          "stone patio fayetteville",
          "retaining walls springdale",
          "outdoor kitchen bentonville",
        ],
      },
    },
  },
  {
    sys: { id: "seasonal-cleanup-service" },
    fields: {
      title: "Seasonal Cleanup & Maintenance",
      slug: "seasonal-cleanup",
      shortDescription:
        "Comprehensive spring and fall cleanup services to prepare your landscape for changing seasons.",
      fullDescription: `Keep your landscape healthy and beautiful year-round with our comprehensive seasonal cleanup services. We provide thorough spring preparation and fall cleanup services designed to protect your plants, maintain your outdoor spaces, and prepare your landscape for the changing seasons. Our detailed approach ensures your property looks its best while promoting plant health and preventing seasonal damage.

Spring services include bed cleanup, pruning, mulching, debris removal, and preparation for the growing season. Fall services focus on leaf removal, plant protection, winterization, and preparing your landscape for dormancy. We also provide year-round maintenance including storm damage cleanup and ongoing seasonal care.`,
      icon: "Leaf",
      processSteps: [
        {
          title: "Seasonal Assessment",
          description:
            "We evaluate your landscape's current condition and identify specific seasonal maintenance needs.",
        },
        {
          title: "Comprehensive Cleanup",
          description:
            "Our team performs thorough cleanup including debris removal, bed clearing, and plant care.",
        },
        {
          title: "Seasonal Preparation",
          description:
            "We prepare your landscape for the coming season with appropriate treatments and protection measures.",
        },
      ],
      priceRange:
        "Seasonal cleanup typically ranges from $200-800 depending on property size and scope",
      faqs: [
        {
          question: "When is the best time for spring cleanup?",
          answer:
            "Spring cleanup is typically best in March-April when the risk of hard frost has passed but before new growth begins.",
        },
        {
          question: "What does fall cleanup include?",
          answer:
            "Fall cleanup includes leaf removal, bed clearing, plant protection, pruning dormant plants, and winterization of irrigation systems.",
        },
        {
          question: "Do you remove all the leaves from my property?",
          answer:
            "We remove leaves from lawns, walkways, and beds. Some leaves can be beneficial when left in natural areas.",
        },
        {
          question: "Can you handle storm damage cleanup?",
          answer:
            "Yes, we provide emergency storm damage cleanup including debris removal and basic tree trimming.",
        },
        {
          question: "Do you offer ongoing seasonal maintenance?",
          answer:
            "Yes, we offer seasonal maintenance contracts that include regular cleanups and ongoing care throughout the year.",
        },
      ],
      featuredImage: createAsset(
        "cleanup-hero",
        "https://images.unsplash.com/photo-1734079692160-fcbe4be6ab96?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Fall Cleanup Service",
        "Professional fall cleanup and leaf removal service"
      ),
      galleryImages: [
        createAsset(
          "cleanup-1",
          "https://images.unsplash.com/photo-1634081727680-fa43e3237d5a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Leaf Removal",
          "Comprehensive fall leaf removal"
        ),
        createAsset(
          "cleanup-2",
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop",
          "Bed Cleanup",
          "Spring garden bed preparation"
        ),
        createAsset(
          "cleanup-3",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          "Pruning Work",
          "Professional plant pruning"
        ),
        createAsset(
          "cleanup-4",
          "https://images.unsplash.com/photo-1725334775507-82772a52612a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Mulching",
          "Fresh mulch application"
        ),
        createAsset(
          "cleanup-5",
          "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=600&h=400&fit=crop",
          "Debris Removal",
          "Storm damage cleanup"
        ),
        createAsset(
          "cleanup-6",
          "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=400&fit=crop",
          "Winter Prep",
          "Plant protection for winter"
        ),
      ],
      seo: {
        title:
          "Seasonal Cleanup Services in Fayetteville, AR | Spring & Fall Cleanup",
        description:
          "Professional seasonal cleanup services in Fayetteville and Northwest Arkansas. Spring preparation, fall leaf removal, storm cleanup. Year-round maintenance.",
        keywords: [
          "seasonal cleanup fayetteville ar",
          "fall cleanup northwest arkansas",
          "spring cleanup fayetteville",
          "leaf removal springdale",
          "storm cleanup bentonville",
        ],
      },
    },
  },
  {
    sys: { id: "irrigation-service" },
    fields: {
      title: "Irrigation Systems",
      slug: "irrigation",
      shortDescription:
        "Professional irrigation system design, installation, and maintenance to keep your landscape properly watered.",
      fullDescription: `Ensure your landscape receives optimal watering with our professional irrigation system services. We design, install, and maintain efficient irrigation systems that conserve water while keeping your plants healthy and thriving. Our systems are tailored to Arkansas' climate patterns and your specific landscape needs, incorporating smart technology for maximum efficiency and convenience.

Our irrigation services include complete system design, zone planning based on plant water needs, installation of high-quality components, and ongoing maintenance. We use water-efficient technologies including smart controllers, drip irrigation for garden beds, and rain sensors to minimize water waste while maintaining optimal plant health.`,
      icon: "Droplets",
      processSteps: [
        {
          title: "System Design",
          description:
            "We analyze your landscape, water pressure, and plant needs to design an efficient irrigation system.",
        },
        {
          title: "Professional Installation",
          description:
            "Our certified technicians install your system with minimal disruption to existing landscaping.",
        },
        {
          title: "Testing & Programming",
          description:
            "We test all zones, program controllers, and provide training on system operation and maintenance.",
        },
      ],
      priceRange:
        "Irrigation systems typically range from $1,500-8,000 depending on property size and complexity",
      faqs: [
        {
          question: "How much water will an irrigation system save?",
          answer:
            "Properly designed systems typically use 20-30% less water than manual watering while providing more consistent coverage.",
        },
        {
          question: "Do you offer smart irrigation controllers?",
          answer:
            "Yes, we install smart controllers that adjust watering based on weather data, soil moisture, and plant needs.",
        },
        {
          question: "What maintenance does an irrigation system need?",
          answer:
            "Systems need seasonal startup/shutdown, periodic adjustments, and annual inspections to maintain optimal performance.",
        },
        {
          question: "Can you add irrigation to existing landscapes?",
          answer:
            "Yes, we specialize in retrofitting existing landscapes with minimal disturbance to established plants.",
        },
        {
          question: "Do you provide system repairs?",
          answer:
            "We provide complete repair services including broken heads, valve replacements, controller repairs, and line repairs.",
        },
      ],
      featuredImage: createAsset(
        "irrigation-hero",
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&h=800&fit=crop",
        "Irrigation System Installation",
        "Professional sprinkler system installation and maintenance"
      ),
      galleryImages: [
        createAsset(
          "irrigation-1",
          "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop",
          "Sprinkler Installation",
          "Professional sprinkler head installation"
        ),
        createAsset(
          "irrigation-2",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          "Drip Irrigation",
          "Efficient drip irrigation for garden beds"
        ),
        createAsset(
          "irrigation-3",
          "https://images.unsplash.com/photo-1713383658782-60a9593d200e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Smart Controller",
          "Smart irrigation controller installation"
        ),
        createAsset(
          "irrigation-4",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          "Zone Coverage",
          "Proper irrigation zone coverage"
        ),
        createAsset(
          "irrigation-5",
          "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=400&fit=crop",
          "System Maintenance",
          "Irrigation system maintenance and repair"
        ),
        createAsset(
          "irrigation-6",
          "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop",
          "Water Conservation",
          "Water-efficient irrigation design"
        ),
      ],
      seo: {
        title:
          "Irrigation System Installation in Fayetteville, AR | Sprinkler Systems",
        description:
          "Professional irrigation and sprinkler system installation in Fayetteville, Northwest Arkansas. Smart controllers, water-efficient designs, maintenance services.",
        keywords: [
          "irrigation systems fayetteville ar",
          "sprinkler installation northwest arkansas",
          "smart irrigation fayetteville",
          "drip irrigation springdale",
          "sprinkler repair bentonville",
        ],
      },
    },
  },
  {
    sys: { id: "tree-care-service" },
    fields: {
      title: "Tree & Shrub Care",
      slug: "tree-care",
      shortDescription:
        "Professional tree and shrub care including pruning, health assessments, and pest management.",
      fullDescription: `Protect your valuable trees and shrubs with our comprehensive care services. Our certified arborists provide expert pruning, health assessments, pest and disease management, and preventive care to keep your woody plants healthy and beautiful. We understand the specific needs of trees and shrubs in Arkansas' climate and provide targeted care that promotes long-term health and safety.

Our tree and shrub services include proper pruning techniques, structural assessments, pest identification and treatment, fertilization programs, and emergency tree services. We focus on preventive care that maintains plant health while addressing any issues before they become serious problems.`,
      icon: "Trees",
      processSteps: [
        {
          title: "Plant Assessment",
          description:
            "Our certified arborists evaluate the health, structure, and care needs of your trees and shrubs.",
        },
        {
          title: "Care Plan Development",
          description:
            "We create a customized care plan including pruning schedules, treatments, and preventive measures.",
        },
        {
          title: "Expert Care Services",
          description:
            "Our team provides professional pruning, treatments, and ongoing care to maintain optimal plant health.",
        },
      ],
      priceRange:
        "Tree care services typically range from $150-1,500 depending on size and scope of work",
      faqs: [
        {
          question: "When is the best time to prune trees?",
          answer:
            "Most trees are best pruned during dormancy (late winter/early spring). Some species have specific timing requirements we follow.",
        },
        {
          question: "How often should trees be pruned?",
          answer:
            "Young trees may need annual pruning, while mature trees typically need pruning every 3-5 years depending on species and condition.",
        },
        {
          question: "Do you treat tree diseases and pests?",
          answer:
            "Yes, we identify and treat common tree diseases and pest problems using environmentally responsible methods.",
        },
        {
          question: "Can you remove dangerous tree limbs?",
          answer:
            "We handle hazardous limb removal and can assess trees for safety concerns. Large removals may require specialized equipment.",
        },
        {
          question: "Do you provide emergency tree services?",
          answer:
            "We provide emergency services for storm damage and hazardous situations during business hours and on-call for urgent situations.",
        },
      ],
      featuredImage: createAsset(
        "tree-care-hero",
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&h=800&fit=crop",
        "Professional Tree Care",
        "Expert tree pruning and maintenance services"
      ),
      galleryImages: [
        createAsset(
          "tree-1",
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&h=400&fit=crop",
          "Tree Pruning",
          "Professional tree pruning service"
        ),
        createAsset(
          "tree-2",
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop",
          "Shrub Care",
          "Expert shrub pruning and shaping"
        ),
        createAsset(
          "tree-3",
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&h=400&fit=crop",
          "Tree Health",
          "Tree health assessment and care"
        ),
        createAsset(
          "tree-4",
          "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=600&h=400&fit=crop",
          "Disease Treatment",
          "Tree disease identification and treatment"
        ),
        createAsset(
          "tree-5",
          "https://images.unsplash.com/photo-1713383658782-60a9593d200e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Emergency Service",
          "Emergency tree service and cleanup"
        ),
        createAsset(
          "tree-6",
          "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=400&fit=crop",
          "Plant Care",
          "Comprehensive tree and shrub care"
        ),
      ],
      seo: {
        title:
          "Tree Care Services in Fayetteville, AR | Tree Pruning & Shrub Care",
        description:
          "Professional tree and shrub care in Fayetteville, Northwest Arkansas. Expert pruning, health assessments, disease treatment. Certified arborists.",
        keywords: [
          "tree care fayetteville ar",
          "tree pruning northwest arkansas",
          "shrub care fayetteville",
          "arborist springdale",
          "tree service bentonville",
        ],
      },
    },
  },
];

// Portfolio Projects
export const portfolioProjects: PortfolioProject[] = [
  {
    sys: { id: "modern-backyard-oasis" },
    fields: {
      title: "Modern Backyard Oasis",
      slug: "modern-backyard-oasis",
      location: "Fayetteville",
      category: "residential",
      serviceTypes: ["Landscape Design", "Hardscaping", "Irrigation"],
      description:
        "Complete backyard transformation featuring a natural stone patio, modern planting design, and efficient irrigation system.",
      beforeImage: createAsset(
        "project-1-before",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        "Before: Plain Backyard",
        "Backyard before transformation"
      ),
      afterImage: createAsset(
        "project-1-after",
        "https://images.unsplash.com/photo-1632161293871-cf2083474e34?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "After: Modern Oasis",
        "Beautiful modern backyard with stone patio"
      ),
      completionDate: "2024-06-15",
    },
  },
  {
    sys: { id: "elegant-front-entrance" },
    fields: {
      title: "Elegant Front Entrance",
      slug: "elegant-front-entrance",
      location: "Springdale",
      category: "residential",
      serviceTypes: ["Landscape Design", "Hardscaping"],
      description:
        "Welcoming front yard design with curved walkway, seasonal plantings, and architectural lighting.",
      beforeImage: createAsset(
        "project-2-before",
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
        "Before: Basic Front Yard",
        "Simple front yard before design"
      ),
      afterImage: createAsset(
        "project-2-after",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
        "After: Elegant Entrance",
        "Sophisticated front entrance design"
      ),
      completionDate: "2024-05-20",
    },
  },
  {
    sys: { id: "commercial-office-landscape" },
    fields: {
      title: "Commercial Office Landscape",
      slug: "commercial-office-landscape",
      location: "Bentonville",
      category: "commercial",
      serviceTypes: ["Landscape Design", "Lawn Care", "Irrigation"],
      description:
        "Professional office complex landscaping with low-maintenance plantings and automated irrigation.",
      beforeImage: createAsset(
        "project-3-before",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        "Before: Bare Office Grounds",
        "Office building before landscaping"
      ),
      afterImage: createAsset(
        "project-3-after",
        "https://plus.unsplash.com/premium_photo-1661751889999-762ee67f68fa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "After: Professional Landscape",
        "Beautifully landscaped office complex"
      ),
      completionDate: "2024-04-10",
    },
  },
  {
    sys: { id: "outdoor-entertaining-space" },
    fields: {
      title: "Outdoor Entertaining Space",
      slug: "outdoor-entertaining-space",
      location: "Rogers",
      category: "residential",
      serviceTypes: ["Hardscaping", "Landscape Design"],
      description:
        "Custom outdoor kitchen and seating area with fire feature and privacy landscaping.",
      beforeImage: createAsset(
        "project-4-before",
        "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Before: Empty Patio Area",
        "Basic patio before renovation"
      ),
      afterImage: createAsset(
        "project-4-after",
        "https://plus.unsplash.com/premium_photo-1665657351594-14473b25fe22?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "After: Entertainment Paradise",
        "Complete outdoor entertainment area"
      ),
      completionDate: "2024-07-30",
    },
  },
  {
    sys: { id: "slope-stabilization-project" },
    fields: {
      title: "Slope Stabilization & Design",
      slug: "slope-stabilization-project",
      location: "Fayetteville",
      category: "residential",
      serviceTypes: ["Hardscaping", "Landscape Design"],
      description:
        "Terraced retaining walls with integrated planting to stabilize steep slope and create usable space.",
      beforeImage: createAsset(
        "project-5-before",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "Before: Erosion Problem",
        "Steep slope with erosion issues"
      ),
      afterImage: createAsset(
        "project-5-after",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "After: Terraced Beauty",
        "Beautiful terraced slope with retaining walls"
      ),
      completionDate: "2024-03-25",
    },
  },
  {
    sys: { id: "native-plant-garden" },
    fields: {
      title: "Native Plant Garden",
      slug: "native-plant-garden",
      location: "Springdale",
      category: "residential",
      serviceTypes: ["Landscape Design", "Seasonal Cleanup"],
      description:
        "Sustainable native plant garden designed for year-round interest and wildlife habitat.",
      beforeImage: createAsset(
        "project-6-before",
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
        "Before: Overgrown Area",
        "Overgrown area before native garden"
      ),
      afterImage: createAsset(
        "project-6-after",
        "https://plus.unsplash.com/premium_photo-1665657351594-14473b25fe22?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "After: Native Paradise",
        "Beautiful native plant garden"
      ),
      completionDate: "2024-08-12",
    },
  },
  {
    sys: { id: "water-feature-installation" },
    fields: {
      title: "Water Feature Installation",
      slug: "water-feature-installation",
      location: "Bentonville",
      category: "residential",
      serviceTypes: ["Hardscaping", "Landscape Design"],
      description:
        "Custom water feature with natural stone and surrounding landscape design for tranquil backyard retreat.",
      beforeImage: createAsset(
        "project-7-before",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        "Before: Plain Corner",
        "Corner of yard before water feature"
      ),
      afterImage: createAsset(
        "project-7-after",
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop",
        "After: Tranquil Water Feature",
        "Beautiful water feature installation"
      ),
      completionDate: "2024-06-05",
    },
  },
  {
    sys: { id: "commercial-storm-restoration" },
    fields: {
      title: "Storm Damage Restoration",
      slug: "commercial-storm-restoration",
      location: "Rogers",
      category: "commercial",
      serviceTypes: ["Tree Care", "Seasonal Cleanup", "Landscape Design"],
      description:
        "Complete restoration of commercial property after severe storm damage, including tree replacement and landscape redesign.",
      beforeImage: createAsset(
        "project-8-before",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "Before: Storm Damage",
        "Property after storm damage"
      ),
      afterImage: createAsset(
        "project-8-after",
        "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "After: Full Restoration",
        "Restored commercial landscape"
      ),
      completionDate: "2024-09-18",
    },
  },
  {
    sys: { id: "luxury-estate-grounds" },
    fields: {
      title: "Luxury Estate Grounds",
      slug: "luxury-estate-grounds",
      location: "Fayetteville",
      category: "residential",
      serviceTypes: [
        "Landscape Design",
        "Lawn Care",
        "Irrigation",
        "Tree Care",
      ],
      description:
        "Comprehensive landscape design and maintenance for luxury estate including formal gardens, lawn areas, and mature tree care.",
      beforeImage: createAsset(
        "project-9-before",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        "Before: Undeveloped Grounds",
        "Large property before development"
      ),
      afterImage: createAsset(
        "project-9-after",
        "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "After: Estate Paradise",
        "Magnificent estate landscape"
      ),
      completionDate: "2024-08-28",
    },
  },
  {
    sys: { id: "small-space-garden" },
    fields: {
      title: "Small Space Garden",
      slug: "small-space-garden",
      location: "Springdale",
      category: "residential",
      serviceTypes: ["Landscape Design", "Hardscaping"],
      description:
        "Maximizing a small urban space with vertical elements, efficient design, and multi-functional features.",
      beforeImage: createAsset(
        "project-10-before",
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
        "Before: Cramped Space",
        "Small yard before design"
      ),
      afterImage: createAsset(
        "project-10-after",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
        "After: Efficient Design",
        "Well-designed small space garden"
      ),
      completionDate: "2024-05-14",
    },
  },
  {
    sys: { id: "poolside-landscape" },
    fields: {
      title: "Poolside Landscape",
      slug: "poolside-landscape",
      location: "Bentonville",
      category: "residential",
      serviceTypes: ["Landscape Design", "Hardscaping", "Irrigation"],
      description:
        "Tropical-inspired poolside landscape with privacy screening, entertaining areas, and pool-safe plantings.",
      beforeImage: createAsset(
        "project-11-before",
        "https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Before: Basic Pool Area",
        "Pool area before landscaping"
      ),
      afterImage: createAsset(
        "project-11-after",
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop",
        "After: Resort-Style Oasis",
        "Beautiful poolside landscape"
      ),
      completionDate: "2024-07-08",
    },
  },
  {
    sys: { id: "historic-home-restoration" },
    fields: {
      title: "Historic Home Landscape",
      slug: "historic-home-restoration",
      location: "Fayetteville",
      category: "residential",
      serviceTypes: ["Landscape Design", "Tree Care", "Hardscaping"],
      description:
        "Period-appropriate landscape design for historic home with heritage plantings and traditional hardscape materials.",
      beforeImage: createAsset(
        "project-12-before",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        "Before: Neglected Historic Grounds",
        "Historic home before restoration"
      ),
      afterImage: createAsset(
        "project-12-after",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
        "After: Period Restoration",
        "Beautifully restored historic landscape"
      ),
      completionDate: "2024-04-22",
    },
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    sys: { id: "testimonial-1" },
    fields: {
      clientName: "Sarah & Mike Johnson",
      rating: 5,
      reviewText:
        "Josh and his team completely transformed our backyard into an amazing outdoor living space. The stone patio and fire pit are perfect for entertaining, and the landscape design is absolutely beautiful. They were professional, on time, and the quality of work exceeded our expectations.",
      projectType: "Backyard Hardscaping & Design",
      date: "2024-07-15",
      featured: true,
    },
  },
  {
    sys: { id: "testimonial-2" },
    fields: {
      clientName: "David Rodriguez",
      rating: 5,
      reviewText:
        "We've been using Cagle's for our weekly lawn care for over two years now. They're reliable, detail-oriented, and our lawn has never looked better. Josh always goes above and beyond to make sure everything looks perfect.",
      projectType: "Weekly Lawn Care",
      date: "2024-08-22",
      featured: true,
    },
  },
  {
    sys: { id: "testimonial-3" },
    fields: {
      clientName: "Jennifer Williams",
      rating: 5,
      reviewText:
        "The irrigation system Josh installed has been a game-changer for our large property. Everything stays green and healthy, and we've actually reduced our water usage. The smart controller is incredibly convenient.",
      projectType: "Irrigation System Installation",
      date: "2024-06-30",
      featured: true,
    },
  },
  {
    sys: { id: "testimonial-4" },
    fields: {
      clientName: "Robert & Linda Chen",
      rating: 5,
      reviewText:
        "Josh designed and installed a native plant garden that attracts butterflies and birds while requiring minimal maintenance. His knowledge of Arkansas native plants is impressive, and the garden looks amazing year-round.",
      projectType: "Native Plant Garden Design",
      date: "2024-09-10",
      featured: false,
    },
  },
  {
    sys: { id: "testimonial-5" },
    fields: {
      clientName: "Amanda Thompson",
      rating: 4,
      reviewText:
        "Great experience with the seasonal cleanup service. The team was thorough and efficient, and they left our property looking pristine. We'll definitely be using them again for spring cleanup.",
      projectType: "Fall Seasonal Cleanup",
      date: "2024-11-05",
      featured: false,
    },
  },
  {
    sys: { id: "testimonial-6" },
    fields: {
      clientName: "Mark Stevens",
      rating: 5,
      reviewText:
        "After storm damage took down several trees, Josh and his crew handled the cleanup and replanting professionally and efficiently. They helped us redesign the affected area, and it looks better than before.",
      projectType: "Storm Damage & Tree Care",
      date: "2024-05-18",
      featured: true,
    },
  },
  {
    sys: { id: "testimonial-7" },
    fields: {
      clientName: "Emily & James Parker",
      rating: 5,
      reviewText:
        "The retaining walls and terraced planting Josh created solved our slope erosion problem while adding beautiful outdoor space. The craftsmanship is excellent and the design is both functional and attractive.",
      projectType: "Retaining Walls & Slope Stabilization",
      date: "2024-04-12",
      featured: false,
    },
  },
  {
    sys: { id: "testimonial-8" },
    fields: {
      clientName: "Commercial Property Management Inc.",
      rating: 5,
      reviewText:
        "Cagle's Landscaping maintains three of our commercial properties. They're professional, reliable, and keep our properties looking excellent year-round. Their attention to detail and customer service are outstanding.",
      projectType: "Commercial Landscape Maintenance",
      date: "2024-08-08",
      featured: false,
    },
  },
];

// About Content
export const aboutContent: AboutContent = {
  sys: { id: "about-cagle-landscaping" },
  fields: {
    companyStory: `Cagle's Landscaping & Restoration was founded in 2015 by Josh Cagle with a simple mission: to create beautiful, sustainable outdoor spaces that enhance our clients' quality of life. What started as a small lawn care operation has grown into Northwest Arkansas' trusted partner for comprehensive landscaping services.

Josh's passion for landscaping began during his college years when he worked summers for a local garden center. After graduation, he gained valuable experience working for established landscaping companies, learning the trade from the ground up. In 2015, he decided to start his own company, focusing on personalized service and quality workmanship that larger companies often overlook.

Today, Cagle's Landscaping & Restoration serves residential and commercial clients throughout Fayetteville, Springdale, Rogers, Bentonville, and surrounding Northwest Arkansas communities. We've completed hundreds of projects, from simple lawn maintenance to complex landscape installations, always with the same commitment to excellence that started our journey.`,
    missionStatement:
      "To transform outdoor spaces through expert design, quality installation, and reliable maintenance while building lasting relationships with our clients and community.",
    yearsFounded: 2015,
    coreValues: [
      {
        title: "Quality Craftsmanship",
        description:
          "We take pride in delivering exceptional workmanship that stands the test of time.",
        icon: "Award",
      },
      {
        title: "Personal Service",
        description:
          "Every client receives personalized attention and customized solutions for their unique needs.",
        icon: "Users",
      },
      {
        title: "Environmental Stewardship",
        description:
          "We promote sustainable practices and native plantings that benefit our local ecosystem.",
        icon: "Leaf",
      },
    ],
    teamMembers: [
      {
        name: "Josh Cagle",
        role: "Owner & Lead Designer",
        bio: "Josh founded Cagle's Landscaping & Restoration in 2015 with over a decade of experience in landscape design and installation. He holds certifications in irrigation design and is passionate about creating outdoor spaces that reflect each client's lifestyle. When not working on landscape projects, Josh enjoys hiking Arkansas' state parks with his family.",
        photo: createAsset(
          "josh-cagle-photo",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          "Josh Cagle - Owner",
          "Josh Cagle, owner of Cagle's Landscaping & Restoration"
        ),
        specialties: [
          "Landscape Design",
          "Hardscaping",
          "Project Management",
          "Client Relations",
        ],
      },
    ],
    certifications: [
      "Licensed Arkansas Contractor",
      "Certified Irrigation Designer",
      "Insured & Bonded",
      "Arkansas Nursery & Landscape Association Member",
      "Better Business Bureau Accredited",
    ],
  },
};

// Service areas for reference
export const serviceAreas = [
  "Fayetteville",
  "Springdale",
  "Rogers",
  "Bentonville",
  "Johnson",
  "Goshen",
  "Farmington",
  "Prairie Grove",
  "Elkins",
  "Tontitown",
];

export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'deep-cleaning'
  | 'home-cleaning'
  | 'office-cleaning'
  | 'move-in-out-cleaning'
  | 'sofa-carpet-cleaning'
  | 'villa-cleaning'
  | 'contact'
  | 'quote'
  | 'blog';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      keyTakeaway?: string;
    }[];
    conclusion: string;
  };
  category: 'Tips & Guides' | 'Deep Cleaning' | 'Dubai Living' | 'Commercial' | 'AC & Air Quality';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  relatedServiceSlug?: PageId;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'residential' | 'commercial' | 'specialized';
  shortDesc: string;
  fullDesc: string;
  priceStartingAed: number;
  pricingUnit: string;
  duration: string;
  iconName: string;
  image: string;
  popular?: boolean;
  features: string[];
  includedList: string[];
  idealFor: string;
}

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceRequired: string;
  propertyType: string;
  numberOfBedrooms: string;
  preferredDate: string;
  preferredTime: string;
  locationArea: string;
  additionalRequirements: string;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  location: string;
  service: string;
  rating: number;
  reviewText: string;
  date: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AreaItem {
  name: string;
  zone: string;
  popular?: boolean;
  estArrivalTime?: string;
}

export type Role = 'user' | 'provider';

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  image?: string;
  subtitle?: string;
}

export interface Provider {
  id: string;
  name: string;
  serviceId: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  availability: 'open' | 'closed';
  experience: string;
  distance: string;
  verified: boolean;
}

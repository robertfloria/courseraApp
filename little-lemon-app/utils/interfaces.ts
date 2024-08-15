export interface UserInfo {
  image?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface EmailNotifications {
  orderStatuses?: boolean;
  passwordChanges?: boolean;
  specialOffers?: boolean;
  newsletter?: boolean;
}

export interface Authentication {
  email: string;
  firstName: string;
}

export interface MenuItems {
  id: number;
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  image?: string;
}

export interface User {
  id: number;
  image?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  orderStatuses?: boolean;
  passwordChanges?: boolean;
  specialOffers?: boolean;
  newsletter?: boolean;
}
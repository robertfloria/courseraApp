export interface UserInfo {
    image: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
};

export interface CheckNotifications {
    orderStatuses: boolean;
    passwordChanges: boolean;
    specialOffers: boolean;
    newsletter: boolean;
}
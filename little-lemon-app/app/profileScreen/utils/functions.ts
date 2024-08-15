import { getUser } from "@/database/userDatabase";

export const fetchUserInfo = async (db: any, email?: string) => {
  const user = await getUser(db, email);

  return {
    userInfo: {
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
    checkNotifications: {
      orderStatuses: user.orderStatuses ?? true,
      passwordChanges: user.passwordChanges ?? true,
      specialOffers: user.specialOffers ?? true,
      newsletter: user.newsletter ?? true,
    },
  };
};

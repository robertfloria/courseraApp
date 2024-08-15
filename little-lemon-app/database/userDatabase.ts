import { EmailNotifications, User, UserInfo } from "@/utils/interfaces";
import { SQLiteDatabase } from "expo-sqlite";

export async function createUserTables(db: SQLiteDatabase) {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
      id integer primary key not null, 
      image text, 
      firstName text, 
      lastName text,
      email text,
      phoneNumber text,
      orderStatuses BIT,
      passwordChanges BIT,
      specialOffers BIT,
      newsletter BIT
      );
      `);
}

export async function getUser(db: SQLiteDatabase, email: string) {
  let user = (await db.getFirstAsync(
    `SELECT * FROM user WHERE email = '${email}';`,
  )) as User;

  if (!user) {
    user = await saveUser(db, email);
  }

  user.orderStatuses = tinyIntToBool(user.orderStatuses);
  user.passwordChanges = tinyIntToBool(user.passwordChanges);
  user.specialOffers = tinyIntToBool(user.specialOffers);
  user.newsletter = tinyIntToBool(user.newsletter);

  return user;
}

export async function editUserInfo(
  db: SQLiteDatabase,
  userInfo: UserInfo,
  emailNotifications: EmailNotifications,
  email: string,
) {
  const user = await getUser(db, email);

  if (user) {
    await db.execAsync(`
            UPDATE user
            SET image = '${userInfo.image}',
            firstName = '${userInfo.firstName}',
            lastName = '${userInfo.lastName}',
            email = '${userInfo.email}',
            phoneNumber = '${userInfo.phoneNumber}',
            orderStatuses = '${boolToTinyInt(emailNotifications.orderStatuses)}',
            passwordChanges = '${boolToTinyInt(emailNotifications.passwordChanges)}',
            specialOffers = '${boolToTinyInt(emailNotifications.specialOffers)}',
            newsletter = '${boolToTinyInt(emailNotifications.newsletter)}'
            WHERE email = '${email}'
            `);
  }
}

async function saveUser(db: SQLiteDatabase, email: string) {
  await db.execAsync(`
        INSERT INTO user(email) VALUES('${email}');
        `);

  const user = await getUser(db, email);
  return user;
}

function boolToTinyInt(value: any) {
  return value ? 1 : 0;
}

function tinyIntToBool(value: any) {
  return value === 1 ? true : false;
}

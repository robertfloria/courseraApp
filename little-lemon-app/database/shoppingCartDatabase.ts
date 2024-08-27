import { SQLiteDatabase } from "expo-sqlite";
import { getUser } from "./userDatabase";
import { UserShoppingItem } from "@/utils/interfaces";
import { Alert } from "react-native";

export async function createShoppingCartTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS shoppingCart (
    id integer primary key not null, 
    userId integer NOT NULL,
    itemId integer NOT NULL,
    FOREIGN KEY(userId) REFERENCES user(id),
    FOREIGN KEY(itemId) REFERENCES menuitems(id)
    );
    `);
}

export async function getUserShoppingItems(
  db: SQLiteDatabase,
  email: string,
): Promise<Array<UserShoppingItem>> {
  const user = await getUser(db, email);
  const userShoppingCartItemsId = (
    await db.getAllAsync(
      `SELECT itemId FROM shoppingCart WHERE userId = ?`,
      user.id,
    )
  ).map((item: any) => item.itemId);

  const placeholders = userShoppingCartItemsId.map(() => "?").join(", ");

  const shoppingCartItems = (await db.getAllAsync(
    `
    SELECT sc.id, mi.price, mi.name, mi.image
    FROM shoppingCart sc
    INNER JOIN menuitems mi ON mi.id = sc.itemId
    WHERE sc.itemId IN (${placeholders})
    `,
    userShoppingCartItemsId,
  )) as Array<UserShoppingItem>;

  return shoppingCartItems;
}

export async function addItemInShoppingCart(
  itemId: number,
  email: string,
  amount: number,
  db: SQLiteDatabase,
) {
  const user = await getUser(db, email);
  const valuesArray = Array(amount).fill(`(${user.id}, ${itemId})`).join(",");

  try {
    await db.execAsync(
      `INSERT INTO shoppingCart (userId, itemId) VALUES ${valuesArray};`,
    );
  } catch (err) {
    Alert.alert("Sorry, there was an error!");
    throw err;
  }
}

export async function deleteItemInShoppingCart(
  itemId: number,
  db: SQLiteDatabase,
) {
  await db.runAsync(`DELETE FROM shoppingCart WHERE id = ?`, itemId);
}

import { SQLiteDatabase } from "expo-sqlite";
import { getUser } from "./userDatabase";
import { UserOrdersItems } from "@/utils/interfaces";
import { Alert } from "react-native";

export async function createOrdersTable(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
    id integer primary key not null, 
    orderId text,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    finalPrice integer
    );
    `);
}

export async function getUserOrders(
  db: SQLiteDatabase,
  email: string,
): Promise<Array<UserOrdersItems>> {
  const user = await getUser(db, email);
  const userOrdersShoppingCartItemsId = (
    await db.getAllAsync(
      `SELECT itemId FROM shoppingCart WHERE userId = ? AND orderId IS NOT NULL`,
      user.id,
    )
  ).map((item: any) => item.itemId);

  const placeholders = userOrdersShoppingCartItemsId.map(() => "?").join(", ");

  const shoppingCartItems = (await db.getAllAsync(
    `
    SELECT ord.orderId, ord.finalPrice, ord.createdDate, mi.name
    FROM shoppingCart sc
    INNER JOIN menuitems mi ON mi.id = sc.itemId
    INNER JOIN orders ord ON ord.id = sc.orderId
    WHERE sc.itemId IN (${placeholders})
    AND sc.orderId IS NOT NULL
    `,
    userOrdersShoppingCartItemsId,
  )) as Array<UserOrdersItems>;

  return shoppingCartItems;
}

export async function insertShoppingItemsOrderId(
  db: SQLiteDatabase,
  orderId: number,
  email: string,
) {
  const user = await getUser(db, email);
  try {
    await db.runAsync(
      `
      UPDATE shoppingCart
      SET orderId = ?
      WHERE orderId IS NULL
      AND userId = ?
       `,
      orderId,
      user.id,
    );
  } catch (err) {
    Alert.alert("Sorry, there was an error!");
    throw err;
  }
}

export async function addOrder(
  orderId: string,
  finalPrice: number,
  db: SQLiteDatabase,
) {
  try {
    const result = await db.runAsync(
      `INSERT INTO orders (orderId, finalPrice) VALUES (?, ?);`,
      orderId,
      finalPrice,
    );

    return result.lastInsertRowId;
  } catch (err) {
    Alert.alert("Sorry, there was an error!");
    throw err;
  }
}

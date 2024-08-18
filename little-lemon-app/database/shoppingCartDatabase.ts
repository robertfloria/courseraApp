import { SQLiteDatabase } from "expo-sqlite";
import { getUser } from "./userDatabase";
import { UserShoppingItem } from "@/utils/interfaces";

export async function createShoppingCartTable(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS shoppingCart (
    id integer primary key not null, 
    userId integer NOT NULL,
    itemId integer NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (itemId) REFERENCES menuitems(id) ON DELETE CASCADE
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
      `SELECT itemId FROM shoppingCart WHERE userId = '${user.id}'`,
    )
  )
    .map((item) => `"${item}"`)
    .join(", ");

  const shoppingCartItems = (await db.getAllAsync(`
    SELECT sc.id, mi.price, mi.name, mi.image FROM shoppingCart sc
    INNER JOIN menuitems mi ON mi.id = sc.itemId
    WHERE id.itemId IN (${userShoppingCartItemsId})
    `,
  )) as Array<UserShoppingItem>;

  return shoppingCartItems;
}

export async function addItemInShoppingCart(
  itemId: number,
  email: string,
  db: SQLiteDatabase,
) {
  const user = await getUser(db, email);

  await db.execAsync(
    `INSERT INTO shoppingCart(userId, itemId) VALUES('${user.id}', '${itemId}')`,
  );
};

export async function deleteItemInShoppingCart(
  itemId: number,
  db: SQLiteDatabase,
) {
  await db.execAsync(
    `DELETE FROM shoppingCart WHERE itemId = '${itemId}'`,
  );
};

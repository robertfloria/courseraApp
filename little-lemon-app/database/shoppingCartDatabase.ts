import { MenuItems } from "@/utils/interfaces";
import { SQLiteDatabase } from "expo-sqlite";
import { getUser } from "./userDatabase";

export async function createShoppingCartTable(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS shoppingCart (
    id integer primary key not null, 
    userId int FOREIGN KEY REFERENCES user(id),
    itemId int FOREIGN KEY REFERENCES menuitems(id),
    );
    `);
}

export async function getUserShoppingCartMenuItems(
  db: SQLiteDatabase,
  email: string,
): Promise<Array<MenuItems>> {
  const user = await getUser(db, email);
  const shoppingCartItemsId = (
    await db.getAllAsync(
      `SELECT itemId FROM shoppingCart WHERE userId = '${user.id}'`,
    )
  )
    .map((item) => `"${item}"`)
    .join(", ");

  const menuItemsByItemsId = (await db.getAllAsync(
    `SELECT * FORM menuitems WHERE id IN (${shoppingCartItemsId})`,
  )) as Array<MenuItems>;

  return menuItemsByItemsId;
}

export async function addItemInShoppingCart(
  itemId: number,
  email: string,
  db: SQLiteDatabase,
) {
  const user = await getUser(db, email);

  await db.execAsync(
    `INSERT INTO shoppingCart(userId, itemId) VALUES('${(user.id, itemId)})`,
  );
}

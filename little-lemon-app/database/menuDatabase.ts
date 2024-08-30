import { MenuItems } from "@/utils/interfaces";
import { SQLiteDatabase } from "expo-sqlite";

export async function createMenuItemsTable(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
    id integer primary key not null, 
    name text, 
    price text, 
    category text,
    description text,
    image text
    );
    `);
}

export async function getMenuItems(
  db: SQLiteDatabase,
): Promise<Array<MenuItems>> {
  const menuItems = (await db.getAllAsync(
    "select * from menuitems",
  )) as Array<MenuItems>;
  return menuItems;
}

export async function saveMenuItems(
  menuItems: Array<MenuItems>,
  db: SQLiteDatabase,
) {
  if (menuItems.length === 0) {
    return;
  }

  const placeholders = menuItems.map(() => '(?, ?, ?, ?, ?)').join(', ');
  const values = menuItems.reduce((acc: any, item: any) => {
    return [
      ...acc,
      item.name,
      item.price.toString(),
      item.category,
      item.description,
      item.image,
    ];
  }, []);

  const query = `INSERT INTO menuitems (name, price, category, description, image) VALUES ${placeholders}`;

  await db.runAsync(query, values);
}

export async function filterByCategoryAndText(
  categories: Array<string>,
  text: string,
  db: SQLiteDatabase,
) {
  const placeholders = categories.map(() => "?").join(", ");
  const searchText = `%${text}%`;

  const filteredMenuItems = await db.getAllAsync(
    `
    SELECT * FROM menuitems 
    WHERE category IN (${placeholders})
    AND LOWER(name) LIKE LOWER(?);
    `,
    [...categories, searchText],
  );

  return filteredMenuItems;
}

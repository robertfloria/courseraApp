import { SQLiteDatabase } from "expo-sqlite";

export async function createTable(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
    id integer primary key not null, 
    name text, 
    price text, 
    category text,
    description text,
    image text
    );
    CREATE TABLE IF NOT EXISTS categories (
    id integer primary key not null, 
    name text
    );
    `);
}

export async function getMenuItems(db: SQLiteDatabase) {
  const menuItems = await db.getAllAsync("select * from menuitems");
  return menuItems;
}

export async function saveMenuItems(menuItems, db: SQLiteDatabase) {
  const rows = menuItems
    .map(
      (item, index) =>
        `(${index}, "${item.name}", "${item.price}", "${item.category}", "${item.description}", "${item.image}")`,
    )
    .join(", ");

  await db.execAsync(
    `INSERT INTO menuitems (id, name, price, category, description, image) VALUES ${rows};`,
  );
}

export async function getCategories(db: SQLiteDatabase) {
  const categories = await db.getAllAsync("select name from categories");
  return categories.map((item) => item.name);
}

export async function saveCategories(categories, db: SQLiteDatabase) {
  const rows = categories
    .map((category, index) => `(${index},"${category}")`)
    .join(", ");

  await db.execAsync(`INSERT INTO categories (id, name) VALUES ${rows};`);
}

export async function filterByCategoryAndText(categories, text, db: SQLiteDatabase) {
  const splittedCategories = categories.map((item) => `"${item}"`).join(", ");

  const filteredMenuItems = await db.getAllAsync(`
    SELECT * FROM menuitems 
    WHERE category IN (${splittedCategories})
    AND LOWER(name) LIKE LOWER('%${text}%');
    `);

  return filteredMenuItems;
}

export async function filterByText(categories, db: SQLiteDatabase) {
  const splittedCategories = categories.map((item) => `"${item}"`).join(", ");

  const filteredMenuItems = await db.getAllAsync(`
    SELECT * FROM menuitems 
    WHERE category IN (${splittedCategories})
    `);

  return filteredMenuItems;
}

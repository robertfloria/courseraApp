export async function createTable(db) {
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
};

export async function getMenuItems(db) {
  const menuItems = await db.getAllAsync("select * from menuitems");
  return menuItems;
};

export async function saveMenuItems(menuItems, db) {
  const rows = menuItems
    .map(
      (item, index) =>
        `(${index}, "${item.name}", "${item.price}", "${item.category}", "${item.description}", "${item.image}")`,
    )
    .join(", ");

  await db.execAsync(
    `INSERT INTO menuitems (id, name, price, category, description, image) VALUES ${rows};`,
  );
};

export async function getCategories(db) {
  const categories = await db.getAllAsync("select name from categories");
  return categories.map((item) => item.name);
};

export async function saveCategories(categories, db) {
  const rows = categories
    .map((category, index) => `(${index},"${category}")`)
    .join(", ");

  await db.execAsync(
    `INSERT INTO categories (id, name) VALUES ${rows};`,
  );
};
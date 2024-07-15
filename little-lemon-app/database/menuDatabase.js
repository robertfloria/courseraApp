export async function createTable(db) {
  await db.runAsync(
    `create table if not exists menuitems (
    id integer primary key not null, 
    uuid text, 
    title text, 
    price text, 
    category text
    );`,
  );
}

export async function getMenuItems(db) {
  const menuItems = await db.getAllAsync("select * from menuitems");
  return menuItems;
}

export async function saveMenuItems(menuItems, db) {
  const rows = menuItems.map((item) => `(${item.id}, '${item.id}', '${item.title}', '${item.price}', '${item.category}')`).join(', ');
  await db.execAsync(
    `INSERT INTO menuitems(id, uuid, title, price, category) VALUES ${rows};`,
  )
}

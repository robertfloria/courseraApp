import { createMenuItemsTable } from "@/database/menuDatabase";
import { createShoppingCartTable } from "@/database/shoppingCartDatabase";
import { createUserTable } from "@/database/userDatabase";
import { SQLiteDatabase } from "expo-sqlite";

export function getSectionListData(data: any) {
  let sectionList: Array<any> = data.reduce(
    (accumulator: any, currentValue: any) => {
      const category = currentValue.category;
      let categoryGroup = accumulator.find(
        (item: any) => item.category === category,
      );

      if (!categoryGroup) {
        categoryGroup = {
          category: category,
          data: [],
        };
        accumulator.push(categoryGroup);
      }

      categoryGroup.data.push({
        id: currentValue.id,
        description: currentValue.description,
        name: currentValue.name,
        price: currentValue.price,
        image: currentValue.image,
      });

      return accumulator;
    },
    [],
  );
  return sectionList;
}

export function getCategoriesFromMenuItems(data: any) {
  let categoryList: Array<any> = data.reduce(
    (accumulator: any, currentValue: any) => {
      const category = currentValue.category;
      let categoryExist = accumulator.find((item: any) => item === category);

      if (!categoryExist) {
        accumulator.push(category);
      }

      return accumulator;
    },
    [],
  );

  return categoryList;
}

export const getImage = (imageName: string) => {
  const lowerCaseImageName = imageName.toLowerCase();

  switch (lowerCaseImageName) {
    case "greeksalad.jpg":
      return require(`../../../../assets/images/greeksalad.jpg`);
    case "bruschetta.jpg":
      return require(`../../../../assets/images/bruschetta.jpg`);
    case "grilledfish.jpg":
      return require(`../../../../assets/images/grilledfish.jpg`);
    case "pasta.jpg":
      return require(`../../../../assets/images/pasta.jpg`);
    case "lemondessert.jpg":
      return require(`../../../../assets/images/lemondessert.jpg`);
    case "watter.jpg":
      return require(`../../../../assets/images/watter.jpg`);
    case "lemonade.jpg":
      return require(`../../../../assets/images/lemonade.jpg`);
    case "orangejuice.jpg":
      return require(`../../../../assets/images/orangejuice.jpg`);
    case "quattroformaggi.jpg":
      return require(`../../../../assets/images/quattroformaggi.jpg`);
    case "speciallemonpizza.jpg":
      return require(`../../../../assets/images/speciallemonpizza.jpg`);
    case "margherita.jpg":
      return require(`../../../../assets/images/margherita.jpg`);
    default:
      return require(`../../../../assets/images/little-lemon-logo-grey.png`);
  }
};

export const setupDatabase = async (db: SQLiteDatabase) => {
  await createUserTable(db);
  await createMenuItemsTable(db);
  await createShoppingCartTable(db);
};

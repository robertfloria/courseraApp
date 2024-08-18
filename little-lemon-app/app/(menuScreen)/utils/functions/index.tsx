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
  switch (imageName) {
    case "greekSalad.jpg": {
      return require("../../../../assets/images/little-lemon-logo.png");
    }
    case "bruschetta.jpg": {
      return require("../../../../assets/images/little-lemon-logo-grey.png");
    }
    default:
      return require("../../../../assets/images/icon.png");
  }
};

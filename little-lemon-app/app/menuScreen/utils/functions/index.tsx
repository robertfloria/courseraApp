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
        id: currentValue.name,
        description: currentValue.description,
        title: currentValue.name,
        price: currentValue.price,
        image: currentValue.image,
      });

      return accumulator;
    }, []);
  return sectionList;
}

export function filterByQueryAndCategories(
  query: any,
  activeCategories: any,
  data: any,
) {
  const dataByCategories = data.filter((section: any) =>
    activeCategories.map((item: string) => item.toLowerCase()).includes(section.category.toLowerCase()),
  );

  const dataByQueryAndCategories = dataByCategories.reduce(
    (accumulator: any, currentValue: any) => {
      const hasData = currentValue.data.some((sectionData: any) =>
        sectionData.title.toLowerCase().includes(query.toLowerCase()),
      );
      if (hasData) {
        accumulator.push({
          ...currentValue,
          data: currentValue.data.filter((sectionData: any) =>
            sectionData.title.toLowerCase().includes(query.toLowerCase()),
          ),
        });
      }
      return accumulator;
    },
    [],
  );

  return dataByQueryAndCategories;
}

export const getImage = (imageName: string) => {
  switch (imageName) {
    case 'greekSalad.jpg': {
      return require('../../../../assets/images/little-lemon-logo.png');
    }
    case 'bruschetta.jpg': {
      return require('../../../../assets/images/little-lemon-logo-grey.png')
    }
    default: return require('../../../../assets/images/icon.png');
  }
};

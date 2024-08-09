export function getSectionListData(data: any) {
  let sectionList: Array<any> = data.reduce(
    (accumulator: any, currentValue: any) => {
      debugger
      const category = currentValue.category;
      let categoryGroup = [accumulator].find(
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
    },[]
  );
  return sectionList;
}

export function filterByQueryAndCategories(
  query: any,
  activeCategories: any,
  data: any,
) {
  // I do not want to make a database querry for filtering because it will execute too many request to the database
  // Therefore i created a filteredData state to store the filter data
  // The old data state is used to store the initial data, and like this i make the get request only once at the first page render
  // And i manipulate the filteredState data, helping me by the data state, which will never change(only if i updated the database and i need to make a get request again)
  // In other words, i make a front-end filtering instead of backend

  const dataByCategories = data.filter((section: any) =>
    activeCategories.includes(section.category),
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

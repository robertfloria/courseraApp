export function getSectionListData(data: any) {
  let sectionList: Array<any> = [];

  const insertSection = (section: any) => {
    sectionList.push(
      {
        title: section.category,
        data: []
      }
    );
  }

  const checkIfSectionExist = (category: string) => sectionList.some((item) => item.title == category);

  for (let i = 0; i < data.length; i++) {
    if (!checkIfSectionExist(data[i].category)) {
      insertSection(data[i]);
    }
    if (checkIfSectionExist(data[i].category)) {
      sectionList.map((section) => {
        if (section.title == data[i].category) {
          section.data.push(
            {
              id: data[i].id,
              title: data[i].title,
              price: data[i].price
            }
          )
        };
        return section;
      })
    }
  };

  return sectionList;
}

export function filterByQueryAndCategories(
  query: any,
  activeCategories: any,
  data: any
) {
  // I do not want to make a database querry for filtering because it will execute too many request to the database
  // Therefore i created a filteredData state to store the filter data
  // The old data state is used to store the initial data, and like this i make the get request only once at the first page render
  // And i manipulate the filteredState data, helping me by the data state, which will never change(only if i updated the database and i need to make a get request again)
  // In other words, i make a front-end filtering instead of backend

  const dataByCategories = data.filter((section: any) => activeCategories.includes(section.title));

  const dataByQueryAndCategories = dataByCategories.reduce((accumulator: any, currentValue: any) => {
    const hasData = currentValue.data.some((sectionData: any) => sectionData.title.toLowerCase().includes(query.toLowerCase()))
    if (hasData) {
      accumulator.push(
        {
          ...currentValue,
          data: currentValue.data.filter((sectionData: any) => sectionData.title.toLowerCase().includes(query.toLowerCase()))
        }
      )
    }
    return accumulator;
  }, []);

  return dataByQueryAndCategories;
}

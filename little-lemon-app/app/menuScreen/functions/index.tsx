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

export async function filterByQueryAndCategories(
  query: any,
  activeCategories: any,
  data: any
) {
  return new Promise((resolve, reject) => {
    const dataByCategories = data.filter((section: any) => activeCategories.includes(section.title));

    const dataByQueryAndCategories = dataByCategories.map((section: any) => {
      return {
        ...section,
        data: section.data.filter((sectionData: any) => sectionData.title.includes(query))
      }
    })

    resolve(() => dataByQueryAndCategories);
  });
}

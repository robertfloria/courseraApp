export const SECTION_LIST_MOCK_DATA = [
  {
    title: "Appetizers",
    data: [
      {
        id: "1",
        title: "Pasta",
        price: "10",
      },
      {
        id: "3",
        title: "Pizza",
        price: "8",
      },
    ],
  },
  {
    title: "Salads",
    data: [
      {
        id: "2",
        title: "Caesar",
        price: "2",
      },
      {
        id: "4",
        title: "Greek",
        price: "3",
      },
    ],
  },
];


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
    if (sectionList.length == 0 || !checkIfSectionExist(data[i].category)) {
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
) {
  return new Promise((resolve, reject) => {
    resolve(SECTION_LIST_MOCK_DATA);
  });
}

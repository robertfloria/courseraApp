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
        category: section.category,
        data: [
          {
            id: section.id,
            title: section.title,
            price: section.price
          }
        ]
      }
    );
  }

  const checkIfSectionExist = (category: string) => sectionList.some((item) => item.category == category);

  for (let i = 0; i < data.length; i++) {
    if (sectionList.length == 0 || checkIfSectionExist(data[i].category)) {
      insertSection(data[i]);
    }
    for (let j = i + 1; j < data.length; j++) {
      if (data[i].category == data[j].category) {
        sectionList[i].data.push(
          {
            id: data[j].id,
            title: data[j].title,
            price: data[j].price
          }
        )
      }
    };
  };
  console.log(sectionList);
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

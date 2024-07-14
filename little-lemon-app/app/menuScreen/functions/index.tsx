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


export function getSectionListData(data: Array<any>) {
  let sectionList = [];

  for (let i = 0; i < data.length; i++) {
    if (sectionList.length == 0) {
      sectionList.push(
        {
          category: data[i].category,
          data: [
            {
              id: data[i].id,
              title: data[i].title,
              price: data[i].price
            }
          ]
        }
      );
    }
    for (let j = i + 1; j < data.length; j++) {
      if (data[i].category == data[j].category) {

      }
    }
  }

  data.forEach((i: any) => {
    data.foreEach((j) => {
      if (i.category != j.category)
    })
  });
  return SECTION_LIST_MOCK_DATA;
}

export async function filterByQueryAndCategories(
  query: any,
  activeCategories: any,
) {
  return new Promise((resolve, reject) => {
    resolve(SECTION_LIST_MOCK_DATA);
  });
}

export function getSectionListData(data: any) {
    let sectionList: Array<any> = data.reduce(
        (accumulator: any, currentValue: any) => {
            const orderId = currentValue.orderId;
            const finalPrice = currentValue.finalPrice;

            let orderIdGroup = accumulator.find(
                (item: any) => item.orderId === orderId,
            );
            let itemAppearance = 0;

            if (!orderIdGroup) {
                orderIdGroup = {
                    orderId: orderId,
                    finalPrice:finalPrice,
                    data: [],
                };
                accumulator.push(orderIdGroup);
            }

            if (orderIdGroup.orderId == orderId) {
                itemAppearance = orderIdGroup.data.filter((item: any) => item.name == currentValue.name).length;
            }
            
            if (itemAppearance > 0) {
                orderIdGroup.data[0].multiply = itemAppearance + 1;
            }
            else {
                orderIdGroup.data.push({
                    id: currentValue.orderId,
                    createdDate: currentValue.createdDate,
                    name: currentValue.name,
                    multiply: 1,
                });
            }

            return accumulator;
        },
        [],
    );
    return sectionList;
};

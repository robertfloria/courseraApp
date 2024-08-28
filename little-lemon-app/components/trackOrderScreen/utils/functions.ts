export function getSectionListData(data: any) {
    let sectionList: Array<any> = data.reduce(
        (accumulator: any, currentValue: any) => {
            const orderId = currentValue.orderId;
            let orderIdGroup = accumulator.find(
                (item: any) => item.orderId === orderId,
            );

            if (!orderIdGroup) {
                orderIdGroup = {
                    orderId: orderId,
                    data: [],
                };
                accumulator.push(orderIdGroup);
            }

            const itemAppearance = orderIdGroup.filter(
                (item: any) => item.orderId === orderId && item.data.some((data: any) => data.name == currentValue.name)
            );

            if (itemAppearance.length > 0) {
                orderIdGroup.data.multiply = itemAppearance.length + 1;
            }
            else {
                orderIdGroup.data.push({
                    id: currentValue.orderId,
                    createdDate: currentValue.createdDate,
                    finalPrice: currentValue.finalPrice,
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

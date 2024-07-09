const insertDish = (dishName) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into menu (name) values (?)', [dishName]);
            },
            reject,
            resolve
        );
    });
};

const insertData = async dishName => {
    try {
        await insertDish(dishName);
    } catch (e) {
        Alert.alert(`Error inserting ${dishName}`, e.message);
    }
};

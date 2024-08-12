import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";

import {
  createTable,
  filterByCategoryAndText,
  getCategories,
  getMenuItems,
  saveCategories,
  saveMenuItems,
} from "../../database/menuDatabase";
import Filters from "./components/Filters";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import {
  getCategoriesFromMenuItems,
  getSectionListData,
} from "./utils/functions";
import { useSQLiteContext } from "expo-sqlite";
import { getFoodMenuItems } from "../../api";
import { FoodItem } from "./components/FoodItem";

export default function MenuScreen() {
  const [data, setData] = useState<any>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [searchBarText, setSearchBarText] = useState<string>("");
  const [filterSelections, setFilterSelections] = useState<Array<any>>([]);
  const db = useSQLiteContext();
  useEffect(() => {
    (async () => {
      try {
        // await db.runAsync('DROP TABLE menuitems');
        // await db.runAsync('DROP TABLE categories');

        await createTable(db);
        let menuItems = await getMenuItems(db);
        let categoryList = await getCategories(db);

        if (!menuItems.length) {
          menuItems = (await getFoodMenuItems()).menu;
          await saveMenuItems(menuItems, db);
        }

        if (!categoryList.length) {
          categoryList = getCategoriesFromMenuItems(menuItems);
          await saveCategories(categoryList, db);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        setCategories(categoryList);
        setFilterSelections(categoryList.map(() => false));
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    const activeCategories = categories.filter((s, i) => {
      // If all filters are deselected, all categories are active
      if (filterSelections.every((item) => item === false)) {
        return true;
      }
      return filterSelections[i];
    });
    try {
      setTimeout(
        async () => {
          const filteredMenuItems = await filterByCategoryAndText(
            activeCategories,
            searchBarText,
            db,
          );
          const sectionListData = getSectionListData(filteredMenuItems);
          setData(sectionListData);
        },
        searchBarText ? 500 : 0,
      );
    } catch (e: any) {
      Alert.alert(e.message);
    }
  }, [filterSelections, searchBarText]);

  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
  };

  const handleFiltersChange = async (index: any) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: "white" }}
        elevation={0}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={categories}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodItem
            title={item.title}
            price={item.price}
            description={item.description}
            imageName={item.image}
          />
        )}
        renderSectionHeader={({ section: { category } }) => (
          <Text style={styles.menuItemHeader}>{category}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#495E57",
  },
  sectionList: {
    display: "flex",
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: "#495E57",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  menuItemHeader: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#FBDABB",
    backgroundColor: "#495E57",
  },
});

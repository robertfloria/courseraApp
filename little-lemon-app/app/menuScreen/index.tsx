import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";
// import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
} from "../../database/menuDatabase";
import Filters from "./components/Filters";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { filterByQueryAndCategories, getSectionListData } from "./functions";
import { useSQLiteContext } from "expo-sqlite";
import { readBlobData } from "@/utils/functions";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json";
const sections = ["Appetizers", "Salads", "Beverages"];

const Item = ({ title, price }: { title: string; price: number }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}</Text>
  </View>
);

export default function MenuScreen() {
  const [data, setData] = useState<Array<any>>([]);
  const [searchBarText, setSearchBarText] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [filterSelections, setFilterSelections] = useState<Array<any>>(
    sections.map(() => false),
  );

  const db = useSQLiteContext();

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const readedResponse = await readBlobData(response) as any;
      const manipulatedResponse = readedResponse.menu.map((item: any) => {
        return {
          ...item,
          category: item.category.title
        }
      })

      return manipulatedResponse;

    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable(db);
        let menuItems = await getMenuItems(db);
        console.log(menuItems)
        if (!menuItems.length) {
          const menuItems = await fetchData();
          saveMenuItems(menuItems, db);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories,
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q: any) => {
    setQuery(q);
  }, []);

  // const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
    // debouncedLookup(text);
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
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item title={item.title} price={item.price} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#495E57",
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: "#495E57",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#FBDABB",
    backgroundColor: "#495E57",
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});

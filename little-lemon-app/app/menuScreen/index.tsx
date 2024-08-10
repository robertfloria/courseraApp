import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Searchbar } from "react-native-paper";

import {
  createTable,
  getMenuItems,
  saveMenuItems,
} from "../../database/menuDatabase";
import Filters from "./components/Filters";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import {
  filterByQueryAndCategories,
  getImage,
  getSectionListData,
} from "./utils/functions";
import { useSQLiteContext } from "expo-sqlite";
import { menuItemsMock } from "./utils/mockData/menuItemsMock";
import { getFoodMenuItems } from "../api";

const sections = ["Starters", "Mains", "Desserts", "Drinks"];

interface MenuItem {
  title: string;
  price: number;
  description: string;
  imageName: string
}

const Item = ({ title, price, description, imageName }: MenuItem) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  useEffect(() => {
    if (imageName) {
      const imagePath = getImage(imageName)
      setImage(imagePath);
    }
  }, [imageName]);

  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemDetailsContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemDescription}>{description}</Text>
        <Text style={styles.menuItemPrice}>${price}</Text>
      </View>
      <Image
        style={styles.menuItemImage}
        source={image}
        resizeMode='cover'
      />
    </View>
  )
};

export default function MenuScreen() {
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [searchBarText, setSearchBarText] = useState<string>("");
  const [filterSelections, setFilterSelections] = useState<Array<any>>(
    sections.map(() => false),
  );

  // const db = useSQLiteContext();

  useEffect(() => {
    (async () => {
      try {
        // await createTable(db);
        // let menuItems = await getMenuItems(db);

        // if (!menuItems.length) {
        //   menuItems = menuItemsMock;
        //   await saveMenuItems(menuItems, db);
        // }
        let menuItems = await getFoodMenuItems();
        const sectionListData = getSectionListData(menuItems.menu);

        setData(sectionListData);
        setFilteredData(sectionListData);
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    const activeCategories = sections.filter((s, i) => {
      // If all filters are deselected, all categories are active
      if (filterSelections.every((item) => item === false)) {
        return true;
      }
      return filterSelections[i];
    });
    try {
      const sectionListData = filterByQueryAndCategories(
        searchBarText,
        activeCategories,
        data,
      );

      setFilteredData(sectionListData);
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
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item title={item.title} price={item.price} description={item.description} imageName={item.image} />
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
  menuItemContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  menuItemDetailsContainer: {
    flex: 1,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  menuItemHeader: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#FBDABB",
    backgroundColor: "#495E57",
  },
  menuItemTitle: {
    fontSize: 20,
    color: "white",
  },
  menuItemPrice: {
    fontSize: 20,
    color: "white",
  },
  menuItemDescription: {
    fontSize: 20,
    color: "grey",
  },
  menuItemImage: {
    width: 200,
    height: 200
  },
});

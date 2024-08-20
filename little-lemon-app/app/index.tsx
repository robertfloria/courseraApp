import { useEffect, useState } from "react";
import { Text, StyleSheet, SectionList, StatusBar, Alert } from "react-native";
import {
  filterByCategoryAndText,
  getMenuItems,
  saveMenuItems,
} from "../database/menuDatabase";
import Filters from "../components/menuScreen/components/Filters";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import {
  getCategoriesFromMenuItems,
  getSectionListData,
  setupDatabase,
} from "../components/menuScreen/utils/functions";
import { useSQLiteContext } from "expo-sqlite";
import { getFoodMenuItems } from "../api";
import { SectionFoodItem } from "../components/menuScreen/components/SectionFoodItem";
import CustomModal from "../components/CustomModal";
import { MenuItems } from "@/utils/interfaces";
import { ModalFoodItem } from "../components/menuScreen/components/ModalFoodItem";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

export default function MenuScreen() {
  const [data, setData] = useState<any>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [searchBarText, setSearchBarText] = useState<string>("");
  const [filterSelections, setFilterSelections] = useState<Array<any>>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItems>();

  const db = useSQLiteContext();

  const menuItemHeaderBackground = useThemeColor({}, "tint");

  useEffect(() => {
    (async () => {
      await setupDatabase(db);

      let menuItems = await getMenuItems(db);

      if (!menuItems.length) {
        menuItems = (await getFoodMenuItems()).menu;
        await saveMenuItems(menuItems, db);
      }

      let categoryList = getCategoriesFromMenuItems(menuItems);

      const sectionListData = getSectionListData(menuItems);
      setData(sectionListData);
      setCategories(categoryList);
      setFilterSelections(categoryList.map(() => false));
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

  const handleCloseModal = () => setSelectedItem(undefined);

  return (
    <ThemedSafeAreaView style={styles(menuItemHeaderBackground).container}>
      <ThemedSearchBar
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={searchBarText}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={categories}
      />
      <SectionList
        style={styles(menuItemHeaderBackground).sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SectionFoodItem data={item} setSelectedItem={setSelectedItem} />
        )}
        renderSectionHeader={({ section: { category } }) => (
          <ThemedText style={styles(menuItemHeaderBackground).menuItemHeader}>
            {category}
          </ThemedText>
        )}
      />
      {selectedItem && (
        <CustomModal
          openModal={!!selectedItem}
          onModalClose={handleCloseModal}
          title={selectedItem.name}
        >
          <ModalFoodItem data={selectedItem} />
        </CustomModal>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = (menuItemHeaderBackground: string) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      width: "100%",
      paddingTop: StatusBar.currentHeight,
    },
    sectionList: {
      display: "flex",
      paddingHorizontal: 16,
    },
    menuItemHeader: {
      fontSize: 24,
      paddingVertical: 8,
      backgroundColor: menuItemHeaderBackground,
    },
  });

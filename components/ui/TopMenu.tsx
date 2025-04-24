import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";

export default function TopMenu() {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.mainContainer}>
      
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon={"menu"} size={24} onPress={openMenu} />}>
        <Menu.Item onPress={closeMenu} title="Location 2" />
        <Menu.Item onPress={closeMenu} title="Location 3" />
      </Menu>
      <Text style={styles.text}>Location 1</Text>
      <View style={{width: 44}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
  }
});

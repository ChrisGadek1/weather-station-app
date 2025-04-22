import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Divider, IconButton } from "react-native-paper";

export default function TopMenu() {
  return (
    <View style={styles.mainContainer}>
      <IconButton icon={"menu"} size={24} />
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

import { Document, Text, Page, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "tomato",
    height: "100vh", // Set height to 100% of the viewport
    width: "100%", // Set width to 100% of the viewport
  },
  view: {
    color: "white",
    textAlign: "center",
    margin: 30,
  },
});

const MyComponent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.view}>
        <Text>Section #1</Text>
      </View>
    </Page>
  </Document>
);

export default MyComponent;

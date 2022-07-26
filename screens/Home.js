import axios from "axios";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";

const URL = "http://127.0.0.1:5000/";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      stars: [
        ["loading", "loading data"],
      ],
      gettingData: false,
    };
  }

  componentDidMount() {
    this.getStarData();
  }

  render() {
    console.log("state stars", this.state.stars);
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.sav} />
        <Text style={styles.header}>Stars</Text>
        <TouchableOpacity style={styles.smallButton} onPress={this.getStarData}>
          <Text style={styles.smallButtonText}>Refresh</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.stars}
          renderItem={this.renderListItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ width: "100%" }}
        />
      </View>
    );
  }

  renderListItem = ({ item, index }) => {
    if (item[0] == "name") {
      return;
    }
    return (
      <TouchableOpacity key={index} style={styles.listItem} onPress={() => {this.viewStar(index)}}>
        <View>
          <Text style={styles.listItemTitle}>{item[0]}</Text>
        </View>
        <Text style={styles.listItemArrow}>{">"}</Text>
      </TouchableOpacity>
    );
  };

  getStarData = async () => {
    console.log(URL);
    this.setState({ gettingData: true });
    fetch(URL)
      .then((value) => {
        value
          .json()
          .then((j) => {
            console.log(j);
            this.setState({ stars: j.data, gettingData: false });
          })
          .catch((reason) => {
            console.log("catch json", reason);
            this.setState({ gettingData: false });
          });
      })
      .catch((reason) => {
        // alert("ERROR!\n" + reason);
        console.log("catch fetch", reason);
        this.setState({ gettingData: false });
      });
  };

  viewStar = (index) => {
    this.props.navigation.navigate("Details", {starIndex: index});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  sav: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 60,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#cccccc",
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 20,
  },
  smallButton: {
    backgroundColor: "#888888",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  smallButtonText: {
    color: "#dddddd",
    fontWeight: "bold",
    fontSize: 25,
  },
  listItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#999999",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
    alignItems: "center",
  },
  listItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  listItemArrow: {
    color: "#dddddd",
    fontWeight: "bold",
  },
});

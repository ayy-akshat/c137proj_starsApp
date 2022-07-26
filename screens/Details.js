import React from "react";
import { StyleSheet, Text, View } from "react-native";

const URL = "http://127.0.0.1:5000/";

export default class DetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      gettingData: false,
    };
  }

  componentDidMount() {
    this.getStarData();
  }

  render() {
    console.log(this.props);
    var d = this.state.data;
    return (
      <View style={styles.container}>
        <Text style={styles.starName}>{d.name}</Text>
        <View>
          <Text style={styles.starStat}>DISTANCE • {d.distance} lightyears away</Text>
          <Text style={styles.starStat}>RADIUS • {d.radius} m</Text>
          <Text style={styles.starStat}>MASS • {d.mass} kg</Text>
          <Text style={styles.starStat}>GRAVITY • {d.gravity}</Text>
        </View>
      </View>
    );
  }

  getStarData = () => {
    this.setState({ gettingData: true });
    fetch(URL + "star?index=" + this.props.route.params.starIndex).then((value) => {
      value.json().then((j) => {
        this.setState({ data: j.data, gettingData: false });
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
  },
  starName: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginVertical: 20
  },
  starStat: {
    color: "#bbbbbb",
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: "#444444",
    borderRadius: 10,
    padding: 20,
    textAlign: "center"
  },
});

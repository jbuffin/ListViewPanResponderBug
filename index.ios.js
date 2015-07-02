/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  PanResponder,
} = React;

var ListViewPanResponderBug = React.createClass({

  componentWillMount() {
    this._panGesture = PanResponder.create({
      // Ask to be the responder:
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        var take = Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
          && Math.abs(gestureState.dy) > 10;
        console.log('took responder?', take);
        return take;
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('release responder', gestureState);
      },
    });
  },

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(new Array(25).fill('hello')),
    });
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {return row1 !== row2;},
      }),
    };
  },

  _renderRow(row) {
    return (
      <View>
        <Text>{row}</Text>
      </View>
    );
  },

  render() {
    return (
      <View style={styles.container} {...this._panGesture.panHandlers}>
        <ListView
          ref="list"
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          style={styles.list}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    marginTop: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

AppRegistry.registerComponent('ListViewPanResponderBug', () => ListViewPanResponderBug);

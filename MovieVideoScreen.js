import React from 'react';
import {View, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import YouTube from 'react-native-youtube';

class MovieVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <YouTube
          videoId={this.props.videoId}
          apiKey="AIzaSyA6jYpzGo2aM6EPkAVwRed_MqFCaeGxYrQ"
          play // control playback of video with true/false
          style={{alignSelf: 'stretch', height: 200}}
        />
      </View>
    );
  }
}

function MovieVideoScreen({route}) {
  const videoId = route.params.videoId;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <MovieVideo videoId={videoId}></MovieVideo>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default MovieVideoScreen;

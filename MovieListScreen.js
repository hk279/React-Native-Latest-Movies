import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';

class MovieListItem extends React.Component {
  render() {
    var imagePath = 'http://image.tmdb.org/t/p/w500';
    var imageUrl = imagePath + this.props.movie.poster_path;

    return (
      <View style={styles.movieItem}>
        <View>
          <Image source={{uri: imageUrl}} style={styles.movieItemImage}></Image>
        </View>
        <View style={styles.movieItemContent}>
          <Text style={styles.movieItemTitle}>{this.props.movie.title}</Text>
          <Text style={styles.movieItemText}>
            {this.props.movie.release_date}
          </Text>
          <Text
            numberOfLines={6}
            ellipsizeMode="tail"
            style={styles.movieItemText}>
            {this.props.movie.overview}
          </Text>
        </View>
      </View>
    );
  }
}

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
    };
  }

  async getMovies() {
    const APIkey = 'c7c85ce5e31c4bdb6ca545db7d289b06';
    const BaseURL = 'https://api.themoviedb.org/3/movie/now_playing';

    var url = BaseURL + '?api_key=' + APIkey;

    var response = await fetch(url);
    var data = await response.json();

    this.setState({
      movies: data.results,
    });
  }

  itemPressed(index) {
    this.props.navigation.navigate('Movie Details', {
      movie: this.state.movies[index],
    });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    if (this.state.movies === null) {
      return (
        <View>
          <Text style={styles.loadingText}>Loading, please wait...</Text>
        </View>
      );
    }

    var movies = this.state.movies.map((movie, index) => {
      return (
        <TouchableHighlight
          onPress={() => this.itemPressed(index)}
          underlayColor="lightgray"
          key={index}>
          <MovieListItem movie={movie} key={index}></MovieListItem>
        </TouchableHighlight>
      );
    });

    return <ScrollView>{movies}</ScrollView>;
  }
}

function MovieListScreen({navigation}) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <MovieList navigation={navigation}></MovieList>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    margin: 20,
  },
  //Wrapper for the whole movie item
  movieItem: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  movieItemImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  //Wrapper for the title, release date and overview.
  movieItemContent: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginRight: 10,
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {},
});

export default MovieListScreen;

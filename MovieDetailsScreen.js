import React from 'react';
import {
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetailed: null,
      videos: null,
    };
  }

  //Fetches more detailed information about the movie.
  async getMovieDetailed() {
    const movie = this.props.movie;

    var movieId = movie.id;
    var APIkey = 'c7c85ce5e31c4bdb6ca545db7d289b06';
    var movieDetailedUrl =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '?api_key=' +
      APIkey +
      '&append_to_response=videos';

    console.log(movieDetailedUrl);

    fetch(movieDetailedUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({movieDetailed: data, videos: data.videos.results}),
      );
  }

  itemPressed(index) {
    this.props.navigation.navigate('Video', {
      videoId: this.state.videos[index].key,
    });
  }

  componentDidMount() {
    this.getMovieDetailed();
  }

  render() {
    if (this.state.movieDetailed === null) {
      return (
        <View>
          <Text style={styles.loadingText}>Loading, please wait...</Text>
        </View>
      );
    }

    var movie = this.state.movieDetailed;
    var videos = this.state.videos;

    console.log(videos);

    var imagePath = 'http://image.tmdb.org/t/p/w500';
    var imageurl = imagePath + movie.backdrop_path;

    /* Generates a string containing all genres of the movie. 
    Comma is placed between genres, but not at the end. */
    var genres = '';
    movie.genres.forEach((genre, index) => {
      if (index === movie.genres.length - 1) {
        genres += genre.name;
      } else {
        genres += genre.name + ', ';
      }
    });

    return (
      <ScrollView>
        <View style={styles.movieDetails}>
          <Image
            source={{uri: imageurl}}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.movieDetailsTitle}>{movie.title}</Text>
          <Text style={styles.movieDetailsText}>{movie.release_date}</Text>
          <Text style={styles.movieDetailsText}>{movie.overview}</Text>
          <Text style={styles.movieDetailsText}>Genres: {genres}</Text>
          <Text style={styles.movieDetailsText}>
            Runtime: {movie.runtime} min.
          </Text>
          <View style={styles.movieDetailsVideos}>
            <Text style={styles.movieDetailsText}>Videos:</Text>
            {videos.map((video, index) => {
              return (
                <Text
                  style={styles.movieDetailsLink}
                  key={index}
                  onPress={() => {
                    this.itemPressed(index);
                  }}>
                  {video.name}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

function MovieDetailsScreen({navigation, route}) {
  const movieDetailed = route.params.movie;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <MovieDetails
            movie={movieDetailed}
            navigation={navigation}></MovieDetails>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    margin: 20,
  },
  movieDetails: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    alignSelf: 'stretch',
    height: 250,
  },
  movieDetailsTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
  },
  movieDetailsText: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  movieDetailsVideos: {
    alignItems: 'center',
    margin: 10,
  },
  movieDetailsLink: {
    color: 'blue',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default MovieDetailsScreen;

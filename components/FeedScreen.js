import React, { useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions';
import PostItem from './PostItem';

const FeedScreen = () => {
  const navigation = useNavigation();
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts]);

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleEditPost = (post) => {
    navigation.navigate('EditPost', { post });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem post={item} deletePost={handleDeletePost} editPost={handleEditPost} />
        )}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        windowSize={5}
        getItemLayout={(data, index) => (
          { length: 200, offset: 200 * index, index }
        )}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddPost')}
      >
        <Text style={styles.buttonText}>+ POSTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111216',
    paddingTop: 16,
    paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 100,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFF61A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111216',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FeedScreen;

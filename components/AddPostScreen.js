import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/actions';
import Button from './shared/Button';

const AddPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddPost = () => {
    if (!title || !content) {
      alert("Le titre et le contenu sont obligatoires.");
      return;
    }
    const newPost = {
      id: Date.now(),
      title,
      content,
      image,
      date: new Date().toISOString(),
    };
    dispatch(addPost(newPost));
    navigation.goBack();
  };

  const pickImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButtonContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButtonContainer} onPress={handleAddPost}>
          <Text style={styles.postButtonText}>POSTER</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="Titre ton poste"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Quoi de neuf ?"
        placeholderTextColor="#888"
        value={content}
        onChangeText={setContent}
        multiline
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.bottomBar}>
        <Button style={styles.imageButton} onPress={pickImage} title="Ajouter une image" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111216',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  closeButtonContainer: {
    padding: 5,
  },
  closeButton: {
    color: '#fff',
    fontSize: 30,
  },
  postButtonContainer: {
    backgroundColor: '#FFF61A',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  postButtonText: {
    color: '#111216',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleInput: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 16,
  },
  contentInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 18,
    textAlignVertical: 'top',
    marginTop: 10,
    color: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  imageButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default AddPostScreen;

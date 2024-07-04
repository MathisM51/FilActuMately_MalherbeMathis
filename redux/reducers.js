import { ADD_POST, UPDATE_POST, DELETE_POST } from './actions';
import feedImage from '../assets/feed.png';

const initialState = {
  posts: [
    {
      id: 1,
      title: "Bienvenue sur le fil d'actualité !",
      content: 'Vous pouvez suivre les dernières nouvelles ici.\n\nPostez, éditez et supprimez vos propres posts.\nAmusez-vous bien !',
      image: feedImage,
      date: new Date(new Date().getTime() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: 'Création de Mathis Malherbe',
      content: "Fil d'actualité pour la candidature d'alternance en développement d'application chez Mately.",
      image: null,
      date: new Date().toISOString(),
    },
  ],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;

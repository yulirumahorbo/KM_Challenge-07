import {firebase} from '@react-native-firebase/database';

export const myDatabase = firebase
  .app()
  .database(
    'https://rn1-chapter-7-default-rtdb.asia-southeast1.firebasedatabase.app',
  );

import { db } from "../../../firebase/config"
import { addDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore'


const createRestaurant = async (formData) => {
  // Ensure formData includes the ratings field initialized to an empty array
  //gör om denna nu eftersom det inte innehåller ratings längre
  const formDataWithRatings = { ...formData, ratings: [] };

  const collectionRef = collection(db, 'restaurants');
  const docRef = await addDoc(collectionRef, formDataWithRatings);

  if (!docRef.id) {
    throw new Error('Something went wrong');
  }

  return { id: docRef.id, ...formDataWithRatings };
};

const getAllRestaurants = async () => {
  const collectionRef = collection(db, 'restaurants')
  const querySnapshot = await getDocs(collectionRef)
  const restaurants = []
  querySnapshot.forEach((doc) => {
    restaurants.push({id: doc.id, ...doc.data()})
  })

  return restaurants
}

const getRestaurantsByIds = async (ids) => {
  const restaurants = [];
  for (const id of ids) {
    const docRef = doc(db, 'restaurants', id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      restaurants.push({ id: docSnapshot.id, ...docSnapshot.data() });
    }
  }
  return restaurants;
};


const getRestaurant = async (collection, id) => {
  const docRef = doc(db, collection, id)
  const docSnapshot = await getDoc(docRef)

  // if(!docSnapshot.exists()) {
  //   return
  // }

  return { id: docSnapshot.id, ...docSnapshot.data() }
}

const restaurantService = {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  getRestaurantsByIds
}

export default restaurantService
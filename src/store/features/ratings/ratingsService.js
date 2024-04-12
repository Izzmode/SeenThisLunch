import { db } from "../../../firebase/config"
import { addDoc, collection, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'

const addRatingAsync = async (userId, restaurantId, rating) => {
  try {
    const ratingsCollectionRef = collection(db, 'ratings')
    const q = query(collection(db, "ratings"), where('restaurantId', '==', restaurantId), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref
        await updateDoc(docRef, { rating, updatedAt: serverTimestamp() })
      })
    } else {
      await addDoc(ratingsCollectionRef, { userId, restaurantId, rating, updatedAt: serverTimestamp() })
    }
  } catch (error) {
    console.error("Error adding/updating rating: ", error)
    throw error
  }
};

const getRatingsByRestaurantAsync = async (restaurantId) => {
  try {
    const q = query(collection(db, "ratings"), where('restaurantId', '==', restaurantId));
    const querySnapshot = await getDocs(q);
    let ratings = []
    querySnapshot.forEach((doc) => {
      ratings.push(doc.data().rating)
    });
    return ratings
  } catch(err) {
    console.log(err)
  }
};

const getAllRatingsAsync = async () => {

  try{
    const querySnapshot = await getDocs(collection(db, "ratings"));
    let ratings = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.restaurantId && data.rating) {
        ratings.push({ restaurantId: data.restaurantId, rating: data.rating });
      }
    });
    return ratings;

  } catch(err) {
      console.error(err);
      throw err;
  }
}

const getRatingsByUserAsync = async (userId) => {
  try {
    const q = query(collection(db, "ratings"), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    let userRatings = []
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const updatedAt = data.updatedAt ? data.updatedAt.toDate() : null;

      userRatings.push({'rating': data.rating, updatedAt, 'restaurant': data.restaurantId})
    });
    return userRatings
  } catch(err) {
    console.log(err)
  }
};

const ratingsService = {
  addRatingAsync,
  getRatingsByRestaurantAsync,
  getRatingsByUserAsync,
  getAllRatingsAsync
}

export default ratingsService
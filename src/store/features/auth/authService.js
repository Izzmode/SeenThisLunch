import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../../firebase/config'

const signup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email
  }
  return user
}
const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email
  }
  return user
}
const logout = async () => {
  return await signOut(auth)
}

const authService = {
  signup,
  login,
  logout
}

export default authService
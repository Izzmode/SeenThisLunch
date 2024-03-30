import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase/config'

const signup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = {
    // ...userCredential,
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    verifiedEmail: userCredential.user.emailVerified
  }
  await sendEmailVerification(userCredential.user)
  console.log(userCredential)
  console.log(userCredential.user, 'user')
  if(!userCredential.user.emailVerified) {

    return
  } else {
    return user
  }
}

const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    verifiedEmail: userCredential.user.emailVerified
  }
  return user
}
const logout = async () => {
  return await signOut(auth)
}

const resetPassword = async (email) => {
//kolla om email är registrerad
  
return sendPasswordResetEmail(auth, email);
}

const authService = {
  signup,
  login,
  logout,
  resetPassword
}

export default authService
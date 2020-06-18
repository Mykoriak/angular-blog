export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface Post {
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

// responses block
export interface FireBaseAuthResponse {
  idToken: string
  expiresIn: string
}

export interface FirebaseCreateResponse {
  name: string
}

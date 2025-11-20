export interface User {
  id: number
  name: string
  email: string
  phone?: string
  website?: string
  company?: string
  avatar?: string
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

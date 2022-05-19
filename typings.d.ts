export interface Post {
  _id: string
  _createdAt: string
  title: string
  author: {
    name: string
    image: string
  }
  mainImage: {
    assets: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [object]
  comments: [Comment]
}
export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  createdAt: string
  _id: string
  _rev: string
  _type: string
  updatedAt: string
}

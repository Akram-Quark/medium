import React from 'react'
import { Post } from '../typings'
import PostComp from './Post'

type Props = {
  posts: [Post]
}

const PostsComp = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
      {posts.map((post: Post) => {
        return <PostComp key={post._id} post={post} />
      })}
    </div>
  )
}

export default PostsComp

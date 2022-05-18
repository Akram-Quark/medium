import Link from 'next/link'
import React from 'react'
import { Post } from '../typings'
import { urlFor } from '../sanity'
import Image from 'next/image'

type Props = {
  post: Post
}

function PostComp({ post }: Props) {
  return (
    <Link key={post._id} href={`/posts/${post.slug.current}`}>
      <div>
        <Image
          src={urlFor(post.mainImage).url()!}
          layout="fill"
          objectFit="contain"
          priority
        ></Image>
        <div className="flex justify-between bg-white p-5">
          <div>
            <p>{post.title}</p>
            <p>
              Created at {post._createdAt} By {post.author.name}
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()!}
          />
        </div>
      </div>
    </Link>
  )
}

export default PostComp

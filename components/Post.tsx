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
    <Link href={`/posts/${post.slug.current}`}>
      <div className="group rounded-lg border hover:cursor-pointer">
        <div className="relative h-60 w-full">
          <Image
            className=" w-full  transition-transform duration-200 ease-in-out group-hover:scale-105 "
            src={urlFor(post.mainImage).url()!}
            objectFit="cover"
            layout="fill"
          />
        </div>

        <div className="flex justify-between bg-white p-5">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-xs text-gray-600">
              Published By {post.author.name}
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

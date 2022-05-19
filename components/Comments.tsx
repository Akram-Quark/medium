import React from 'react'
import { Comment } from '../typings'

type Props = {
  comments: [Comment]
}

const Comments = ({ comments }: Props) => {
  return (
    <div className="mx-auto my-10 flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-blue-500">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />
      {comments.map((c) => (
        <div key={c._id}>
          <p>
            <span className="text-blue-700">{c.name} :</span> {c.comment}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Comments

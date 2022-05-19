import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Comments from '../../components/Comments'
interface Props {
  post: Post
}
interface FormInput {
  _id: string
  name: string
  email: string
  comment: string
}

function post({ post }: Props) {
  console.log(post)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }
  return (
    <main>
      <Header />
      <img
        src={urlFor(post.mainImage).url()}
        className="h-40 w-full object-cover"
        alt="Banner"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-4xl">{post.title}</h1>
        <div className="flex items-center space-x-2">
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()}
            alt="Author image"
          />
          <p className="text-xs font-extralight">
            Blog post by{' '}
            <span className="text-cyan-600">{post.author.name} </span> at{' '}
            {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-4">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                ;<h1 className="my-5 text-2xl font-bold">{props}</h1>
              },
              h2: (props: any) => {
                ;<h2 className="my-5 text-xl font-bold">{props}</h2>
              },
              li: ({ children }: any) => {
                ;<li className="ml-4 list-disc">{children}</li>
              },
              link: ({ href, children }: any) => {
                ;<a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              },
            }}
          />
        </div>
        <hr className="my-5  mx-auto max-w-lg border border-gray-700" />
        <h1 className="my-5 text-2xl font-bold">
          {' '}
          Dont hesitate to leave a comment
        </h1>
        {submitted ? (
          <div className="my-10 mx-auto flex max-w-2xl flex-col bg-blue-500 p-10 text-white">
            <h3 className="text-3xl font-bold ">Thank you for the comment</h3>
            <p>Once it's been approved,it will appear bellow !!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
          >
            <input type="hidden" value={post._id} {...register('_id')} />
            <label className="mb-5 block">
              <span className="text-gray-700">Name</span>
              <input
                {...register('name', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                type="text"
                name="name"
                placeholder="jhon doe"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700">Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                type="email"
                name="email"
                placeholder="jhon_doe@maile.com"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                placeholder="Say something please ... "
                rows={8}
                name="comment"
                className="form-textarea mt-1 block w-full border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
              />
            </label>
            <div className="my-2 flex flex-col">
              {errors.name && (
                <span className="text-red-500">The name field is required</span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  The email field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  The comment field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded bg-blue-700 py-2 font-bold text-white shadow outline-none hover:bg-gray-200 hover:text-blue-700"
            >
              Submit
            </button>
          </form>
        )}
        {/*comments part  */}
        <Comments comments={post.comments} />
      </article>
    </main>
  )
}

export default post
export const getStaticPaths = async () => {
  const query = `
    *[_type=="post"]{
        _id,
        slug{current}

    }
    
    `
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
*[_type=="post"&& slug.current==$slug][0]{
    _id,
    _createdAt,
    title,
    author->{
        name,
        image
    },
  'comments':*[_type=="comment"&&post._ref==^._id&&approved==true],
  mainImage,
  slug,
  body

}


`
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  if (!post) return { notFound: true }
  return {
    props: {
      post: post,
    },
    revalidate: 16,
  }
}

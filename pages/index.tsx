import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { sanityClient } from '../sanity'
import { Post } from '../typings'
import PostsComp from '../components/Posts'
interface Props {
  posts: [Post]
}
const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Clone </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/*hero section */}
      <Hero />

      {/*posts section */}
      <PostsComp posts={posts} />
    </div>
  )
}

export default Home
export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
    title,
    author->{
      name,
      image
    },
    mainImage,
    slug
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}

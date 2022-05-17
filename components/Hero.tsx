import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className="flex items-center justify-between border-y-2 border-y-gray-700 bg-blue-300 p-10">
      <div className="space-y-3 px-14">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="text-gray-600  underline">Medium</span> is a place to
          write read,and connect
        </h1>
        <h2>
          Discover stories, thinking, and expertise from writers on any topic.
        </h2>
      </div>
      <div className="hidden  font-serif font-bold md:block md:text-7xl lg:text-9xl">
        M
      </div>
    </div>
  )
}

export default Hero

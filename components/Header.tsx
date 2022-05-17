import Link from 'next/link'

type Props = {}

function Header({}: Props) {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-4">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <img
            src="https://links.papareact.com/yvf"
            className="w-40 object-contain hover:cursor-pointer"
          />
        </Link>
        <div className="hidden items-center space-x-4 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-gray-600 py-1 px-4 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-blue-400">
        <h3>Sign in</h3>
        <h3 className="rounded-full border border-gray-300 py-1 px-4">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header

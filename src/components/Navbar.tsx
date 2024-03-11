import Link from 'next/link'
import Logo from '@/Assets/logo.png'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className='fixed w-full h-20 bg-[#13162b] flex items-center justify-between px-28 overflow-hidden'>
      <div>
        <Image src={Logo} alt="" className='h-16 w-36'/>
      </div>
      <div className='flex items-center text-xl font-semibold text-white gap-10'>
        <Link href="/"><button className="navbar-button">Home</button></Link>
        <Link href="/user"><button className="navbar-button">Rooms</button></Link>
        <Link href="/about"><button className="navbar-button">About</button></Link>
        <button className='p-3 border border-purple-950 text-lg rounded'>Join Chat</button>
      </div>
    </nav>
  )
}

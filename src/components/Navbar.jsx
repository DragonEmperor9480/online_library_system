import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-base-200">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Online Library</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Browse Books</Link></li>
            <li><Link to="/add">Add Book</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar 
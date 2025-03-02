import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound 
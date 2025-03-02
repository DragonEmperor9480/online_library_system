import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllBooks } from '../store/booksSlice'

function Home() {
  const dispatch = useDispatch()
  const { items: books, status, error } = useSelector(state => state.books)

  useEffect(() => {
    dispatch(fetchAllBooks())
  }, [dispatch])

  if (status === 'loading') {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-error">Error: {error}</div>
  }

  // Ensure books is an array before using array methods
  const booksArray = Array.isArray(books) ? books : []
  
  // Get unique categories from the genres arrays
  const categories = [...new Set(booksArray.flatMap(book => book.genre))]

  // Get some featured books (first 4 books)
  const featuredBooks = booksArray.slice(0, 4)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Online Library</h1>
        <p className="text-lg">Discover your next favorite book</p>
      </div>

      <div className="grid gap-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <Link
              key={category}
              to={`/books/${category}`}
              className="btn btn-outline"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <h2 className="text-2xl font-semibold">Featured Books</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredBooks.map(book => (
            <div key={book.id} className="card bg-base-200">
              <figure className="px-4 pt-4">
                <img 
                  src={book.cover_image} 
                  alt={book.title} 
                  className="rounded-xl h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{book.title}</h3>
                <p>By {book.author}</p>
                <p className="text-sm">{book.publication_year}</p>
                <div className="card-actions justify-end">
                  <Link to={`/book/${book.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home 
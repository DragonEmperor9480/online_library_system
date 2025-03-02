import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchAllBooks } from '../store/booksSlice'
import SearchBar from '../components/SearchBar'

function BrowseBooks() {
  const dispatch = useDispatch()
  const { category } = useParams()
  const { items: books, status, error } = useSelector(state => state.books)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchAllBooks({ search: searchTerm }))
  }, [dispatch, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  if (status === 'loading') {
    return <div className="text-center py-8">Loading...</div>
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-error">Error: {error}</div>
  }

  const filteredBooks = category 
    ? books.filter(book => book.genre.includes(category))
    : books

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Browse Books {category ? `- ${category}` : ''}
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="grid md:grid-cols-3 gap-4">
        {filteredBooks.map(book => (
          <div key={book.id} className="card bg-base-200 shadow-xl">
            <figure className="px-4 pt-4">
              <img src={book.cover_image} alt={book.title} className="rounded-xl h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p>By {book.author}</p>
              <p>Published: {book.publication_year}</p>
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
  )
}

export default BrowseBooks 
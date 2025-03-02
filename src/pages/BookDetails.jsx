import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingleBook } from '../store/booksSlice'

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentBook: book, status, error } = useSelector(state => state.books)

  useEffect(() => {
    dispatch(fetchSingleBook(id))
  }, [dispatch, id])

  if (status === 'loading') {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error || !book) {
    return <div className="text-center py-8 text-error">Book not found</div>
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={book.cover_image} alt={book.title} className="rounded-xl h-64 object-cover" />
          <div className="space-y-4">
            <h1 className="card-title text-3xl">{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <p><strong>Genres:</strong> {book.genre.join(', ')}</p>
            <p><strong>Description:</strong> {book.description}</p>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(-1)}
          >
            Back to Browse
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookDetails 
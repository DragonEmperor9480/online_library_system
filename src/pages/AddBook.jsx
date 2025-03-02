import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/booksSlice'

function AddBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: '',
  })

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.author) newErrors.author = 'Author is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(addBook({ ...formData, rating: parseFloat(formData.rating) }))
      navigate('/browse')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="text-error">{errors.title}</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Author</span>
          </label>
          <input
            type="text"
            name="author"
            className={`input input-bordered ${errors.author ? 'input-error' : ''}`}
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <span className="text-error">{errors.author}</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="category"
            className={`select select-bordered ${errors.category ? 'select-error' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
          {errors.category && <span className="text-error">{errors.category}</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span className="text-error">{errors.description}</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating (0-5)</span>
          </label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            className={`input input-bordered ${errors.rating ? 'input-error' : ''}`}
            value={formData.rating}
            onChange={handleChange}
          />
          {errors.rating && <span className="text-error">{errors.rating}</span>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Book
        </button>
      </form>
    </div>
  )
}

export default AddBook 
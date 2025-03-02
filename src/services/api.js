const BASE_URL = '/api/api/v1/books';

export const fetchBooks = async (params = {}) => {
  const queryParams = new URLSearchParams(params);
  try {
    const response = await fetch(`${BASE_URL}${queryParams.toString() ? '?' + queryParams.toString() : ''}`);
    if (!response.ok) {
      if (response.status === 404) {
        return []; // Return empty array if no books found
      }
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return empty array on error
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}; 
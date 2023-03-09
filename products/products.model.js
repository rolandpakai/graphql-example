const products = [
  {
    id: 'redshoe',
    description: 'Red Shoe',
    price: 42.12,
    reviews: [],
  },
  {
    id: 'bluejean',
    description: 'Blue Jean',
    price: 55.55,
    reviews: [],
  }
];

export function getAlProducts() {
  return products;
};

export function getProductsByPrice(min, max) {
  return products.filter(product => 
    product.price >= min && product.price <= max)
};

export function getProductById(id) {
  return products.find(product => product.id === id)
};

export function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  };

  products.push(newProduct);

  return newProduct;
};

export function addNewProductReview(id, rating, comment) {
  const product = getProductById(id);

  if (product) {
    const review = {
      rating,
      comment,
    }
    product.reviews.push(review);
  
    return review;
  }
};
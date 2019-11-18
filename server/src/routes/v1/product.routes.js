import { productController } from '../../controllers'
const product = [
    {
        method: 'GET',
        path: '/api/products',
        handler:productController.getProducts
    },
    {
        method: 'GET',
        path: '/api/product/{id}',
        handler:productController.getSingleProduct
    },
    {
        method: 'PATCH',
        path: '/api/product/{id}',
        handler:productController.updateProduct
    },
    {
        method: 'DELETE',
        path: '/api/product/{id}',
        handler:productController.deleteProduct
    },
  ];
  export default product
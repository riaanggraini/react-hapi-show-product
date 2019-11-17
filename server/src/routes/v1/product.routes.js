import { productController } from '../../controllers'

const product = [
    {
      method: 'GET',
      path: '/api/product',
      handler:productController.getProduct
    },
  ];
  export default product
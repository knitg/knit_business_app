import { CONST_PRODUCT } from "../../constants/product.constant";

const initialState = {};

export default productReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {

    case CONST_PRODUCT.PRODUCT_LOADING:
      const loading = action.loading
      return { ...state, loading};

    /*** 
     *  >>>>> product CRUD <<<<<<<
     * */
          
    case CONST_PRODUCT.PRODUCT_LIST:
      const productList = action.data;
      return { ...state, productList };

    case CONST_PRODUCT.PRODUCT_ADD:
      console.log('action >>> ', action);
      const product_id = action.data;
      return { ...state, product_id };
    
    case CONST_PRODUCT.PRODUCT_UPDATE:
      const update_product_id = action.data;
      return { ...state, update_product_id };

    case CONST_PRODUCT.PRODUCT_DELETE:
      const delete_product_id = action.data;
      return { ...state, delete_product_id };
    
    default:
      return state;
  }
};

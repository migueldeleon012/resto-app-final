const inititalState = {
  products: [],
  categories: ['All', 'Food', 'Drinks', 'Desserts'],
  selectedCategory: 'All',
  total: 0,
  cart: [],
  currentUser: {},
  isLoggedIn: false,
  message: { msg: 'Alert', background: 'green', show: '' },
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    //product related
    case 'INIT_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'LOGIN':
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, currentUser: {}, isLoggedIn: false };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };

    case 'DELETE_PRODUCT':
      let filteredProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, products: filteredProducts };

    case 'CHANGE_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };

    case 'EDIT_PRODUCT':
      let filteredEditProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      return { ...state, products: [...filteredEditProducts, action.payload] };

    case 'DISPLAY_MODAL':
      return { ...state, displayModal: !state.displayModal };

    default:
      return state;
  }
};

export default reducer;

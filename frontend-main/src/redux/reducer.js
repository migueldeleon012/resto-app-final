const inititalState = {
  products: [],
  categories: ['All', 'Food', 'Drinks', 'Desserts'],
  selectedCategory: 'All',
  total: 0,
  cart: [],
  currentUser: {},
  isLoggedIn: false,
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    //product related
    case 'INIT_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'LOGIN':
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, currentUser: {}, isLoggedIn: false };

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

    //CART RELATED
    case 'ADD_TO_CART':
      let duplicate = state.cart.find((item) => item.id === action.payload.id);
      let copy = state.cart.slice(0);
      if (duplicate) {
        duplicate.qty++;
        return;
      } else {
        let found = state.products.find(
          (product) => product.id === action.payload.id
        );
        let toSortCopy = [...copy, found];
        let sortedCopy = toSortCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
        return { ...state, cart: sortedCopy };
      }

    case 'ADD_QUANTITY':
      let found = state.cart.find((item) => item.name === action.payload.name);
      found.qty++;

      let copyCart = state.cart.slice(0);
      let filteredCopy = copyCart.filter((item) => item.name !== found.name);
      let toSortCopy = [...filteredCopy, found];
      let sortedCopy = toSortCopy.sort((a, b) => (a.name > b.name ? 1 : -1));

      return { ...state, cart: sortedCopy };

    case 'MINUS_QUANTITY':
      action.payload.qty--;
      let filteredArray = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      if (action.payload.qty === 0) {
        let sortedCopy = filteredArray.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        return { ...state, cart: sortedCopy };
      } else {
        let toSortCopy = [...filteredArray, action.payload];
        let sortedCopy = toSortCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
        return { ...state, cart: sortedCopy };
      }

    case 'DELETE_CART_ITEM':
      let filteredCartProducts = state.cart.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, cart: filteredCartProducts };

    default:
      return state;
  }
};

export default reducer;

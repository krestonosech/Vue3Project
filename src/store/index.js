/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import createPersistedState from 'vuex-persistedstate';
import jsonData from '../components/Good.json';

const store = createStore({
  state() {
    const mainItems = jsonData.map((item) => ({ ...item, quantity: 0 }));
    return {
      searchItems: [],
      feedback: false,
      afterOrder: false,
      BooleanSearch: false,
      inputStr: '',
      jsonData,
      jojo: [],
      authorization: false,
      NickName: '',
      mainItems,
      reviewItems: [],
      cartItems: [],
      favoriteItems: [],
      navbarPosition: 0,
      MouseIn: false,
      confirmHoverIn: 0,
      error: {
        excessive: false,
      },
    };
  },
  getters: {
    getQuantity: (state) => state.mainItems.quantity,
    getUser: (state) => state.jojo,
    getAuthorization: (state) => state.authorization,
    getnavbarPosition: (state) => state.navbarPosition,
    getMouse: (state) => state.MouseIn,
    getCartItems: (state) => state.cartItems,
    getfavoriteItems: (state) => state.favoriteItems,
    getQuantityInCart: (state) => (itemId) => {
      const itemInCart = state.cartItems.find((cartItem) => cartItem.id === itemId);
      return itemInCart ? itemInCart.quantity : 0;
    },
  },
  mutations: {
    addUser(state, user) {
      if (state.jojo.some((u) => u.email === user.email)) {
        console.log('Такой пользователь уже есть в базе');
      } else {
        state.jojo.push(user);
      }
    },

    setCartItems(state, items) {
      state.cartItems = items;
    },

    setFavItems(state, items) {
      state.favoriteItems = items;
    },

    setNickNameClear(state) {
      state.NickName = '';
    },

    setMaiItems(state, items) {
      state.mainItems = items;
    },

    setAuthorization(state, payload) {
      state.authorization = payload;
    },

    setnavbarPosition(state, payload) {
      state.navbarPosition = payload;
    },

    setMouse(state, payload) {
      state.MouseIn = payload;
    },

    addToCart(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      const mainItem = state.mainItems.find((i) => i.id === item.id);
      if (!existingItem) {
        state.cartItems.push({ ...item, quantity: 0 });
      }
      if (mainItem) {
        this.commit('increaseQuantity', item);
      }
    },

    addReviews(state, item) {
      state.reviewItems.push(item);
    },

    removeReviews(state, item) {
      // Находим индекс предмета в массиве
      const index = state.reviewItems.findIndex((review) => review.nickName === item.nickName);

      // Если предмет найден, удаляем его из массива
      if (index !== -1) {
        state.reviewItems.splice(index, 1);
      }
    },

    removeFromCart(state, item) {
      state.cartItems = state.cartItems.filter((u) => u.id !== item);
      const mainItem = state.mainItems.find((i) => i.id === item);
      if (mainItem) {
        mainItem.quantity = 0;
      }
    },

    addToFavorite(state, item) {
      state.favoriteItems.push(item);
    },

    removeFromFavorite(state, itemId) {
      state.favoriteItems = state.favoriteItems.filter((u) => u.id !== itemId);
    },

    decreaseQuantity(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      const mainItem = state.mainItems.find((i) => i.id === item.id);
      if (existingItem) {
        if (existingItem.quantity < 2) {
          mainItem.quantity = 1;
          this.commit('removeFromCart', item.id);
        }
        existingItem.quantity -= 1;
        mainItem.quantity = existingItem.quantity;
      }
    },

    increaseQuantity(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      const mainItem = state.mainItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        mainItem.quantity = existingItem.quantity;
      }
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('addUser', user);
    },

    addToCart({ commit }, item) {
      commit('addToCart', item);
    },

    removeFromCart({ commit }, item) {
      commit('removeFromCart', item);
    },

    addToFavorite({ commit }, item) {
      commit('addToFavorite', item);
    },

    removeFromFavorite({ commit }, item) {
      commit('removeFromFavorite', item);
    },

    decreaseQuantity({ commit }, item) {
      commit('decreaseQuantity', item);
    },

    increaseQuantity({ commit }, item) {
      commit('increaseQuantity', item);
    },

    addReviews({ commit }, item) {
      commit('addReviews', item);
    },

    setCartItems({ commit }, items) {
      commit('setCartItems', items);
    },

    setFavItems({ commit }, items) {
      commit('setFavItems', items);
    },

    setMaiItems({ commit }, items) {
      commit('setMaiItems', items);
    },

    setAuthorization({ commit }, items) {
      commit('setAuthorization', items);
    },

    setnavbarPosition({ commit }, items) {
      commit('setnavbarPosition', items);
    },

    setMouse({ commit }, items) {
      commit('setMouse', items);
    },

    removeReviews({ commit }, items) {
      commit('removeReviews', items);
    },

    setNickNameClear({ commit }) {
      commit('setNickNameClear');
    },
  },
  plugins: [createPersistedState()],
});

export default store;

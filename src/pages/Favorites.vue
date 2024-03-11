<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
  <h2>Избранное</h2>
    <div class="cart">
      <h3 v-if="favoriteItems.length == 0">Попробуйте добавить товар в Избранное.</h3>
    <div class="cart__items">
    <div v-for="item in favoriteItems" :key="item.id">
        <div class="cart__items__cards">
          <img :src="item.image" width="200" height="200" alt="Photo">
          <div class="cart__items__cards__name__price">
          <p style="width: 200px;">{{ item.name }}</p>
          <p style="color: red; margin-top: 20px;">{{ item.price }} ₽</p>
        </div>
          <button @click="removeFromFavorite(item.id); refreshPage()">Убрать из избранного</button>
        </div>
      </div>
      </div>
    </div>
  </template>

<script>

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  components: {
  },
  computed: {
    store() {
      return this.$store.state;
    },
    showLogout() {
      return this.$store.state.authorization;
    },
  },
  created() {
    this.favoriteItems = this.store.favoriteItems;
  },
  methods: {
    removeFromFavorite(itemId) {
      this.$store.commit('removeFromFavorite', itemId);
    },
    refreshPage() {
      window.location.reload();
    },
  },
  mutations: {
    removeFromCart(state, itemId) {
      // eslint-disable-next-line no-param-reassign
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
  },
};
</script>

  <style scoped>
  button {
    margin-top: 150px;
  }
  .cart__items__cards__name__price {
    display: flex;
    flex-direction: column;
  }
  button:hover {
    color: palevioletred;
  }
  .footer {
    position: absolute;
      bottom: 0;
  }
  .router {
    margin: 10px;
  }
  .router:hover {
    color: palevioletred
  }
  h2 {
    margin-left: 170px;
    color: black;
  }
  h3 {
    margin-left: 200px;
    margin-top: 10px;
    color: black;
  }
  .cart__items {
    display: flex;
    justify-content: center;
    flex-direction: row;
      margin-top: 50px;
  /*     margin: 50px 200px 200px 200px;
   */    flex-wrap: wrap;
  }
  .cart__items__cards {
      display: flex;
      margin: 70px 70px 20px 50px;
      flex-direction: column;
      justify-content: space-around;
      flex-direction: row;
      width: 600px;
      height: 200px;
      color: black;
      border: solid black 2px;
      background-color: white;
  }
  </style>

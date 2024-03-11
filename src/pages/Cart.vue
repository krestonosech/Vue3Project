<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
    <h2 class="h2">Корзина</h2>
    <h3 class="h3" v-if="cartItems.length == 0">Корзина пуста!</h3>
    <div class="cart">
  <div class="cart__items">
  <div v-for="item in cartItems" :key="item.id">
      <div class="cart__items__cards">
        <div class="cart__items__photo__name__price">
        <div class="cart__items__photo__name">
        <img :src="item.image" width="200" height="200" alt="Photo">
        <p style="width: 100px;">{{ item.name }}</p>
      </div>
      <div class="cart__items__price__quantity">
        <p class="cart__items__price">{{ item.price * item.quantity }} ₽</p>
        <div class="cart__items__counter__quantity">
            <button @click="decreaseQuantity(item)">-</button>
            <input style="width: 50px; appearance: none;" type="number" v-model.number="item.quantity" @input="updateQuantity(item)">
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <button class="cart__items__remove" @click="() => {removeFromCart(item.id); refreshPage()}">Убрать из корзины</button>
          </div>
      </div>
      </div>
    </div>
    </div>
    <div class="cart__items__end__price " v-if="cartItems.length != 0">
    <h2 style="margin: 20px;">Сумма заказа</h2>
    <div style="display: flex; margin-left: 20px;">
    <p>{{ getFormattedCount }} на сумму:</p>
    <p style="display: flex; width: 230px; justify-content: end;">{{ totalPrice }} ₽</p>
  </div>
  <div style="display: flex; margin: 10px 10px 10px 20px;">
    <p >Скидка StroySee</p>
    <p style=" color: red;display: flex; width: 260px; justify-content: end;">0 ₽</p>
  </div>
  <div style="display: flex; margin-left: 20px;">
    <h3>Итого:</h3>
    <h3 style="display: flex; width: 315px; justify-content: end;">{{ totalPrice }} ₽</h3>
  </div>
  <div style="display: flex; align-items: center; justify-content: center;">
  <router-link to="/deliver" class="cart__items__order__button">Перейти к оформлению</router-link>
</div>
</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cartItems: [],
      mainPrice: 0,
      mainQuantity: 0,
    };
  },
  components: {
  },
  computed: {
    getFormattedCount() {
      const count = this.getTotalCount;
      if (count % 10 === 1 && count !== 11) {
        return `${count} товар`;
      }
      if (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) {
        return `${count} товара`;
      }
      return `${count} товаров`;
    },
    getTotalCount() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    store() {
      return this.$store.state;
    },
    showLogout() {
      return this.$store.state.authorization;
    },
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
  created() {
    this.cartItems = this.store.cartItems;
  },
  methods: {
    removeFromCart(itemId) {
      this.$store.dispatch('removeFromCart', itemId);
    },
    refreshPage() {
      window.location.reload();
    },
    increaseQuantity(item) {
      this.$store.dispatch('increaseQuantity', item);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.dispatch('decreaseQuantity', item);
      } else {
        this.removeFromCart(item.id); // Удаление товара из корзины, если количество стало равно 0
        this.refreshPage();
      }
    },
    updateQuantity(item) {
      if (item.quantity === 0 || item.quantity < 0) {
        this.removeFromCart(item.id); // Предотвращение отрицательного значения
        this.refreshPage();
      }
    },
    // eslint-disable-next-line vue/no-dupe-keys, no-dupe-keys
    removeFromCart(item) {
      this.$store.dispatch('removeFromCart', item);
    },
    endPrice() {
      this.mainPrice = this.item.price * this.item.quantity;
    },
    endQuantity() {
      this.mainQuantity = this.item.quantity;
    },
  },
  mutations: {
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.cart__items__end__price {
  margin-top: 50px;
  margin-right: 100px;
  width: 400px;
  height: 300px;
  border: solid black 2px;
}
.cart__items__remove:hover {
  color: palevioletred;
}
.cart__items__order__button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: black;
  color: white;
  margin-top: 50px;
  width: 300px;
  border: black solid 2px;
}
.cart__items__photo__name{
  display: flex;
  flex-direction: row;
}
.cart__items__counter__quantity {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid gainsboro 2px;
}

.cart__items__counter__quantity button {
  background-color: white;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border: solid white 2px;
}
.cart__items__remove {
  display: flex;
  justify-content: end;
  margin-top: 50px;
}
.cart__items__price__quantity {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 150px;
}
.cart__items__counter__quantity button:hover {
  border: solid palevioletred 2px;
}

.cart__items__counter__quantity p {
  margin: 0 10px;
  font-size: 16px;
}
.router {
  margin: 10px;
}
.router:hover {
  color: palevioletred
}
.h2 {
  margin-left: 170px;
  color: black;
}
.h3 {
  margin-left: 200px;
  margin-top: 10px;
  color: black;
}
.cart__items__photo__name__price{
  display: flex;
  flex-direction: row;
}
.cart__items__price {
  display: flex;
  justify-content: end;
  /* margin-top: 50px;
  margin-left: 220px; */
  font-size: large;
}
.cart__items {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 100px;
    margin-top: 50px;
/*     margin: 50px 200px 200px 200px;
 */    flex-wrap: wrap;
}
.cart__items__cards {
    margin-bottom: 15px;
    border: solid 2px black;
    width: 600px;
    height: 200px;
    color: black;
    background-color: white;
}
.cart {
  background-color: white;
  display: flex;
  justify-content: space-around;
}
.heart {
  position: relative;
  width: 100px;
  height: 175px;
  background-color: red;
  box-shadow: -1px 0px 2px #444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
/* Определяем угол наклона */
  -webkit-transform: rotate(315deg);
  -moz-transform: rotate(315deg);
  -ms-transform: rotate(315deg);
  -o-transform: rotate(315deg);
  transform: rotate(315deg);
}
/* Формируем правую часть */
.heart:before {
  position: absolute;
  width: 175px;
  height: 100px;
  left: 0;
  bottom: 0;
  content: "";
  background-color: red;
  box-shadow: 0px 3px 3px #444444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 0 50px 50px 0;
}
/* Убираем тень при наведении */
.heart:hover:before, .heart:hover{
  box-shadow:none;
}
</style>

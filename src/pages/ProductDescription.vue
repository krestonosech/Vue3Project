<!-- eslint-disable max-len -->
<template>
  <navbar/>
  <div class="product">
    <div class="product__photos">
      <div style="margin-bottom: 20px; margin-right: 20px; margin-left: 10px;" v-for="(image, index) in product.images" :key="index" @click="displayImage(image)">
        <img class="product__photos__images" :src="image" alt="Product Image" width="100" height="100">
      </div>
    </div>
    <div class="product__details">
      <div v-if="displayedImage" class="product__details__displayed__image">
        <magnify class="product__details__zoomed__image" style="border: solid 3px black;" :imageSrc="displayedImage" alt="Displayed Product Image" width="400" height="400"/>
      </div>
      <div class="product__details__name">
        <h2 style="width: 500px;">{{ product.name }}</h2>
        <div class="product__details__rating">
          <p>{{ product.rating }}</p>
          <span class="d14" v-if="product.rating >= 0.5"></span>
          <span class="d14" v-if="product.rating >= 1.5"></span>
          <span class="d14" v-if="product.rating >= 2.5"></span>
          <span class="d14" v-if="product.rating >= 3.5"></span>
          <span class="d14" v-if="product.rating >= 4.5"></span>
        </div>
        <div class="product__details__rating__price">
        <p class="product__details__description">{{ product.description }}</p>
        <div class="product__details__price">
          <h2 style="font-size:xx-large; margin-bottom: 10px;">{{ product.price }} ₽</h2>
          <div class="product__details__add__to__cart">
            <router-link to="/deliver">
              <button @click="addToCart(product)" v-if="product.quantity < 1" style="margin-right: 30px; width: 40px;" class="product__details__main__buttons">Купить сейчас</button>
            </router-link>
          <button @click="addToCart(product)" v-if="product.quantity < 1" class="product__details__main__buttons">В корзину</button>
          </div>
          <div class="product__details__add__to__cart__counter">
          <div class="counter__quantity" v-if="product.quantity > 0">
            <button @click="decreaseQuantity(product)">-</button>
            <p>{{ product.quantity }}</p>
            <button @click="increaseQuantity(product)">+</button>
          </div>
          <router-link to="/" @click="Cart" style="margin-top: 5px;" v-if="product.quantity > 0">Корзина</router-link>
        </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  <!-- <div v-for="item in mainItems" :key="item.id">
  <div class="d14"></div>
  </div> -->
  <div class="footerr">
  <footerr/>
</div>
</template>

<script>
import jsonData from '../components/Good.json';
import Navbar from '../components/navbar.vue';
import Footerr from '../components/footer.vue';
import magnify from '../components/MagnifyingGlassImage.vue';

export default {
  components: {
    Navbar, Footerr, magnify,
  },
  data() {
    return {
      mainItems: [],
      product: {
        quantity: 0,
      },
      jsonData,
      displayedImage: null,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.mainItems = this.$store.state.mainItems;
    this.product = this.mainItems.find((item) => item.id === id);
    this.displayedImage = this.product.image;
  },
  computed: {

  },
  methods: {
    displayImage(image) {
      this.displayedImage = image;
    },
    store() {
      return this.$store.state;
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    increaseQuantity(product) {
      this.$store.dispatch('increaseQuantity', product);
    },
    decreaseQuantity(product) {
      this.$store.dispatch('decreaseQuantity', product);
    },
    Cart() {
      this.$store.dispatch('setnavbarPosition', 3);
    },
  },
};
</script>

<style scoped>
.product-image {
  position: relative;
  overflow: hidden;
}

.product-image img {
  transition: transform 0.5s;
}

.product__photos__images {
  border: solid 1px gainsboro;
}
.images:hover {
  opacity: 0.7;
  transition: opacity 0.7s ease;
  transition: border 0.7s ease;
  border: solid 1px black;
}
.product {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.product__photos {
  display: flex;
  flex-direction: column;
}

.photos img {
  margin-right: 10px;
  cursor: pointer;
}

.product__details {
  /* добавлен класс для разметки контейнера с информацией */
  display: flex;
  flex-direction: row;
}
.product__details__main__buttons {
  font-size: medium;
}
.product__details img {
  width: 300px;
  height: 300px;
}
.product__details__add__to__cart{
  display: flex;
  justify-content: center;
  align-items: center;
}
.product__details__add__to__cart__counter{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.product__details__name {
  margin-left: 20px;
}

.product__details__price {
  font-size: 18px;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid black 2px;
  margin-left: 70px;
}
.product__details__rating__price {
  display: flex;
  flex-direction: row;
}
.product__details__rating {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.product__details__description {
  margin-top: 20px;
  width: 500px;
}

.product__details__displayed__image img {
  width: 400px;
  height: 400px;
}
.footerrr {
  display: flex;
  justify-content: center;
  align-items: center;
    position: absolute;
    bottom: 0;
  }
  .footerr {
    margin-top: 180px;
  }
/* стили для нового класса info */
.info {
  flex: 1;
  order: 1; /* новый параметр для расположения элемента перед другими */
}
button:hover {
  color: palevioletred;
}
.photos img.selected {
  filter: brightness(70%); /* уменьшение яркости */
}
.counter__quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.counter__quantity button {
  background-color: white;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border: solid white 2px;
}

.counter__quantity button:hover {
  border: solid palevioletred 2px;
}

.counter__quantity p {
  margin: 0 10px;
  font-size: 16px;
}
.d14 {
    margin: 10px 0;
    height: 0;
    width: 0;
    position: relative;
    border-right: 10px solid transparent;
    border-bottom: 7px solid orange;
    border-left: 10px solid transparent;
    transform: rotate(35deg);
}
.d14:before,
.d14:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
}
.d14:before {
    top: -5.2px;
    left: -6.4px;
    border-bottom: 8px solid orange;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    transform: rotate(-35deg);
}
.d14:after {
    top: 0.4px;
    left: -10.6px;
    border-right: 10px solid transparent;
    border-bottom: 7px solid orange;
    border-left: 10px solid transparent;
    transform: rotate(-70deg);
}

</style>

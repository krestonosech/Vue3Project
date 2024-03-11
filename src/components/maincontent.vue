<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<!-- eslint-disable linebreak-style -->
<template>
 <div class="maincontent">
    <select v-model="filterKey1">
      <option value="default1">По умолчанию</option>
      <option value="low1">От наименьшой цены</option>
      <option value="high1">От наибольшей цены</option>
      <option value="low2">От меньшего рейтинга</option>
      <option value="high2">От большего рейтинга</option>
    </select>
  </div>
  <div class="maincontent__cards">
  <div v-for="item in filteredMovies" :key="item.id">
      <div class="maincontent__cards__items" @mouseover="HoverIn = item.id" @mouseleave="HoverIn = null">
        <div v-if="!isFavorite(item)" class="maincontent__cards__items_buttons">
        <HeartOutline @click="addToFavorites(item)"></HeartOutline>
    </div>
    <div v-if="isFavorite(item)" class="maincontent__cards__items_buttons">
        <Heart style="" @click="addToFavorites(item)"></Heart>
    </div>
    <router-link :to="'/product/' + item.id">
  <div style="display: flex;">
    <div v-if="hoveredItemId === item.id">
      <img :src="selectedImageIndex !== null ? item.images[selectedImageIndex] : item.image" alt="Displayed Product Image" width="200" height="200">
    </div>
    <div v-else>
      <img :src="item.image" width="200px" height="200px">
    </div>
    <div style="display: flex; flex-direction: column;">
    <div v-for="(image, index) in item.images" :key="index" @mouseover="hoveredItemId = item.id; selectedImageIndex = index" @mouseleave="hoveredItemId = null">
      <img :src="image" alt="Product Image" width="50" height="50" style="margin-right: 10px;">
    </div>
  </div>
  </div>
</router-link>
    <router-link :to="'/product/' + item.id">
      <p>{{ item.name }}</p>
    </router-link>
        <p style="color: palevioletred; font-size: large;">{{ item.price }} ₽</p>
        <div class="counter__quantity" v-if="item.quantity > 0">
            <button @click="decreaseQuantity(item)">-</button>
            <p>{{ item.quantity }}</p>
            <button @click="increaseQuantity(item)">+</button>
          </div>
        <button v-if="item.quantity < 10" class="maincontent__cards__items_main__button" @click="addToCart(item); OpenModal()">
  <router-link to="" class="maincontent__cards__items_main__button2" v-if="HoverIn === item.id">Добавить</router-link>
</button>
      </div>
    </div>
    </div>
<!--   <cart/>
 --></template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import Heart from 'vue-material-design-icons/Heart.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import jsonData from './Good.json';

export default {
  components: {
    Heart, HeartOutline,
  },
  data() {
    return {
      hoveredItemId: null,
      selectedImageIndex: null,
      filteredMainItems: [],
      mainItems: [],
      idd: 0,
      jsonData,
      filterKey1: 'default1',
      filterKey2: 'default2',
      HoverIn: false,
      error: {
        excessive: false,
      },
      selectedItemId: false,
      filteredMovies: [],
      inputStr: '',
      showSearch: false,
      BooleanSearch: false,
      displayedImage: null,
    };
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    filteredMovies() {
      if (this.$store.state.inputStr) {
        return this.filteredData.filter((item) => item.name.includes(this.$store.state.inputStr));
      }
      return this.filteredData;
    },
    filteredData() {
      const sortedData = [...this.mainItems];
      if (this.filterKey1 === 'low1') {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (this.filterKey1 === 'high1') {
        sortedData.sort((a, b) => b.price - a.price);
      }
      if (this.filterKey1 === 'low2') {
        sortedData.sort((a, b) => a.rating - b.rating);
      } else if (this.filterKey1 === 'high2') {
        sortedData.sort((a, b) => b.rating - a.rating);
      }
      return sortedData;
    },
    store() {
      return this.$store.state;
    },
  },
  created() {
    this.mainItems = this.store.mainItems;
  },
  methods: {
    filteredMoviesBut() {
      this.$store.state.BooleanSearch = true;
    },
    displayImage(image) {
      this.displayedImage = image;
    },
    isFavorite(item) {
      return this.$store.state.favoriteItems.some((favItem) => favItem.id === item.id);
    },
    addToFavorites(item) {
      // eslint-disable-next-line max-len
      const itemInFavorites = this.$store.state.favoriteItems.find((favoriteItem) => favoriteItem.id === item.id);
      if (!itemInFavorites) {
        this.$store.dispatch('addToFavorite', item);
      } else {
        this.$store.dispatch('removeFromFavorite', item.id);
      }
    },
    addToCart(item) {
      this.$store.dispatch('addToCart', item);
    },
    HoverOut() {
      this.$store.dispatch('setMouse', false);
    },
    MouseIn() {
      return this.$store.state.MouseIn;
    },
    /* filteredMoviesBut() {
      this.$store.state.searchItems = this.filteredMovies;
      console.log(this.$store.state.searchItems.length);
    }, */
    OpenModal() {
      this.isOpen = true;
    },
    CloseModal() {
      this.isOpen = false;
    },
    increaseQuantity(item) {
      this.$store.dispatch('increaseQuantity', item);
    },
    decreaseQuantity(item) {
      this.$store.dispatch('decreaseQuantity', item);
    },
    refreshPage() {
      window.location.reload();
    },

  },

};

</script>

<style scoped>

h2 {
  display: flex;
  justify-content: center;
  margin: 15px 15px;
  color: black;
}
.maincontent {
  display: flex;
  justify-content: end;
}
select {
  background: none;
  color: black;
  margin: 0 15px 0 15px;
}
.maincontent__cards {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
/*     margin: 50px 200px 200px 200px;
 */    flex-wrap: wrap;
}
.maincontent__cards__items_main__button {
  margin-top: 10px;
}
/* .buttonsToOtherPages {

} */
.maincontent__cards__items {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 270px;
    height: 400px;
    color: black;
    background-color: white;
    border: solid 2px white;
}
.maincontent__cards__items:hover {
  border: palevioletred 2px solid;
}
.cart {
  color: white;
  background-color: black;
  padding: 10px 250px 10px 250px;
  margin: 10px;
  margin-bottom: 20px;
  }
  a {
    color: white;
  }
  .maincontent__cards__items_main__button2 {
    display: flex;
  justify-content: center;
  color: white;
  background-color: black;
  padding: 0 10px 0 10px;
  }
 .maincontent__cards__items_main__button2:active {
  border: solid palevioletred 2px;
 }
 .heart {
  border: solid red 2px;
  position: relative;
  width: 10px;
  height: 18px;
  background-color: white;
  box-shadow: -1px 0px 2px #444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  -webkit-transform: rotate(315deg);
  -moz-transform: rotate(315deg);
  -ms-transform: rotate(315deg);
  -o-transform: rotate(315deg);
  transform: rotate(315deg);
}
.heart:before {
  border: solid red 2px;
  position: absolute;
  width: 13px;
  height: 6px;
  left: 0;
  bottom: 0;
  content: "";
  background-color: white;
  box-shadow: 0px 3px 3px #444444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 0 50px 50px 0;
}
.heart.active:before, .heart.active{
  border: solid red 2px;
  background-color: red;
}
.maincontent__cards__items_buttons {
  display: flex;
  justify-content: end;
  margin-right: 20px;
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
</style>

<!-- eslint-disable max-len -->
<template>
    <h3 class="">
        StroySee - лучший сайт для поиска строительных принадлежностей.
    </h3>
    <h4>
        Самые продоваемые товары этого месяца:
    </h4>

    <div class="first_attractive__cards">
  <div v-for="item in filteredData" :key="item.id">
      <div class="first_attractive__cards__items" @mouseover="HoverIn = item.id" @mouseleave="HoverIn = null">
        <img :src="item.image" width="200" height="200" alt="Photo" class="first_attractive__cards__image">
        <p>{{ item.name }}</p>
        <button class="first_attractive__cards__button" @click="Catalog">
  <router-link to="/" class="first_attractive__cards__button2" v-if="HoverIn === item.id">Узнать Подробнее</router-link>
</button>
      </div>
    </div>
    </div>
</template>

<style scoped>
h3 {
    text-align: center;
    margin: 50px;
}
h4 {
    text-align: center;
    margin-top: 90px;
}
.first_attractive__cards {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    flex-wrap: wrap;
}
.first_attractive__cards__items {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    color: black;
    background-color: white;
    border: white 2px solid;
}
.first_attractive__cards__items:hover {
  border: palevioletred 2px solid;
}
.first_attractive__cards__button2 {
    display: flex;
  justify-content: center;
  color: white;
  background-color: black;
  padding: 0 10px 0 10px;
  }
  .first_attractive__cards__button {
    margin-top: 15px;
    width: 200px;
  }
</style>

<script>
import jsonData from './Good.json';

export default {
  components: {
  },
  data() {
    return {
      jsonData,
      HoverIn: false,
    };
  },
  methods: {
    Catalog() {
      this.$store.commit('setnavbarPosition', 1);
    },
  },
  computed: {
    filteredData() {
      const sortedData = [...this.jsonData];
      sortedData.sort((a, b) => b.rating - a.rating);

      return sortedData.slice(0, 5);
    },
  },

};

</script>

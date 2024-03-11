<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
<div class="navbar">
    <ul id="navbar">
      <h1 class="navbar__first__li"><router-link to="/" :class="{ 'activee': $store.state.navbarPosition === 0 }" @click=" Main">StroySee</router-link></h1>
      <li id="navbar__first__li-li"><router-link to="/" :class="{ 'activee': $store.state.navbarPosition === 1 }" @click="Catalog" style="font-size: large;">Каталог</router-link></li>
      <div class="search">
      <input class="search__input" placeholder="Поиск" v-model="this.$store.state.inputStr" type="text" @keydown.enter="handleEnterPress">
      <router-link to="/" @click="Catalog">
      <Lupa class="search__button"/>
    </router-link>
    </div>
      <li id="navbar__first__li"><router-link to="/" :class="{ 'activee': $store.state.navbarPosition === 2 }" @click="Contacts" style="font-size: large;">Контакты</router-link></li>
      <router-link to="/" :class="{ 'activee': $store.state.navbarPosition === 3 }" @click="Cart">
  <LockIcon id="navbar__first__li" />
  <span v-if="cartQuantity > 0" class="navbar__cart__quantity">{{ cartQuantity }}</span>
</router-link>
      <router-link to="/"><Heart style="margin-left: 20px;" @click="Favorite"></Heart></router-link>
      <li v-if="$store.state.authorization === false"><div class="polz">
        <ul id="navbar__user" >
        <li><router-link to="/authorization" style="color: black">Войти</router-link></li>
        <li><router-link to="/registration" style="color: black">Регистрация</router-link></li>
        </ul>
      </div>
    </li>
    <div v-else style="margin-left: 15px;" class="navbar__user__selections" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
  <img class="navbar__user__icon" src="@/assets/images/userPhoto.jpg" width="50" height="50" alt="">
  <div v-if="showDropdown" class="navbar__dropdown__content">
    <router-link to="/account" style="color: black">Просмотреть профиль</router-link>
    <router-link to="/" @click="() => { logout(); Main(); }" style="color: black">Выйти из аккаунта</router-link>
  </div>
          <ul id="navbar__user">
          <li><router-link to="/Account" style="color: black"></router-link></li>
          </ul>
        </div>
    </ul>
</div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import LockIcon from 'vue-material-design-icons/Cart.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lupa from 'vue-material-design-icons/Magnify.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Heart from 'vue-material-design-icons/Heart.vue';

export default {
  components: {
    LockIcon, Lupa, Heart,
  },
  data() {
    return {
      showDropdown: false,
      filteredMovies: [],
      inputStr: '',
      showSearch: false,
    };
  },
  computed: {
    showLogout() {
      return this.$store.state.authorization;
    },
    userNickName() {
      return this.$store.state.NickName;
    },
    cartQuantity() {
      return this.$store.state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    // eslint-disable-next-line vue/no-dupe-keys
    filteredMovies() {
      if (this.inputStr) {
        return this.movies.filter((item) => item.name.includes(this.inputStr));
      }
      return this.movies;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setAuthorization', false);
      this.$store.dispatch('setCartItems', []);
      this.$store.dispatch('setFavItems', []);
      this.$store.dispatch('setMainItems', []);
      this.$store.state.afterOrder = false;
      this.$store.state.feedback = false;
      this.$store.dispatch('setNickNameClear');
    },
    handleEnterPress(event) {
      event.preventDefault(); // Предотвращаем стандартное действие для элемента анакреонта
      this.Catalog();
    },
    filteredMoviesBut() {
      this.$store.state.BooleanSearch = true;
    },
    Catalog() {
      this.$store.dispatch('setnavbarPosition', 1);
    },
    Main() {
      this.$store.dispatch('setnavbarPosition', 0);
      this.$store.state.inputStr = '';
    },
    Contacts() {
      this.$store.dispatch('setnavbarPosition', 2);
      this.$store.state.inputStr = '';
    },
    Cart() {
      this.$store.dispatch('setnavbarPosition', 3);
      this.$store.state.inputStr = '';
    },
    Favorite() {
      this.$store.dispatch('setnavbarPosition', 4);
      this.$store.state.inputStr = '';
    },
    Search() {
      this.showSearch = true;
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search__button {
  margin-top: 5px;
}
.search__input{
  width: 400px;
  height: 30px;
  font-size: large;
  border: solid 1px gainsboro
}
.navbar__first__li {
  font-size: xx-large;
  padding: 5px;
  font-family: Arial, sans-serif;
  position: relative;
}
.navbar__first__li::after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  border: 10px solid #000;
  z-index: -1;
}
.navbar {
  display: inline;
  color: black;
}
.activee {
  color: palevioletred;
}
.roof {
  text-align: center;
}

#navbar {
  border-radius:0 0 20px 20px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#navbar li {
  display: inline;
  text-decoration: none;
  margin: 0 15px 0 15px;
}
.navbar__user__selections {
  display: flex;
  flex-direction: column;
  align-items: center;
  float: right;
    color: black;

}
#navbar__first__li {
  color: black;
}
#navbar__user {
  display: flex;
  flex-direction: row;
  align-items: center;
}
li {
  color: black;
}
.navbar__user__icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
li:last-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  float: right;
  color: black;
}
a{
  color: black;
}
.navbar__dropdown__content {
  margin-top: 40px;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
  border: solid black 1px;
}

.navbar__user__selections:hover .navbar__dropdown__content {
  display: block;
}

.navbar__dropdown__content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border: solid black 1px;
}

.navbar__dropdown__content a:hover {
  background-color: #f1f1f1;
}
.navbar__cart__quantity {
  background-color: palevioletred;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.4em;
  font-size: 0.8em;
}
.d39 {
position: relative;
width: 3em;
height: 3em;
margin: 2em;
background: #D5DEE9;
border-width: 0.25em;
border-style: solid;
border-color: #6E839E;
border-radius: 50% 50% 0 0;
}
.d39:before,
.d39:after {
content: "";
position: absolute;
bottom: -0.25em;
background: inherit;
border-width: 0.25em;
border-style: solid;
border-color: #6E839E;
}
.d39:before {
left: 80%;
width: 60%;
height: 60%;
border-left: none;
border-radius: 50% 50% 50% 0;
}
.d39:after {
right: 80%;
width: 80%;
height: 80%;
border-right: none;
border-radius: 50% 50% 0;
}
.heart {
  border: solid red 2px;
  position: relative;
  width: 10px;
  height: 18px;
  background-color: red;
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
  background-color: red;
  box-shadow: 0px 3px 3px #444444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 0 50px 50px 0;
}

</style>

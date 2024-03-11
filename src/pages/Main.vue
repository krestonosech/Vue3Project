<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->

<template>
<Navbar/>
<afterr v-if="$store.state.navbarPosition === 0"/>
<mainContent v-if="$store.state.navbarPosition === 1"/>
<contacts v-if="$store.state.navbarPosition === 2"/>
<Cart v-if="$store.state.navbarPosition === 3"/>
<Favorites v-if="$store.state.navbarPosition === 4"/>
<Feedback v-if="$store.state.navbarPosition === 5"/>
<div class="footers">
<Footerr v-if="$store.state.navbarPosition === 0"/>
<Footerr v-if="$store.state.navbarPosition === 1"/>
<Footerr v-if="$store.state.navbarPosition === 2"/>
<Footerr v-if="$store.state.navbarPosition === 3" :class="{ 'active': itemsInCart < 3}"/>
<Footerr v-if="$store.state.navbarPosition === 4" :class="{ 'active': itemsInFavorites < 3}"/>
<Footerr v-if="$store.state.navbarPosition === 5" :class="{ 'active': itemsInReview < 5}"/>
</div>
</template>

<script>
import mainContent from '../components/maincontent.vue';
import Navbar from '../components/navbar.vue';
import afterr from '../components/first_attractive.vue';
import Footerr from '../components/footer.vue';
import Contacts from '../components/Contacts.vue';
import Cart from './Cart.vue';
import Favorites from './Favorites.vue';
import Feedback from './Feedback.vue';

export default {
  components: {
    Navbar, afterr, Footerr, mainContent, Contacts, Cart, Favorites, Feedback,
  },
  data() {
    return {
      Index: 0,
    };
  },
  methods: {
    Footer() {
      if (this.$store.state.favoriteItems < 10) {
        this.Index = 1;
      }
    },
  },
  computed: {
    itemsInFavorites() {
      return this.$store.state.favoriteItems.length;
    },
    itemsInCart() {
      return this.$store.state.cartItems.length;
    },
    itemsInCatalog() {
      return this.$store.state.searchItems.length;
    },
    itemsInReview() {
      return this.$store.state.reviewItems.length;
    },
  },
};
</script>

<style>
.footers {
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  position: absolute;
  bottom: 0;
}

.footer.fixed {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.fixed_footer {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 230px;
}

*{
  margin: 0;
  padding: 0;
  border: 0;

  color: black;
}
a {
  text-decoration: none;
  font-family: Montserrat, serif;
}
p, h1, h2, h3, h4, h5, li {
  font-family: Montserrat, serif;
}
a:link {
  color: black;
}
a:visited {
  color: black;
}
</style>

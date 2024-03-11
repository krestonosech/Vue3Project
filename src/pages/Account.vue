<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
    <div class="account">
    <img class="account__user__icon" src="@/assets/images/userPhoto.jpg" width="400" height="300" alt="">
    <h2>{{ userNickName }}</h2>
    </div>
    <div class="account__center__part">
        <ul>
            <li><router-link to="/" @click=" Main">Главная</router-link></li>
            <li><router-link to="/" @click=" Cart">Корзина</router-link></li>
            <li><router-link to="/" @click=" Favorite">Избранное</router-link></li>
            <li><router-link to="/deliver" v-if="this.$store.state.cartItems != 0">Заказать</router-link></li>
        </ul>
    </div>
    <p class="account__after__order" v-if="this.$store.state.afterOrder">Спасибо за заказ!</p>
    <div class="foooter">
    <footerr class="footer"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import footerr from '../components/footer.vue';

export default {
  components: {
    footerr,
  },
  computed: {
    ...mapState({
      userNickName: (state) => state.NickName,
    }),
  },
  methods: {
    Cart() {
      this.$store.commit('setnavbarPosition', 3);
    },
    Favorite() {
      this.$store.commit('setnavbarPosition', 4);
    },
    Main() {
      this.$store.commit('setnavbarPosition', 0);
    },
  },
};
</script>

<style scoped>
.account__after__order {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  position: absolute;
    bottom: 0;
}
.foooter {
  display: flex;
  justify-content: center;
  align-items: center;
}
  .account__user__icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }
    ul {
        display: flex;
        justify-content: center;
        flex-direction: row;
        list-style: none;
    }
    li {
        margin: 50px 20px 50px 20px;
    }
    .account {
        display: flex;
        flex-direction: column;
       align-items: center;
    }
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
    <div class="main__footer">
      <footer>
        <h1 style="border: solid black 1px;"></h1>
        <h1 style="color: palevioletred; margin-left: 20px; ">StroySee</h1>
<div class="main__footer__networks">
  <div class="main__footer__ul__networks">
    <ul>
        <li class="main__footer__networks_li"><a class="main__footer__networks_router" href="https://web.telegram.org/k/#-1754252633">Telegram</a></li>
        <li class="main__footer__networks_li"><a class="main__footer__networks_router" href="https://vk.com/goblin">VK</a></li>
    </ul>
  </div>
    <p class="main__footer__rights">All screenshots © their respective owners.</p>
    <br>
    <div v-if="$store.state.navbarPosition !== 5" class="main__footer__rights__feedback">
    <p @click="Catalog"><router-link to="/">Оцените нас</router-link></p>
    <router-link to="/"><div @click="Catalog" class="d14"></div></router-link>
  </div>
    <p class="main__footer__rights">Sponsored by Ъndrew Kryukov.</p>

</div>
    </footer>
    </div>
  </template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    Catalog() {
      this.$store.commit('setnavbarPosition', 5);
    },
  },
};
</script>

  <style scoped>
  .main__footer__ul__networks {
    display: flex;
    justify-content: space-between;
  }
  .main__footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  footer {
    /* position: absolute;
    bottom: 0; */
    width: 1200px;
  }
  .main__footer__networks_router:hover {
    color: palevioletred;
  }
  .main__footer__networks_router {
    color: slategrey;
  }
  .main__footer__rights__feedback {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }
  .main__footer__networks_li {
    display: flex;
    justify-content: space-between;
    color: gray;
  }
li {
    text-decoration: none;
    margin: 5px 20px 5px 20px;
    font-size: small;
}
ul {
  width: 1200px;
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    list-style: none;
}
.main__footer__rights {
    color: gray;
    font-size: small;
    display: flex;
    justify-content: center;
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

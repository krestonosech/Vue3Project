<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <h1>Вход</h1>
    <div class="login__authorization">
        <h4>Введите почту</h4>
        <input type="text" placeholder="Почта" v-model="email">
        <h4>Введите пароль</h4>
        <input type="password" placeholder="Пароль" v-model="password">
        <p v-if="errors.passwordMismatch" class="error">Неправильный логил или пароль</p>
        <p v-if="errors.emailMismatch" class="error">Неправильная почта</p>
        <mybutton class="login__authorization__mybutton" @click.prevent="CheckUser(mas)">
          <router-link to="">Подтвердить</router-link>
        </mybutton>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved, import/extensions
import store from '@/store';
import mybutton from '../components/mybutton.vue';

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default {
  components: {
    mybutton,
  },
  data() {
    return {
      password: '',
      email: '',
      mas: store.state.jojo,
      emailRegExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errors: {
        passwordMismatch: false,
        emailMismatch: false,
      },
    };
  },
  methods: {

    CheckUser() {
      this.errors.passwordMismatch = false;
      this.errors.emailMismatch = false;
      if (!emailRegExp.test(this.email)) {
        this.errors.emailMismatch = true;
      } else {
      // eslint-disable-next-line max-len
        const foundUse = this.$store.state.jojo.find((user) => user.email === this.email && user.password === this.password);
        if (foundUse) {
          const atIndex = this.email.indexOf('@');
          const nickName = atIndex !== -1 ? this.email.slice(0, atIndex) : this.email;
          store.state.NickName = nickName;
          store.state.authorization = true;
          this.$router.push('/');
        } else {
          this.errors.passwordMismatch = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.error {
  display: flex;
  justify-content: left/*  */;
  margin-top: 15px;
  color: red;
}
.login {
  border: 2px solid black;
  padding: 20px; /* Добавление отступов внутри блока */
  display: inline-block;
  display: flex;
  flex-direction: column;
  margin: 200px;
  margin-left: 600px;
  margin-right: 600px;
}
h1 {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}
.login__authorization__mybutton {
  margin: 15px;
}
.login__authorization {
    display: flex;
    align-items: center;
    flex-direction: column;
}
h4 {
    margin-top: 10px;
    display: flex;
}
input {
  margin-top: 12px;
    width: 200px;
    border: black solid 1px;
    color: black;
}
</style>

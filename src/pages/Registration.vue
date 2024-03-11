<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
  <div class="auth">
    <h1>Регистрация</h1>
    <div class="main">
        <h4>Введите почту</h4>
        <input type="text" placeholder="Почта" v-model="email">
        <h4>Введите пароль</h4>
        <input type="password" placeholder="Пароль" v-model="password">
        <h4>Подтвердите пароль</h4>
        <input type="password" placeholder="Пароль" v-model="confirmPassword">
        <p v-if="errors.passwordMismatch" class="error">Пароли не совпадают</p>
        <p v-if="errors.ErAuthorization" class="error">Такой пользователь уже существует</p>
        <p v-if="errors.emailMismatch" class="error">Неправильный формат почты</p>
        <mybutton class="mybutton" @click.prevent="addUser()"><router-link to="">Подтвердить</router-link></mybutton>
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
      email: '',
      password: '',
      confirmPassword: '',
      mas: store.state.jojo,
      errors: {
        passwordMismatch: false,
        ErAuthorization: false,
        emailMismatch: false,
      },
    };
  },
  methods: {
    addUser() {
      this.errors.ErAuthorization = false;
      this.errors.passwordMismatch = false;
      this.errors.emailMismatch = false;
      if (!emailRegExp.test(this.email)) {
        this.errors.emailMismatch = true;
      } else {
      // eslint-disable-next-line max-len
        const CheckProfile = this.$store.state.jojo.find((user) => user.email === this.email && user.password === this.password && user.password === this.confirmPassword);
        if (CheckProfile) {
          this.errors.ErAuthorization = true;
          return;
        }
        if (this.password === this.confirmPassword && this.password != null) {
          store.commit('addUser', { email: this.email, password: this.password });
          /* this.email = '';
          this.password = '';
          this.confirmPassword = ''; */
        } else {
          this.errors.passwordMismatch = true;
        }
        // eslint-disable-next-line max-len
        const foundUse = this.$store.state.jojo.find((user) => user.email === this.email && user.password === this.password);
        if (foundUse) {
          const atIndex = this.email.indexOf('@');
          const nickName = atIndex !== -1 ? this.email.slice(0, atIndex) : this.email;
          store.state.NickName = nickName;
          store.state.authorization = true;
          this.$router.push('/');
        }
      }
    },
  },
};
</script>

<style scoped>
.auth {
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
.error {
  display: flex;
  justify-content: left/*  */;
  margin-top: 15px;
  color: red;
}
.mybutton {
  margin: 15px;
}
.main {
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

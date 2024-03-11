<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
  <Navbar/>
    <div class="deliver">
        <div class="deliver__registration" :class="{ 'fixedDel': isFixed }">
        <h1 style="margin-top: 30px;">Оформление заказа</h1>
        <p style="font-size: x-small; margin-top: 30px;">Населенный пункт*</p>
        <p class="deliver__errors" v-if="this.errors.cityMiss">Введите город</p>
        <input v-model="city" placeholder="Введите город" style="width: 600px; margin-bottom: 30px;">
        <h3 style="margin: 10px 0;">Способ доставки</h3>
        <button @click="courier()" class="deliver__type__of" style="margin-left: 50px;"  :class="{ 'activee': index === 0 }">
          Курьером
        </button>
        <button @click="pickup()" class="deliver__type__of" style="margin-left: 25px;" :class="{ 'activee': index === 1 }">
          Самовывоз
        </button>
        <div class="deliver__type__of__courier" v-if="courierDeliver">
          <h4 style="margin-top: 20px;">Улица*</h4>
          <p class="deliver__errors" v-if="this.errors.streetMiss">Введите улицу</p>
          <input v-model="street" style="width: 600px;" type="text">
          <div style="display: flex; margin-top: 20px;">
            <div style="display: flex; flex-direction: column;">
          <h4>Дом*</h4>
          <p class="deliver__errors" v-if="this.errors.homeMiss">Введите дом</p>
          <input v-model="home" style="width: 275px;" type="text">
        </div>
          <div style="display: flex; flex-direction: column; margin-left: 50px;">
          <h4>Этаж*</h4>
          <p class="deliver__errors" v-if="this.errors.floorMiss">Введите этаж</p>
          <input v-model="floor" style="width: 275px;" type="text">
        </div>
        </div>
        <div style="display: flex; margin-top: 20px;">
            <div style="display: flex; flex-direction: column;">
          <h4>Подъезд*</h4>
          <p class="deliver__errors" v-if="this.errors.entranceMiss">Введите подъезд</p>
          <input v-model="entrance" style="width: 275px;" type="text">
        </div>
          <div style="display: flex; flex-direction: column; margin-left: 50px;">
          <h4>Домофон</h4>
          <input style="width: 275px;" type="text">
        </div>
        </div>
          <h4 style="margin-top: 20px;">Комментарий курьеру</h4>
          <input style="width: 600px;" type="text">
      </div>
      <div  class="deliver__date" v-if="courierDeliver">
        <h3 style="margin-top: 40px;">Дата доставки</h3>
        <p style="font-size: small; margin-bottom: 20px;">Курьер позвонит перед доставкой</p>
        <div class="deliver__date__time">
        <button class="deliver__date__buttons" @click="Index0" :class="{ 'deliver__date__active': DateIndex === 0 }" style="margin-left: 35px;">
          {{ getCurrentDate() }},
          Сегодня
        </button>
        <button class="deliver__date__buttons" @click="Index1"  :class="{ 'deliver__date__active': DateIndex === 1 }" style="margin-left: 35px;">
          {{ getCurrentDate(1) }},
          Завтра
        </button>
        <button class="deliver__date__buttons" @click="Index2"  :class="{ 'deliver__date__active': DateIndex === 2 }" style="margin-left: 35px;">
          {{ getCurrentDate(2) }},
          После
        </button>
      </div>
        <p style="font-size: x-small;">Время доставки*</p>
        <select style="border-bottom: solid black 2px; margin: 10px;">
      <option >08:00 - 12:00 <p>549 рублей</p></option>
      <option>12:00 - 16:00 <p>449 рублей</p></option>
      <option>16:00 - 20:00 <p>449 рублей</p></option>
      <option>20:00 - 23:59 <p>449 рублей</p></option>
    </select>
      </div>
      <div class="deliver__pickup" v-if="!courierDeliver" style="border-bottom: solid black 2px;">
        <h3 style="margin-top: 20px; widows: 600px;">Пункт выдачи</h3>
        <select>
      <option>Первый </option>
      <option>Второй</option>
      <option>Третий</option>
      <option>Четвертый</option>
      <option>Пятый</option>
    </select>
      </div>
      <div class="deliver_payment" v-if="courierDeliver">
        <h3>Способ оплаты</h3>
        <button class="deliver_payment__buttons" @click="payIndex0"  :class="{ 'payActive': PayIndex === 0 }" style="margin-left: 50px;" >
          Банковская карта
        </button>
        <button class="deliver_payment__buttons" @click="payIndex1"  :class="{ 'payActive': PayIndex === 1 }" style="margin-left: 25px;" >
          Наличными
        </button>
      </div>
      <h3 style="margin: 40px 0;">Кто заберет заказ?</h3>
      <div class="deliver__type__of__courier">
          <div style="display: flex; margin-top: 20px;">
            <div style="display: flex; flex-direction: column;">
          <h4>Имя*</h4>
          <p class="deliver__errors" v-if="this.errors.nameMiss">Введите подъезд</p>
          <input v-model="name" style="width: 275px;" type="text">
        </div>
          <div style="display: flex; flex-direction: column; margin-left: 50px;">
          <h4>Фамилия*</h4>
          <p class="deliver__errors" v-if="this.errors.surnameMiss">Введите подъезд</p>
          <input v-model="surname" style="width: 275px;" type="text">
        </div>
        </div>
        <div style="display: flex; flex-direction: column; margin-bottom: 50px; margin-top: 20px;">
          <h4>Номер телефона*</h4>
          <p class="deliver__errors" v-if="this.errors.numberMiss">Введите номер</p>
          <p class="deliver__errors" v-if="this.errors.numberWrong">Неправильно введен номер</p>
          <input v-model="number" style="width: 275px;" type="tel ">
        </div>
        </div>
  </div>

    <div class="mainOrder" :class="{ 'fixed': isFixed }" style="margin-top: 40px;" >
      <h3>Ваш заказ</h3>
      <div class="Order">
        <div class="Order" v-for="item in this.$store.state.cartItems" :key="item.id">
        <div class="">
          <img :src="item.image" width="70" height="100" alt="Photo" class="cardsPhoto" style="margin-left: 20px;">
        </div>
      </div>
      </div>
      <div style="display: flex; margin-left: 20px; margin-top: 200px;">
    <h4>{{ getFormattedCount }} на сумму:</h4>
    <h4 style="display: flex; width: 230px; justify-content: end;">{{ totalPrice }} ₽</h4>
  </div>
  <div style="display: flex; margin: 10px 10px 10px 20px;">
    <h4 >Скидка StroySee</h4>
    <h4 style="color: red; display: flex; width: 260px; justify-content: end;">0 ₽</h4>
  </div>
  <div style="display: flex; margin-left: 20px;">
    <h3>Итого:</h3>
    <h3 style="display: flex; width: 324px; justify-content: end;">{{ totalPrice }} ₽</h3>
  </div>
  <div style="display: flex; align-items: center; justify-content: center;">
  <router-link to="/deliver" @click="checkInputs($event)" class="orderButton">Оформить заказ</router-link>
</div>
    </div>
  </div>
    <footerr class="footer" />
  </template>

<script>
import footerr from '../components/footer.vue';
import jsonData from '../components/Good.json';
import Navbar from '../components/navbar.vue';

const numberRegExp = /^8\d{10}$/;

export default {
  data() {
    return {
      courierDeliver: true,
      index: 0,
      DateIndex: 0,
      PayIndex: 0,
      jsonData,
      cartItems: [],
      isFixed: false,
      street: '',
      home: '',
      floor: '',
      entrance: '',
      city: '',
      name: '',
      surname: '',
      number: '',
      pickUp: false,
      errors: {
        streetMiss: false,
        homeMiss: false,
        floorMiss: false,
        entranceMiss: false,
        cityMiss: false,
        nameMiss: false,
        surnameMiss: false,
        numberMiss: false,
        numberWrong: false,
      },
    };
  },
  components: {
    footerr, Navbar,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    checkInputs(event) {
      event.preventDefault();
      if (this.pickUp === false) {
        if (this.street.trim() === '') {
          this.errors.streetMiss = true;
        } else this.errors.streetMiss = false;
        if (this.home.trim() === '') {
          this.errors.homeMiss = true;
        } else this.errors.homeMiss = false;
        if (this.entrance.trim() === '') {
          this.errors.entranceMiss = true;
        } else this.errors.entranceMiss = false;
        if (this.floor.trim() === '') {
          this.errors.floorMiss = true;
        } else this.errors.floorMiss = false;
        if (this.city.trim() === '') {
          this.errors.cityMiss = true;
        } else this.errors.cityMiss = false;
        if (this.name.trim() === '') {
          this.errors.nameMiss = true;
        } else this.errors.nameMiss = false;
        if (this.surname.trim() === '') {
          this.errors.surnameMiss = true;
        } else this.errors.surnameMiss = false;
        if (this.number.trim() === '') {
          this.errors.numberMiss = true;
        } else this.errors.numberMiss = false;
        if (!numberRegExp.test(this.number)) {
          this.errors.numberWrong = true;
        } else this.errors.numberWrong = false;
        if (this.errors.numberMiss === false
       && this.errors.streetMiss === false
       && this.errors.homeMiss === false
       && this.errors.entranceMiss === false
       && this.errors.floorMiss === false
       && this.errors.cityMiss === false
       && this.errors.nameMiss === false
       && this.errors.surnameMiss === false
       && this.errors.numberMiss === false) {
          this.$router.push('/account');
          this.$store.state.afterOrder = true;
        }
      } else {
        if (this.city.trim() === '') {
          this.errors.cityMiss = true;
        } else this.errors.cityMiss = false;
        if (this.name.trim() === '') {
          this.errors.nameMiss = true;
        } else this.errors.nameMiss = false;
        if (this.surname.trim() === '') {
          this.errors.surnameMiss = true;
        } else this.errors.surnameMiss = false;
        if (this.number.trim() === '') {
          this.errors.numberMiss = true;
        } else this.errors.numberMiss = false;
        if (!numberRegExp.test(this.number)) {
          this.errors.numberWrong = true;
        } else this.errors.numberWrong = false;
        if (this.errors.numberMiss === false
       && this.errors.cityMiss === false
       && this.errors.nameMiss === false
       && this.errors.surnameMiss === false
       && this.errors.numberMiss === false) {
          this.$router.push('/account');
          this.$store.state.afterOrder = true;
        }
      }
    },
    courier() {
      this.courierDeliver = true;
      this.index = 0;
      this.pickUp = false;
    },
    pickup() {
      this.courierDeliver = false;
      this.index = 1;
      this.pickUp = true;
    },
    Index0() {
      this.DateIndex = 0;
    },
    Index1() {
      this.DateIndex = 1;
    },
    Index2() {
      this.DateIndex = 2;
    },
    payIndex0() {
      this.PayIndex = 0;
    },
    payIndex1() {
      this.PayIndex = 1;
    },
    getCurrentDate(addDays = 0) {
      const today = new Date();
      today.setDate(today.getDate() + addDays);
      const day = today.getDate();
      return `${day < 10 ? `0${day}` : day} февраля`;
    },
    handleScroll() {
      const mainOrder = document.querySelector('.mainOrder');
      if (window.scrollY > mainOrder.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
  },
  created() {
    this.cartItems = this.store.cartItems;
  },
  computed: {
    store() {
      return this.$store.state;
    },
    showLogout() {
      return this.$store.state.authorization;
    },
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
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
  },
};
</script>

  <style scoped>
  .deliver__errors {
    font-size: small;
    color: palevioletred;
  }
  .fixedDel {
    margin-right: 400px;
  }
  .fixed {
  position: fixed;
  top: -40px;
    right: 300px;
  width: 100%;
}
  .orderButton {
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
  select {
    width: 600px;
  }
  .deliver_payment__buttons {
    width: 250px;
    height: 50px;
    border: solid 1px gainsboro;
    margin: 20px 0;
  }
  .deliver__date__buttons {
    width: 150px;
    height: 50px;
    border: solid 1px gainsboro;
    margin: 20px 0;
  }
  .deliver__type__of {
    width: 250px;
    height: 50px;
    border: solid 1px gainsboro;
    margin: 20px 0;
  }
  .mainOrder {
    width: 400px;
    height: 500px;
  }
  .deliver__registration {
    margin-left: 200px;
  }
  .deliver {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .deliver_payment {
    margin-top: 40px;
  }
  .Order {
    display: flex;
  }
  .deliver__date {

    margin-top: 30px;
  }
  .deliver__date__time {
    margin: 15px;

  }
  .deliver_payment__buttons:hover {
    color: gray;
    border: solid gray 1px;
  }
  .deliver__date__buttons:hover {
    color: gray;
    border: solid gray 1px;
  }
  .deliver__type__of:hover {
    color: gray;
    border: solid gray 1px;
  }
  .router {
  margin: 10px;
}
.router:hover {
  color: palevioletred
}
  .cart__items__cards {
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    width: 70px;
    height: 100px;
    color: black;
    background-color: white;
}
.deliver__date__active {
  color: palevioletred;
    border: solid 1px palevioletred
}
  .activee {
    color: palevioletred;
    border: solid 1px palevioletred
  }
  .payActive {
    color: palevioletred;
    border: solid 1px palevioletred
  }
  p {
    color: gray;
  }
  input {
    border-bottom: solid black 1px;
    margin-top: 5px;
  }
  input:focus {
  border-bottom: solid black 1px;
  outline: none;
}
select:focus {
  border-bottom: solid black 1px;
  outline: none;
}
  .footer {
      bottom: 0;
  }

  </style>

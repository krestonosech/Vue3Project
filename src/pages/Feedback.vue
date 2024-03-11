<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
    <div class="review">
        <div v-if="this.$store.state.feedback === false && this.$store.state.authorization === true" class="user_review">
      <h2>Отзыв</h2>
      <p style="margin-top: 20px; margin-left: 30px;">Общая оценка сервиса</p>
    <div class="stars_outline">
  <button @click="reviewButton" @mouseover="HoverIn = 1" @mouseleave="HoverIn = 0">
    <Star v-if="HoverIn == 1 || HoverIn == 2 || HoverIn == 3 || HoverIn == 4 || HoverIn == 5
    || confirmHoverIn == 1 || confirmHoverIn == 2 || confirmHoverIn == 3 || confirmHoverIn == 4 || confirmHoverIn == 5"/>
    <StarOutline v-else/>
</button>
  <button @click="reviewButton" @mouseover="HoverIn = 2" @mouseleave="HoverIn = 0">
    <Star v-if="HoverIn == 2 || HoverIn == 3 || HoverIn == 4 || HoverIn == 5
    || confirmHoverIn == 2 || confirmHoverIn == 3 || confirmHoverIn == 4 || confirmHoverIn == 5"/>
    <StarOutline v-else/>
</button>
  <button @click="reviewButton" @mouseover="HoverIn = 3" @mouseleave="HoverIn = 0">
    <Star v-if="HoverIn == 3 || HoverIn == 4 || HoverIn == 5
    || confirmHoverIn == 3 || confirmHoverIn == 4 || confirmHoverIn == 5"/>
    <StarOutline v-else/>
</button>
  <button @click="reviewButton" @mouseover="HoverIn = 4" @mouseleave="HoverIn = 0">
    <Star v-if="HoverIn == 4 || HoverIn == 5
    || confirmHoverIn == 5 || confirmHoverIn == 4"/>
    <StarOutline v-else/>
</button>
  <button @click="reviewButton" @mouseover="HoverIn = 5" @mouseleave="HoverIn = 0">
    <Star v-if="HoverIn == 5 || confirmHoverIn == 5"/>
    <StarOutline v-else/>
</button>
</div>
<p class="deliver__errors" v-if="this.errors.reviewMistach">Дайте оценку</p>
<div class="input_p">
      <input v-model="reviewText" placeholder="Напишите ваш отзыв здесь"/>
      <router-link style="margin-left: 40px;" to="/" @click="addReview" class="orderButton">Добавить отзыв</router-link>
    </div>
</div>
    <p class="deliver__errors" v-if="this.errors.emptyField">Напишите отзыв</p>
    <p class="deliver__errors" v-if="this.$store.state.feedback === true" style="width: 500px;">Удалите свой отзыв, чтобы написать новый</p>
    <p class="deliver__errors" v-if="this.$store.state.authorization === false " style="width: 500px;">Авторизируйтесь, чтобы написать отзыв</p>
      <h2 style="margin-top: 20px;">{{ getFormattedCount }}</h2>
      <div style="margin: 20px 0 0 40px;" v-for="item in this.$store.state.reviewItems" :key="item.id">
        <div class="user_name">
        <img class="user-icon" src="@/assets/images/userPhoto.jpg" width="50" height="50" alt="">
        <h4>{{ item.nickName }}</h4>
        </div>
        <div class="user_stars">
            <Star v-if="item.id == 5 || item.id == 4 || item.id == 3 || item.id == 2 || item.id == 1"/>
            <StarOutline v-else/>
            <Star v-if="item.id == 5 || item.id == 4 || item.id == 3 || item.id == 2"/>
            <StarOutline v-else/>
            <Star v-if="item.id == 5 || item.id == 4 || item.id == 3"/>
            <StarOutline v-else/>
            <Star v-if="item.id == 5 || item.id == 4"/>
            <StarOutline v-else/>
            <Star v-if="item.id == 5"/>
            <StarOutline v-else/>
    <div style="margin-top: 3px; margin-left: 20px;">{{ item.date }}</div>
        </div>
        <p style="margin: 5px 0 0 40px;">{{ item.text }}</p>
        <router-link
        style="margin-left: 40px;" to="/"
        v-if="item.nickName === this.$store.state.NickName"
        class="orderButton2"
        @click="removeItem(item)"
        >Удалить отзыв</router-link>
      </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import Star from 'vue-material-design-icons/Star.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import StarOutline from 'vue-material-design-icons/StarOutline.vue';
import reviewsData from '../components/review.json'; // Путь к вашему JSON файлу с отзывами

export default {
  components: {
    Star, StarOutline,
  },
  data() {
    return {
      reviewText: '',
      reviews: reviewsData.reviews,
      storeReviews: [],
      HoverIn: 0,
      confirmHoverIn: 0,
      errors: {
        reviewMistach: false,
        emptyField: false,
        success: false,
        userReview: this.$store.state.feedback,
      },
    };
  },
  methods: {
    addReview() {
      if (this.confirmHoverIn === 0) {
        this.errors.reviewMistach = true;
      } else if (this.reviewText.trim() === '') {
        this.errors.emptyField = true;
      } else {
        this.errors.emptyField = false;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        const formattedDate = `${dd}.${mm}.${yyyy}`;
        this.$store.dispatch('addReviews', {
          nickName: this.$store.state.NickName,
          text: this.reviewText,
          id: this.confirmHoverIn,
          date: formattedDate,
        });
        this.reviewText = '';
        this.errors.success = true;
        this.$store.state.feedback = true;
        this.userReview = this.$store.state.feedback;
      }
    },
    handleEnterPress(event) {
      event.preventDefault(); // Предотвращаем стандартное действие для элемента анакреонта
      this.removeItem();
    },
    getCurrentDate(addDays = 0) {
      const today = new Date();
      today.setDate(today.getDate() + addDays);
      const day = today.getDate();
      return `${day < 10 ? `0${day}` : day} февраля`;
    },
    removeItem(item) {
      this.$store.state.feedback = false;
      const index = this.$store.state.reviewItems.findIndex(
        (review) => review.nickName === item.nickName,
      );
      if (index !== -1) {
        this.$store.dispatch('removeReviews', item);
      }
    },
    setStar(starNumber) {
      this.HoverIn = starNumber;
    },
    reviewButton() {
      this.confirmHoverIn = this.HoverIn;
      this.errors.reviewMistach = false;
    },
    refreshPage() {
      window.location.reload();
    },
  },
  computed: {
    getFormattedCount() {
      const count = this.$store.state.reviewItems.length;
      if (count % 10 === 1 && count !== 11) {
        return `${count} отзыв`;
      }
      if (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) {
        return `${count} отзыва`;
      }
      return `${count} отзывов`;
    },
  },
};
</script>

<style scoped>
.user_stars {
    display: flex;
    flex-direction: row;
    margin-left: 20px;
}
.user_name {
    display: flex;
    justify-content: start;
    align-items: center;
}
.user-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
.deliver__errors {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 10px 10px 40px;
    width: 150px;
    height: 20px;
    background-color: coral;
    border-radius:0 100px 100px 0;
    color: white
}
.input_p {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.stars_outline {
    display: flex;
    margin-left: 40px;
}
  input {
    width: 1270px;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 40px;
    border-bottom: solid black 2px;
  }
  input:focus {
    border-bottom: solid black 2px;
    outline: none;
  }
  .review {
    margin-left: 170px;
  }
  .orderButton {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: black;
  margin-top: 30px;
  color: white;
  width: 200px;
  border: black solid 2px;
}
.orderButton2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  background-color: black;
  margin-top: 20px;
  color: white;
  width: 150px;
  border: black solid 2px;
}
</style>

import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
import Registration from '../pages/Registration.vue';
import Authorization from '../pages/Login.vue';
import Account from '../pages/Account.vue';
import Cart from '../pages/Cart.vue';
import Favorite from '../pages/Favorites.vue';
import Deliver from '../pages/Deliver.vue';
import ProductDescription from '../pages/ProductDescription.vue';
import Feedback from '../pages/Feedback.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/product/:id', component: ProductDescription },
    { path: '/registration', component: Registration },
    { path: '/deliver', component: Deliver },
    { path: '/favorite', component: Favorite },
    { path: '/authorization', component: Authorization },
    { path: '/account', component: Account },
    { path: '/feedback', component: Feedback },
    { path: '/cart', component: Cart },
  ],
});

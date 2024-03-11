<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
  <div class="maps">
  <div class="maps__contacts">
    <h1 style="margin-bottom: 50px;">Контакты</h1>
    <p style="margin-top: 20px;">Телефон: +7 (965) 345-5519</p>
    <p style="margin-top: 20px;">Email: hdhhdjdjdh07@gmail.com</p>
    <h3 style="margin-top: 20px;">Фактический адрес:</h3>
    <p style="margin-top: 20px;">105120, г. Москва, Кастомаровская набережная, 29 стр. 1 Моя шарага, 1 этаж</p>
    <p style="margin-top: 50px;">График работы офиса:</p>
    <p style="margin-top: 5px;">Пока не закроемся</p>
  </div>
  <div class="maps__yandexMaps">
  <yandex-map style="border: solid 2px black"
      v-model="map"
      :settings="{
        location: {
          center: [ 37.668695, 55.750434],
          zoom: 18,
        },
      }"
      width="800px"
      height="500px"
  >
    <yandex-map-default-scheme-layer/>
  </yandex-map>
</div>
</div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
// eslint-disable-next-line import/no-unresolved
import { YMap } from '@yandex/ymaps3-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';

// eslint-disable-next-line no-bitwise
const map = shallowRef < null | YMap > (null);
</script>

<style scoped>
.maps__contacts {
  margin: 130px;
  width: 400px;
  margin-bottom: 170px;
}

.map {
  height: 300px;
}
.maps {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

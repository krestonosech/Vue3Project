<!-- eslint-disable max-len -->
<template>
    <div class="magnifier">
      <img class="magnifier__image" :src="imageSrc" />
      <div class="glass">
        <div class="magnified-image" :style="{ backgroundImage: `url(${imageSrc})`, backgroundSize: '200%' }"></div>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    magnify(event) {
      const x = event.clientX - this.$el.offsetLeft;
      const y = event.clientY - this.$el.offsetTop;
      const glassRect = this.$el.querySelector('.glass').getBoundingClientRect();
      const glassX = glassRect.left;
      const glassY = glassRect.top;
      const magnifiedImageRect = this.$el.querySelector('.magnified-image').getBoundingClientRect();
      const magnifiedImageX = magnifiedImageRect.left;
      const magnifiedImageY = magnifiedImageRect.top;
      const magnifiedX = x - glassX + magnifiedImageX;
      const magnifiedY = y - glassY + magnifiedImageY;
      // eslint-disable-next-line max-len
      if (magnifiedX >= 0 && magnifiedX <= magnifiedImageRect.width && magnifiedY >= 0 && magnifiedY <= magnifiedImageRect.height) {
        this.$el.querySelector('.magnified-image').style.backgroundPosition = `-${magnifiedX * 2}px -${magnifiedY * 2}px`;
      }
    },
  },
  mounted() {
    this.$el.addEventListener('mousemove', this.magnify);
  },
};
</script>

  <style>
  .magnifier {
    position: relative;
  }

  .magnifier__image {
    width: 100%;
    height: auto;
  }

  .glass {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }

  .magnified-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 200%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
  </style>

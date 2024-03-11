<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="modal" v-if="isOpen">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      message: 'Привет, это модальное окно!',
    };
  },
  methods: {
    CloseModal() {
      this.isOpen = false;
    },
  },
};
</script>

  <style scoped>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>

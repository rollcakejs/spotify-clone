<template>
  <button class="btn btn--rounded">{{ text }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String
  }
};
</script>

<style scoped>
.btn {
  font-size: 10px;
  line-height: 1;
  padding: 14px 48px 16px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: normal;
  color: #616467;
  box-shadow: inset 0 0 0 2px #616467;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
}

.btn:hover {
  color: #fff;
  background-color: #616467;
  box-shadow: none;
}
</style>
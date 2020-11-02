<template>
  <input
    class="base-input"
    v-bind:type="type"
    v-bind:placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: String,
    placeholder: String
  }
};
</script>

<style>
.base-input {
  width: 100%;
  height: 20px;
  padding: 16px 12px;
  background-color: #fff;
  border: 1px solid #d9dadc;
  border-radius: 0;
  font-size: 12px;
  line-height: 1.5;
  box-shadow: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition-property: border-color, box-shadow;
  transition-duration: 0.15s, 0.15s;
  transition-timing-function: ease-in-out, ease-in-out;
  transition-delay: 0s, 0s;
}

.base-input::placeholder {
  color: #d9dadc;
}

.base-input:focus {
  border-color: #919496;
  outline: 0;
}
</style>

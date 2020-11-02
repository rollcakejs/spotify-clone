<template>
  <div class="base-checkbox" v-on:click="onClickCheck">
    <label>
      <input type="checkbox" />
      Remember me
      <div
        class="base-checkout__control"
        v-bind:class="{ 'base-checkout__control--checked': isChecked }"
      ></div>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  data: function() {
    return {
      isChecked: false
    };
  },
  methods: {
    onClickCheck: function(event) {
      this.isChecked = !this.isChecked;
      event.preventDefault();
    }
  }
};
</script>

<style scoped>
.base-checkbox {
  color: #919496;
  font-weight: 400;
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}

.base-checkbox label {
  display: flex;
  align-items: center;
  max-width: 100%;
  padding-left: 1.75em;
  font-weight: 400;
  min-height: 17px;
  margin-bottom: 0;
  cursor: pointer;
}

.base-checkbox input {
  opacity: 0;
  z-index: -1;
  position: absolute;
  margin: 4px 0 0;
  line-height: normal;
  box-sizing: border-box;
  padding: 0;
}

.base-checkout__control {
  background-color: #fff;
  border: 1px solid #c1c3c6;
  display: block;
  position: absolute;
  top: 1px;
  left: 0;
  width: 1.25em;
  height: 1.25em;
  border-radius: 4px;
}

.base-checkout__control--checked {
  border-color: #1ed760;
  background-color: #1ed760;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M13.613 27.068l-7.94-7.28q-.285-.267-.442-.613t-.172-.7.11-.71.394-.638q.52-.583 1.3-.614T8.225 17l6.13 5.626 8.79-17q.363-.693 1.104-.93t1.433.118.93 1.103-.126 1.442L16.56 26.55q-.204.394-.558.654t-.78.34q-.063.015-.118.023t-.11.008-.102 0q-.74 0-1.276-.504z' fill='%23FFF'/%3E%3C/svg%3E");
  background-size: 16px;
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  width: 1.25em;
  height: 1.25em;
  background-repeat: no-repeat;
  background-position: 50%;
}
</style>

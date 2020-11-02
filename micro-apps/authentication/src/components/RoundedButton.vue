<template>
  <BaseButton class="btn--rounded" :text="text"></BaseButton>
</template>
<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "RoundedButton",
  components: {
    BaseButton
  },
  props: {
    text: String
  }
};
</script>
<style scoped>
.btn--rounded {
  min-width: 160px;
  border-radius: 500px;
}
</style>

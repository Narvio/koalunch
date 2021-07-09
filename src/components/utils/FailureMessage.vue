<template>
  <div class="koalunch-failure">
    <p class="koalunch-failure-text">{{ message }}</p>
    <img
      src="../../assets/wrong.png"
      class="koalunch-failure-image"
    />
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: String
  }
});

</script>

<style scoped>
.koalunch-failure-text {
  font-size: 1.5rem;
}
.koalunch-failure {
  width: 100%;
  height: 100%;
}
.koalunch-failure-image {
  height: 5rem;
  width: auto;
}
</style>

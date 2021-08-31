<template>
  <div class="koalunch-busyIndicator">
    <img src="../../assets/spinner.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});

</script>

<style scoped>
.koalunch-busyIndicator {
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  align-content: center;
  text-align: center;
  justify-content: center;
  overflow: hidden;
}
</style>

<template>
  <div class="koalunch-busyIndicator">
    <img src="../../assets/spinner.svg" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({})
export default class BusyIndicator extends Vue {}
</script>

<style scoped>
.koalunch-busyIndicator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  text-align: center;
  justify-content: center;
}
</style>

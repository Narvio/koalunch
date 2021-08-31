<template>
  <div
    class="modal"
    :class="{
      'is-active': isOpen
    }"
  >
    <div class="modal-background" @click="toggle"></div>
    <div class="modal-content">
      <busy-indicator v-if="isBusy" />
      <slot v-if="!isBusy" />
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="toggle"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BusyIndicator from "./BusyIndicator.vue";

export default defineComponent({
  components: { BusyIndicator },
  data() {
    return {
      isOpen: false,
      isBusy: false
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
});

</script>

<style scoped>
.modal-content {
  border-radius: 0.25rem;
}
</style>

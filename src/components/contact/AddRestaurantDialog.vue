<template>
  <Modal ref="modal">
    <div class="container">
      <img src="@/assets/koaburger.png" />

      <div
        class="notification is-warning"
      >{{ $t("contact.addRestaurantMessage")}}</div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.restaurantName") }}</label>

        <div class="control">
          <input class="input" type="text" />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.restaurantUrl") }}</label>

        <div class="control">
          <input class="input" type="text" />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.yourName") }}</label>

        <div class="control">
          <input class="input" type="text" />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.note")}}</label>

        <div class="control">
          <textarea class="textarea"></textarea>
        </div>
      </div>

      <div
        class="field is-grouped is-grouped-right"
      >
        <div class="control">
          <button
            class="button is-link"
          >{{$t("contact.submit")}}</button>
        </div>
        <div class="control">
          <button
            class="button is-link is-light"
            @click="toggle"
          >{{$t("contact.cancel")}}</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/utils/Modal.vue";

export default defineComponent({
  components: {
    Modal
  },
  methods: {
    toggle() {
      const modal = this.$refs.modal as InstanceType<typeof Modal>;
      modal.toggle();
    }
  }
});

</script>

<style scoped>
.container {
  background-color: white;
  padding: 2rem;
}

.field {
  text-align: initial;
}

img {
  width: auto;
  height: 8rem;
}
</style>

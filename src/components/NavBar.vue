<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item koalunch-navbar-title"
        href="#"
      >Koalunch</a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <span>{{ currentLocation }}</span>
        </div>
      </div>

      <div class="navbar-end">
        <div
          class="navbar-item"
        >{{ $t("contact.contact") }}</div>
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-primary"
              @click="addRestaurant"
            >
              <strong>{{ $t("contact.addRestaurant") }}</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <Modal ref="addRestaurantDialog" />
</template>
<script lang="ts">

import { defineComponent } from "vue";
import Modal from "@/components/contact/AddRestaurantDialog.vue";

export default defineComponent({
  components: {
    Modal
  },
  props: {
    currentLocation: {
      type: String,
      default: "Brno (Holandská)"
    }
  },
  methods: {
    addRestaurant() {
      const modal = this.$refs.addRestaurantDialog as InstanceType<typeof Modal>;
      modal.toggle();
    }
  }
});

</script>

<style scoped>
.koalunch-navbar-title {
  font-weight: 900;
}
</style>

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
        <div
          class="navbar-item has-dropdown is-hoverable"
        >
          <a
            class="navbar-link"
          >{{ currentLocation }}</a>

          <div class="navbar-dropdown">
            <a
              class="navbar-item"
            >Brno (Holandská)</a>
            <a class="navbar-item">Vyškov</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">Kontakt</div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Přidat restauraci</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentLocation: {
      type: String,
      default: "Brno (Holandská)"
    }
  }
});

</script>

<style scoped>
.koalunch-navbar-title {
  font-weight: 900;
}
</style>

<template>
  <nav-bar />

  <div class="koalunch-logo" />

  <div class="container column is-5 field">
    <div class="control has-icons-left">
      <input
        class="input"
        type="text"
        :placeholder="$t('dashboard.searchRestaurant')"
        v-model.trim="searchInputValue"
        @blur="focus = false"
      />
      <span class="icon is-left">
        <img src="./assets/search.svg" />
      </span>
    </div>
  </div>
  <dashboard :searchQuery="searchExpression"></dashboard>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Koalunch</strong> by
        <a
          href="https://www.linkedin.com/in/michalkozubik/"
        >Michal Kozubík</a> |
        <a
          href="https://narvio.github.io/"
        >Narvio</a> |
        <a
          href="https://github.com/Narvio/koalunch"
        >GitHub</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Dashboard from "@/components/Dashboard.vue";
import NavBar from "@/components/NavBar.vue";

const DebounceInterval = 500;

export default defineComponent({
  components: {
    NavBar,
    Dashboard,
  },
  data() {
    return {
      searchTimeout: 0,
      searchInputValue: "",
      searchExpression: ""
    };
  },
  watch: {
    searchInputValue(value: string) {
      this.debounceSearch(value);
    },
  },
  methods: {
    debounceSearch(query: string): void {
      if (this.searchTimeout) {
        clearInterval(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(() => {
        this.searchExpression = query;
        this.searchTimeout = 0;
      }, DebounceInterval);
    }
  }
});
</script>

<style>
/* eslint-disable */
html,
body {
  height: 100%;
  margin: 0;
  background-color: #477890;
}
.koalunch-logo {
  background-image: url("./assets/logo_transparent.png");
  height: 40%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: 1rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 96%;
}

.vue-grid-item.vue-grid-placeholder {
  background: white !important;
  opacity: 0.5 !important;
}

.icon {
  opacity: 0.4;
}

.vue-resizable-handle {
  background-color: white !important;
  background-image: url("data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYiIGhlaWdodD0iNiI+PHBhdGggZD0iTTYgNkgwVjQuMmg0LjJWMEg2djZ6IiBvcGFjaXR5PSIxIi8+PC9zdmc+") !important;
  width: 15px !important;
  height: 15px !important;
  padding: 3px !important;
  background-size: contain !important;
}

.footer {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>

<template>
  <div class="koalunch-logo" />

  <div class="container column is-5 field">
    <div class="control has-icons-left">
      <input class="input" type="text" placeholder="Search restaurant" />
      <span class="icon is-left">
        <img src="./assets/search.svg" />
      </span>
    </div>
  </div>
  <dashboard></dashboard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Dashboard from "./components/Dashboard.vue";

@Options({
  components: {
    Dashboard,
  },
})
export default class App extends Vue {}
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
</style>

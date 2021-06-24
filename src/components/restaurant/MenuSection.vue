<template>
  <table class="table is-striped is-narrow is-hoverable">
    <tbody>
      <tr v-for="meal in section.meals" :key="meal">
        <td>{{ meal.name }}</td>
        <td>{{ meal.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { MenuData } from "@/api/responses/Menu";
import { PropType } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    section: Object as PropType<MenuData>,
  },
})
export default class MenuSection extends Vue {
  section!: MenuData;
}
</script>

<style scoped>
.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: linen;
}
</style>

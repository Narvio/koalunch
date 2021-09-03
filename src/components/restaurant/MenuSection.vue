<template>
  <table
    class="table is-striped is-narrow is-hoverable"
  >
    <tbody>
      <tr
        v-for="meal in section.meals"
        :key="meal"
      >
        <td>{{ meal.name }}</td>
        <td>{{ meal.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MenuData } from "@/api/responses/Menu";
import { PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    section: {
      required: true,
      type: Object as PropType<MenuData>
    }
  }
});

</script>

<style scoped>
.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: linen;
}
</style>

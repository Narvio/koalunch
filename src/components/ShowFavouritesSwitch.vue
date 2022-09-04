<template>
  <div
    class="buttons has-addons koalunch-buttons"
  >
    <a
      v-for="viewType in viewTypes"
      :key="viewType"
      class="button koalunch-card-header-button"
      :class="{
        'is-selected': selectedViewType === viewType.key,
        'koalunch-selected': selectedViewType === viewType.key,
      }"
      @click="() => onSwitch(viewType.key)"
    >
      <span class="icon-text">
        <span
          class="icon ion-ionic koalunch-icon"
        >
          <ion-icon
            :name="viewType.icon + (selectedViewType === viewType.key ? '' : '-outline')"
          />
        </span>
        <span>{{ $t(`viewType.${viewType.key.toLocaleLowerCase()}`) }}</span>
      </span>
      <span
        v-if="viewType.badge"
        class="tag is-danger ml-1"
      >{{ viewType?.badge }}</span>
    </a>
  </div>
</template>

<script lang="ts">
import { MutationTypes } from "@/store/mutation-types";
import { ViewType } from "@/store/ViewType";
import countOfNew from "@/utils/countOfNew";
import { defineComponent, State } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

type ViewTypeData = {
  key: ViewType,
  icon: string,
  badge?: string;
};

export default defineComponent({
  methods: {
    ...mapMutations([
      MutationTypes.ChangeViewType
    ]),
    onSwitch(viewType: ViewType) {
      this[MutationTypes.ChangeViewType](viewType);
    }
  },
  computed: {
    ...mapState({
      countOfNew: (state) => countOfNew((state as State).restaurants)
    }),
    ...mapGetters({
      selectedViewType: "selectedViewType"
    }),

    viewTypes(): ViewTypeData[] {
      const availableViewTypes: ViewTypeData[] = [{
        key: "All",
        icon: "grid"
      }, {
        key: "Favourites",
        icon: "heart"
      }];

      if (this.countOfNew > 0) {
        availableViewTypes.push({
          key: "New",
          icon: "bulb",
          badge: this.countOfNew.toString()
        });
      }
      return availableViewTypes;
    }
  }
});
</script>

<style scoped>
/* eslint-disable */
.koalunch-buttons {
  margin-left: 0.5rem;
}
.koalunch-selected {
  background-color: #d8a96c;
  color: black;
  font-weight: 500;
}
.koalunch-icon {
  opacity: 1;
}
</style>

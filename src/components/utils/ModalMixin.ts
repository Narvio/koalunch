import Modal from "@/components/utils/Modal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    modal(): InstanceType<typeof Modal> {
      return this.$refs.modal as InstanceType<typeof Modal>;
    },

    toggle(): void {
      this.modal().toggle();
    },

    setBusy(isBusy: boolean): void {
      this.modal().isBusy = isBusy;
    }
  }
});

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
          <input
            class="input"
            type="text"
            v-model="restaurantName.value"
            :class="{
              'is-danger': !restaurantName.isValid
            }"
            @change="validate('restaurantName')"
          />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.restaurantUrl") }}</label>

        <div class="control">
          <input
            class="input"
            type="text"
            v-model="restaurantUrl.value"
            :class="{
              'is-danger': !restaurantUrl.isValid
            }"
            @change="validate('restaurantUrl')"
          />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.yourName") }}</label>

        <div class="control">
          <input
            class="input"
            type="text"
            v-model="name.value"
            :class="{
              'is-danger': !name.isValid
            }"
            @change="validate('name')"
          />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.note")}}</label>

        <div class="control">
          <textarea
            class="textarea"
            v-model="note.value"
            :class="{
              'is-danger': !note.isValid
            }"
            @change="validate('note')"
          ></textarea>
        </div>
      </div>

      <div
        class="field is-grouped is-grouped-right"
      >
        <div class="control">
          <button
            class="button is-link"
            @click="submit"
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
import { mapActions } from "vuex";
import { ActionTypes } from "@/store/action-types";
import { RestaurantFeedbackData } from "@/store/actions";

import Modal from "@/components/utils/Modal.vue";
import ModalMixin from "@/components/utils/ModalMixin";
import createValidatorMixin from "@/components/contact/FormValidatorMixin";

export default defineComponent({
  mixins: [
    ModalMixin,
    createValidatorMixin([
      "restaurantName",
      "restaurantUrl",
      "name",
      "note"
    ])
  ],
  components: {
    Modal
  },
  data() {
    return {
      restaurantName: {
        value: "",
        isValid: true,
        isRequired: true
      },
      restaurantUrl: {
        value: "",
        isValid: true,
        isRequired: true
      },
      name: {
        value: "",
        isValid: true,
        isRequired: true
      },
      note: {
        value: "",
        isValid: true,
        isRequired: false
      }
    };
  },
  methods: {
    ...mapActions([
      ActionTypes.SendRestaurantFeedback
    ]),

    submit() {
      if (!this.validate()) {
        return;
      }

      try {
        this.setBusy(true);

        this[ActionTypes.SendRestaurantFeedback]({
          name: this.name.value,
          note: this.note.value,
          restaurantName: this.restaurantName.value,
          restaurantUrl: this.restaurantUrl.value
        } as RestaurantFeedbackData);
      } finally {
        this.setBusy(false);
        this.resetFields();
        this.toggle();
      }
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

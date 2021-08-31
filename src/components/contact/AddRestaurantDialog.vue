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
            @change="_validate('restaurantName')"
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
            @change="_validate('restaurantUrl')"
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
            @change="_validate('name')"
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
            @change="_validate('note')"
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
import Modal from "@/components/utils/Modal.vue";
import { mapActions } from "vuex";
import { ActionTypes } from "@/store/action-types";
import { RestaurantFeedbackData } from "@/store/actions";

interface InputField {
  value: string;
  isValid: boolean;
  isRequired: boolean;
}

export default defineComponent({
  _allFieds: "ASD",
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
  computed: {
    allFields(): InputField[] {
      return [
        this.restaurantName,
        this.restaurantUrl,
        this.name,
        this.note
      ];
    }
  },
  methods: {
    ...mapActions([
      ActionTypes.SendRestaurantFeedback
    ]),

    modal(): InstanceType<typeof Modal> {
      return this.$refs.modal as InstanceType<typeof Modal>;
    },

    toggle() {
      this.modal().toggle();
    },

    submit() {
      if (!this._validate()) {
        return;
      }

      try {
        this.modal().isBusy = true;

        this[ActionTypes.SendRestaurantFeedback]({
          name: this.name.value,
          note: this.note.value,
          restaurantName: this.restaurantName.value,
          restaurantUrl: this.restaurantUrl.value
        } as RestaurantFeedbackData);
      } finally {
        this._reset();
        this.toggle();
      }
    },

    _validate(fieldName?: string): boolean {
      const fields = fieldName ? [(this as any)[fieldName] as InputField] : this.allFields;

      fields.forEach((field) => {
        field.isValid = !field.isRequired || Boolean(field.value);
      });

      return fields.every((field) => field.isValid);
    },

    _reset() {
      this.modal().isBusy = false;

      this.allFields.forEach((field) => {
        field.value = "";
        field.isValid = true;
      });
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

import { expect } from "chai";
import { config, mount, shallowMount } from "@vue/test-utils";
import { ActionContext, createStore } from "vuex";

import AddRestaurantDialog from "@/components/contact/AddRestaurantDialog.vue";
import { ActionTypes } from "@/store/action-types";
import { RestaurantFeedbackData } from "@/store/actions";

interface FakeState {
  feedback: RestaurantFeedbackData;
}

const createFakeStore = () => createStore({
  state: {
    feedback: {}
  } as FakeState,
  actions: {
    [ActionTypes.SendRestaurantFeedback]: (
      context: ActionContext<FakeState, FakeState>,
      feedback: RestaurantFeedbackData
    ) => {
      context.state.feedback = feedback;
    }
  }
});

const create = () => {
  const wrapper = shallowMount(AddRestaurantDialog, {
    global: {
      mocks: {
        $t: (key: string) => key
      }
    }
  });

  return {
    wrapper,
    vm: wrapper.vm,
    controls: wrapper.findAll(".control"),
  };
};

describe("contact/AddRestaurantDialog.vue", () => {
  before(() => {
    config.renderStubDefaultSlot = true;
  });

  after(() => {
    config.renderStubDefaultSlot = false;
  });

  it("renders the form in modal", () => {
    const { wrapper, controls } = create();

    const modal = wrapper.findComponent("modal-stub");

    expect(wrapper.exists()).to.equal(true, "component should exist");
    expect(modal.exists()).to.equal(true, "component should be inside modal");
    expect(controls.length).to.equal(6, "should render 6 controls");
  });

  it("binds the model properly", () => {
    const { vm, controls } = create();

    controls[0].find("input").setValue("R_NAME");
    controls[1].find("input").setValue("R_URL");
    controls[2].find("input").setValue("NAME");
    controls[3].find("textarea").setValue("NOTE");

    expect(vm.restaurantName.value).to.equal("R_NAME", "restaurant name should be set");
    expect(vm.restaurantUrl.value).to.equal("R_URL", "restaurant url should be set");
    expect(vm.name.value).to.equal("NAME", "name should be set");
    expect(vm.note.value).to.equal("NOTE", "note should be set");
  });

  it("validates empty fields correctly", () => {
    const { vm } = create();

    expect(vm.validate("restaurantName")).to.equal(false, "restaurant name should be required");
    expect(vm.validate("restaurantUrl")).to.equal(false, "restaurant url should be required");
    expect(vm.validate("name")).to.equal(false, "name should be required");
    expect(vm.validate("note")).to.equal(true, "note should not be required");
    expect(vm.validate()).to.equal(false, "form should not be valid");
  });

  it("validates filled fields correctly", () => {
    const { vm } = create();

    vm.restaurantName.value = "R_NAME";
    vm.restaurantUrl.value = "R_URL";
    vm.name.value = "NAME";
    vm.note.value = "NOTE";

    expect(vm.validate("restaurantName")).to.equal(true, "restaurant name should be valid");
    expect(vm.validate("restaurantUrl")).to.equal(true, "restaurant url should be valid");
    expect(vm.validate("name")).to.equal(true, "name should be valid");
    expect(vm.validate("note")).to.equal(true, "note should be valid");
    expect(vm.validate()).to.equal(true, "form should be valid");
  });

  it("sends the feedbach", () => {
    const store = createFakeStore();
    const wrapper = mount(AddRestaurantDialog, {
      global: {
        plugins: [store],
        mocks: {
          $t: (key: string) => key
        }
      }
    });

    wrapper.vm.restaurantName.value = "R_NAME";
    wrapper.vm.restaurantUrl.value = "R_URL";
    wrapper.vm.name.value = "NAME";
    wrapper.vm.note.value = "NOTE";

    wrapper.vm.submit();

    expect(store.state.feedback).to.deep.equal({
      restaurantName: "R_NAME",
      restaurantUrl: "R_URL",
      name: "NAME",
      note: "NOTE"
    } as RestaurantFeedbackData, "feedback should be sent");
  });
});

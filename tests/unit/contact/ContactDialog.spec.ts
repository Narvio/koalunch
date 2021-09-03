import { expect } from "chai";
import { config, mount, shallowMount } from "@vue/test-utils";
import { ActionContext, createStore } from "vuex";

import ContactDialog from "@/components/contact/ContactDialog.vue";
import { ActionTypes } from "@/store/action-types";
import { ContactFeedbackData } from "@/store/actions";

interface FakeState {
  feedback: ContactFeedbackData;
}

const createFakeStore = () => createStore({
  state: {
    feedback: {}
  } as FakeState,
  actions: {
    [ActionTypes.SendContactFeedback]: (
      context: ActionContext<FakeState, FakeState>,
      feedback: ContactFeedbackData
    ) => {
      context.state.feedback = feedback;
    }
  }
});

const create = () => {
  const wrapper = shallowMount(ContactDialog, {
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

describe("contact/ContactDialog.vue", () => {
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
    expect(controls.length).to.equal(4, "should render 6 controls");
  });

  it("binds the model properly", () => {
    const { vm, controls } = create();

    controls[0].find("input").setValue("NAME");
    controls[1].find("textarea").setValue("NOTE");

    expect(vm.name.value).to.equal("NAME", "name should be set");
    expect(vm.message.value).to.equal("NOTE", "note should be set");
  });

  it("validates empty fields correctly", () => {
    const { vm } = create();

    expect(vm.validate("name")).to.equal(false, "name should be required");
    expect(vm.validate("message")).to.equal(false, "note should be required");
    expect(vm.validate()).to.equal(false, "form should not be valid");
  });

  it("validates filled fields correctly", () => {
    const { vm } = create();

    vm.name.value = "NAME";
    vm.message.value = "NOTE";

    expect(vm.validate("name")).to.equal(true, "name should be valid");
    expect(vm.validate("message")).to.equal(true, "note should be valid");
    expect(vm.validate()).to.equal(true, "form should be valid");
  });

  it("sends the feedbach", () => {
    const store = createFakeStore();
    const wrapper = mount(ContactDialog, {
      global: {
        plugins: [store],
        mocks: {
          $t: (key: string) => key
        }
      }
    });

    wrapper.vm.name.value = "NAME";
    wrapper.vm.message.value = "NOTE";

    wrapper.vm.submit();

    expect(store.state.feedback).to.deep.equal({
      name: "NAME",
      note: "NOTE"
    } as ContactFeedbackData, "feedback should be sent");
  });
});

import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Modal from "@/components/utils/Modal.vue";

type ModalInstance = InstanceType<typeof Modal>;

const create = () => {
  const wrapper = shallowMount(Modal, {
    props: {},
  });

  return {
    wrapper: wrapper,
    vm: wrapper.vm as ModalInstance,
    modal: wrapper.find(".modal")
  };
};

describe("utils/Modal.vue", () => {
  it("renders modal", () => {
    const { wrapper, modal } = create();

    expect(wrapper.exists()).to.equal(true, "modal should exists");
    expect(modal.classes("is-active")).to.equal(false, "modal should not be active");
  });

  it("can be toggled", async () => {
    const { vm, modal } = create();

    vm.toggle();
    await vm.$nextTick();

    expect(modal.classes("is-active")).to.equal(true, "modal should be active");

    vm.toggle();
    await vm.$nextTick();

    expect(modal.classes("is-active")).to.equal(false, "modal should not not active");
  });

  it("can show busy indicator", async () => {
    const { wrapper, vm } = create();

    let busyIndicator = wrapper.findComponent("busy-indicator-stub");
    expect(busyIndicator.exists()).to.equal(false, "busy indicator should be hidden");

    vm.isBusy = true;
    await vm.$nextTick();

    busyIndicator = wrapper.findComponent("busy-indicator-stub");
    expect(busyIndicator.exists()).to.equal(true, "busy indicator should be shown");
  });
});

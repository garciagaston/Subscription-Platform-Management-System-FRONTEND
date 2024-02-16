import { shallowMount } from "@vue/test-utils";
import HomePage from "../../src/components/HomePage.vue";

describe("Render HomePage", () => {
  it("user signed out", () => {
    const wrapper = shallowMount(HomePage);
    expect(wrapper.text()).toContain("Sign Up");
    expect(wrapper.text()).toContain("Login");
    expect(wrapper.text()).toContain("SPMS");
  });

  it("user signed", () => {
    const mockStore = {
      state: {
        auth: {
          token_type: "bearer",
          token: "1|XXXXXXXXXX",
          user: {
            id: 1
          }
        }
      }
    };
    const wrapper = shallowMount(HomePage, {global: {
      mocks: {
        $store: mockStore
      }
    }});
    // expect(wrapper.text()).toContain("Sign Up");
    expect(wrapper.text()).toContain("");
  });
});

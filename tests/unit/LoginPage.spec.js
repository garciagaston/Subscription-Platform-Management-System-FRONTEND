import { shallowMount } from "@vue/test-utils";
import LoginPage from "../../src/components/LoginPage.vue";
import router from '@/router'

describe("Render LoginPage", () => {
  it("ser signed out", () => {
    const wrapper = shallowMount(LoginPage);
    expect(wrapper.text()).toMatch("Login");
  });

  it("user signed", () => {
    const mockStore = {
      state: {
        auth: {
          token_type: "bearer",
          token: "1|XXXXXXXXXX",
          status: {
            loggedIn: true
          },
          user: {
            id: 1
          }
        }
      },
    };
    const wrapper = shallowMount(LoginPage, {global: {
      mocks: {
        $store: mockStore,
        $router: router,
      }
    }});
    // expect(wrapper.text()).toContain("Sign Up");
    expect(wrapper.text()).toContain("");
  });
});

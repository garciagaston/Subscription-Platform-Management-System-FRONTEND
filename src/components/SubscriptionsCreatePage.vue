<template>
  <div class="content-header">
    <h1>Create Subscription</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <SubscriptionsForm @on-submit="createSubscription" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionService from "../services/subscriptions.service.js";
import UserService from "../services/user.service.js";
import SubscriptionsForm from "./SubscriptionsForm";

export default {
  name: "SubscriptionsCreatePage",
  components: {
    SubscriptionsForm,
  },
  data() {
    return {
      subscription: null,
      UserService: UserService,
      SubscriptionService: SubscriptionService,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("create subscriptions")) {
      this.$router.push("/login");
    }
  },
  methods: {
    createSubscription(subscriptionForm) {
      this.SubscriptionService.createSubscription(subscriptionForm).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/subscriptions");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        },
      );
    },
  },
};
</script>

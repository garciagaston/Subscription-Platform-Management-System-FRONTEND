<template>
  <div class="content-header">
    <h1>Edit Subscription</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <SubscriptionsForm
              v-if="subscription"
              :subscription="subscription"
              @on-submit="editSubscription"
            />
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
  name: "SubscriptionsEditPage",
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
    if (!this.currentUser || !UserService.can("edit subscriptions")) {
      this.$router.push("/login");
    }
    this.getSubscription(this.$route.params.id);
  },
  methods: {
    getSubscription(subscriptionId) {
      let thiss = this;
      SubscriptionService.getSubscription(subscriptionId).then(
        function (response) {
          thiss.subscription = response.data;
        },
      );
      return thiss.subscription;
    },
    editSubscription(subscriptionForm) {
      this.SubscriptionService.editSubscription(
        this.subscription.id,
        subscriptionForm,
      ).then(
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

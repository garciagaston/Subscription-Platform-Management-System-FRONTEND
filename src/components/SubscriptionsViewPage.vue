<template>
  <div class="content-header">
    <h1>Subscription</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row" v-if="subscription">
        <div class="col-8">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Subscription Detail</h3>
              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div
                v-if="subscription"
                class="col-12 col-md-12 col-lg-4 order-1 order-md-2"
              >
                <SubscriptionDetail
                  v-if="subscription"
                  :subscription="subscription"
                />
              </div>
            </div>
            <div class="card-footer clearfix">
              <router-link
                v-if="UserService.can('edit subscriptions')"
                :to="'/subscriptions/' + subscriptionId + '/edit'"
                class="btn btn-primary float-right"
                ><i class="fas fa-pencil"></i> Edit Subscription</router-link
              >
              <router-link
                v-if="UserService.can('view any subscriptions')"
                to="/subscriptions"
                class="btn btn-text float-right"
                ><i class="fas fa-pencil"></i> Back</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-4">
          <!-- PACKAGE CARD -->
          <div v-if="subscription.package" class="card card-success">
            <div class="card-header">
              <h3 class="card-title">Package</h3>
              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
                <PackageDetail :packageData="subscription.package" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionService from "../services/subscriptions.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";
import SubscriptionDetail from "./SubscriptionDetail";
import PackageDetail from "./PackageDetail";

export default {
  name: "SubscriptionsViewPage",
  components: {
    SubscriptionDetail,
    PackageDetail,
  },
  data() {
    return {
      subscription: null,
      subscriptionId: this.$route.params.id,
      UserService: UserService,
      moment: moment,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("view subscriptions")) {
      this.$router.push("/login");
    }
    this.getSubscription(this.subscriptionId);
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
  },
};
</script>

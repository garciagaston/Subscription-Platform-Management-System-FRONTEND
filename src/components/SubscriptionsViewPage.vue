<template>
  <div class="content-header">
    <h1>Subscription Detail</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div
                v-if="subscription"
                class="col-12 col-md-12 col-lg-4 order-1 order-md-2"
              >
                <h3 class="text-primary">
                  <i class="fas fa-tv"></i> Subscription #{{ subscription.id }}
                </h3>
                <p class="text-muted">
                  <b>Subscribed from {{
                    moment
                      .utc(subscription.start_date)
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")
                  }}</b>
                  to
                  <b>{{
                    moment
                      .utc(subscription.end_date)
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")
                  }} ({{ moment.duration(moment(subscription.end_date).diff(moment())).days() }} days left)</b>
                </p>
                <br />
                <div class="text-muted">
                  <p class="text-sm">
                    Subscription ID
                    <b class="d-block">{{ subscription.id }}</b>
                  </p>
                  <p class="text-sm">
                    User ID
                    <b class="d-block">{{ subscription.user_id }}</b>
                  </p>
                  <p class="text-sm">
                    Package ID
                    <b class="d-block">
                      <router-link
                        v-if="UserService.can('view packages')"
                        :to="'/packages/' + subscription.package_id"
                        class="btn btn-text"
                        ><i class="fas fa-eye"></i> Package #{{
                          subscription.package_id
                        }}</router-link
                      >
                    </b>
                  </p>
                  <p class="text-sm">
                    Start Date
                    <b class="d-block">{{
                      moment
                        .utc(subscription.start_date)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p class="text-sm">
                    End Date
                    <b class="d-block">{{
                      moment
                        .utc(subscription.end_date)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p class="text-sm">
                    Created At
                    <b class="d-block">{{
                      moment
                        .utc(subscription.created_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p class="text-sm">
                    Updated At
                    <b class="d-block">{{
                      moment
                        .utc(subscription.updated_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p v-if="subscription.deleted_at" class="text-sm">
                    Deleted At
                    <b class="d-block">{{
                      moment
                        .utc(subscription.deleted_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionService from "../services/subscriptions.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  name: "SubscriptionsViewPage",
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

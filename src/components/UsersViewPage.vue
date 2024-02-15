<template>
  <div class="content-header">
    <h1>User</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-8">
          <!-- USER CARD -->
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">User Detail</h3>
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
              <div v-if="user" class="col-10 order-1 order-md-2">
                <UserDetail v-if="user" :user="user" />
              </div>
            </div>
            <div class="card-footer clearfix">
              <router-link
                v-if="UserService.can('edit users')"
                :to="'/users/' + userId + '/edit'"
                class="btn btn-primary float-right"
                ><i class="fas fa-pencil"></i> Edit User</router-link
              >
              <router-link
                v-if="UserService.can('view any users')"
                to="/users"
                class="btn btn-text float-right"
                ><i class="fas fa-pencil"></i> Back</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-4">
          <!-- USER ACTIVE SUBSCRIPTION CARD -->
          <div v-if="user?.active_subscription" class="card card-success">
            <div class="card-header">
              <h3 class="card-title">Active Subscription</h3>
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
              <div class="col-10 order-1 order-md-2">
                <SubscriptionDetail
                  v-if="user?.active_subscription"
                  :subscription="user?.active_subscription"
                />
              </div>
            </div>
          </div>
          <!-- USER SUBSCRIPTION CARD -->
          <div v-if="user?.subscriptions" class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Subscriptions History</h3>
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
                v-for="subscription in user.subscriptions"
                :key="subscription"
                class="col-10 order-1 order-md-2"
              >
                <SubscriptionDetail
                  v-if="subscription"
                  :subscription="subscription"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "../services/users.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";
import SubscriptionDetail from "./SubscriptionDetail";
import UserDetail from "./UserDetail";

export default {
  name: "UsersViewPage",
  components: {
    SubscriptionDetail,
    UserDetail,
  },
  data() {
    return {
      user: null,
      userId: this.$route.params.id,
      UserService: UserService,
      UsersService: UsersService,
      moment: moment,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("view users")) {
      this.$router.push("/login");
    }
    this.getUser(this.userId);
  },
  methods: {
    getUser(userId) {
      let thiss = this;
      UsersService.getUser(userId).then(function (response) {
        thiss.user = response.data;
      });
      return thiss.user;
    },
  },
};
</script>

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
                <h3 class="text-primary">
                  <i class="fas fa-user"></i> {{ user.name }}
                </h3>
                <p v-if="user.active_subscription" class="text-muted">
                  <b
                    >Subscribed from
                    {{
                      moment
                        .utc(user.active_subscription.start_date)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b
                  >
                  to
                  <b
                    >{{
                      moment
                        .utc(user.active_subscription.end_date)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}
                    ({{
                      moment
                        .duration(moment(user.end_date).diff(moment()))
                        .days()
                    }}
                    days left)</b
                  >
                </p>
                <br />
                <div class="text-muted">
                  <p class="text-sm">
                    User ID
                    <b class="d-block">{{ user.id }}</b>
                  </p>
                  <p class="text-sm">
                    Name
                    <b class="d-block">{{ user.name }}</b>
                  </p>
                  <p class="text-sm">
                    Email
                    <b class="d-block">{{ user.email }}</b>
                  </p>
                  <p class="text-sm">
                    Active subscription
                    <b class="d-block">{{
                      user.active_subscription != null
                    }}</b>
                  </p>
                  <p class="text-sm">
                    Created At
                    <b class="d-block">{{
                      moment
                        .utc(user.created_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p class="text-sm">
                    Updated At
                    <b class="d-block">{{
                      moment
                        .utc(user.updated_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p v-if="user.deleted_at" class="text-sm">
                    Deleted At
                    <b class="d-block">{{
                      moment
                        .utc(user.deleted_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                </div>
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

export default {
  name: "UsersViewPage",
  components: {
    SubscriptionDetail,
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

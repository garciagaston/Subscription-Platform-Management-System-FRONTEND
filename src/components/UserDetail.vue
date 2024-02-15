<template>
  <router-link :to="'/users/' + user.id" class="btn btn-text">
    <h3 class="text-primary"><i class="fas fa-user"></i> {{ user.name }}</h3>
  </router-link>
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
      ({{ moment.duration(moment(user.end_date).diff(moment())).days() }} days
      left)</b
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
      <b class="d-block">{{ user.active_subscription != null }}</b>
    </p>
    <p class="text-sm">
      Created At
      <b class="d-block">{{
        moment.utc(user.created_at).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p class="text-sm">
      Updated At
      <b class="d-block">{{
        moment.utc(user.updated_at).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p v-if="user.deleted_at" class="text-sm">
      Deleted At
      <b class="d-block">{{
        moment.utc(user.deleted_at).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
  </div>
</template>

<script>
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
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
    if (!this.currentUser || !UserService.can("view users")) {
      this.$router.push("/login");
    }
  },
};
</script>

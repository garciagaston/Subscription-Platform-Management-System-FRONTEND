<template>
  <router-link :to="'/subscriptions/' + subscription.id" class="btn btn-text">
    <h3 class="text-primary">
      <i class="fas fa-tv"></i> Subscription #{{ subscription.id }}
    </h3>
  </router-link>
  <p class="text-muted">
    <b
      >Subscribed from
      {{
        moment
          .utc(subscription.start_date)
          .local()
          .format("YYYY-MM-DD HH:mm:ss")
      }}</b
    >
    to
    <b
      >{{
        moment.utc(subscription.end_date).local().format("YYYY-MM-DD HH:mm:ss")
      }}
      ({{
        moment.duration(moment(subscription.end_date).diff(moment())).days()
      }}
      days left)</b
    >
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
        moment.utc(subscription.end_date).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p class="text-sm">
      Active
      <b class="d-block">{{ subscription.active }}</b>
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
</template>

<script>
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  props: {
    subscription: {
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
    if (!this.currentUser || !UserService.can("view subscriptions")) {
      this.$router.push("/login");
    }
  },
};
</script>

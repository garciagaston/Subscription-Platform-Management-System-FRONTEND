<template>
  <router-link :to="'/channels/' + channel.id" class="btn btn-text">
    <h3 class="text-primary">
      <i class="fas fa-cube"></i> Channel {{ channel.id }}: {{ channel.name }}
    </h3>
  </router-link>
  <p class="text-muted">
    {{ channel.description }}
  </p>
  <br />
  <div class="text-muted">
    <p class="text-sm">
      Name
      <b class="d-block">{{ channel.name }}</b>
    </p>
    <p class="text-sm">
      Description
      <b class="d-block">{{ channel.description }}</b>
    </p>
    <p class="text-sm">
      image_url
      <b class="d-block">{{ channel.image_url }}</b>
    </p>
    <p class="text-sm">
      lineup_id
      <b class="d-block">{{ channel.lineup_id }}</b>
    </p>
    <p class="text-sm">
      call_sign
      <b class="d-block">{{ channel.call_sign }}</b>
    </p>
    <p class="text-sm">
      active
      <b class="d-block">{{ channel.active }}</b>
    </p>
    <p class="text-sm">
      display_order
      <b class="d-block">{{ channel.display_order }}</b>
    </p>
    <p class="text-sm">
      created_at
      <b class="d-block">{{
        moment
          .utc(channel.created_at)
          .local()
          .format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p class="text-sm">
      updated_at
      <b class="d-block">{{
        moment
          .utc(channel.updated_at)
          .local()
          .format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p v-if="channel.deleted_at" class="text-sm">
      deleted_at
      <b class="d-block">{{
        moment
          .utc(channel.deleted_at)
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
    channel: {
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
    if (!this.currentUser || !UserService.can("view channels")) {
      this.$router.push("/login");
    }
  },
};
</script>

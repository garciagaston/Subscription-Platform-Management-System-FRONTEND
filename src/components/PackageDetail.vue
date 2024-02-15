<template>
  <router-link :to="'/packages/' + packageData.id" class="btn btn-text">
    <h3 class="text-primary">
      <i class="fas fa-tv"></i> Package #{{ packageData.id }}
    </h3>
  </router-link>
  <p class="text-muted">
    {{ packageData.description }}
  </p>
  <br />
  <div class="text-muted">
    <p class="text-sm">
      Name
      <b class="d-block">{{ packageData.name }}</b>
    </p>
    <p class="text-sm">
      Description
      <b class="d-block">{{ packageData.description }}</b>
    </p>
    <p class="text-sm">
      SKU
      <b class="d-block">{{ packageData.sku }}</b>
    </p>
    <p class="text-sm">
      image_url
      <b class="d-block">{{ packageData.image_url }}</b>
    </p>
    <p class="text-sm">
      active
      <b class="d-block">{{ packageData.active }}</b>
    </p>
    <p class="text-sm">
      created_at
      <b class="d-block">{{
        moment.utc(packageData.created_at).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p class="text-sm">
      updated_at
      <b class="d-block">{{
        moment.utc(packageData.updated_at).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
    <p v-if="packageData.deleted_at" class="text-sm">
      deleted_at
      <b class="d-block">{{
        moment.utc(packageData.deleted_at).local().format("YYYY-MM-DD HH:mm:ss")
      }}</b>
    </p>
  </div>
</template>

<script>
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  props: {
    packageData: {
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
    if (!this.currentUser || !UserService.can("view packages")) {
      this.$router.push("/login");
    }
  },
};
</script>

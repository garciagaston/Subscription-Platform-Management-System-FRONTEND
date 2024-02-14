<template>
  <div class="p-5 text-center bg-body-tertiary rounded-3">
    <div v-if="!currentUser" class="col-lg-12 mx-auto">
      <h1 class="fw-light">
        {{ title }}
      </h1>
      <p class="lead text-body-secondary">
        {{ subtitle }}
      </p>
      <div class="d-inline-flex gap-2">
        <router-link
          to="/register"
          class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
        >
          Sign Up
        </router-link>
        <router-link
          to="/login"
          class="btn btn-outline-secondary btn-lg px-4 rounded-pill"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      title: "SPMS",
      subtitle: "Subscription Platform Management System",
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
};
</script>

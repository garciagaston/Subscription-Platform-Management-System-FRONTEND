<template>
  <div class="wrapper">
    <!-- Preloader -->
    <div class="preloader">
      <img
        src="https://adminlte.io/docs/3.1//assets/img/AdminLTELogo.png"
        alt="SPMS"
        height="60"
        width="60"
      />
    </div>
    <MainHeaderNavbar />

    <div class="content-wrapper px-4 py-2">
      <router-view />
    </div>
  </div>
</template>

<script>
import MainHeaderNavbar from "./components/MainHeaderNavbar.vue";

export default {
  components: {
    MainHeaderNavbar,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

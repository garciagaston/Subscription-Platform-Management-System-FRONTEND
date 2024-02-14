<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/home" class="nav-link"> Home </router-link>
      </li>
    </ul>
    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" /> LogOut
        </a>
      </li>
    </div>
  </nav>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link to="/home" class="brand-link logo-switch"> SPMS </router-link>
    <div
      class="sidebar os-host os-theme-light os-host-resize-disabled os-host-transition os-host-overflow os-host-overflow-y os-host-scrollbar-horizontal-hidden"
    >
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar nav-child-indent flex-column"
          data-widget="treeview"
          role="menu"
        >
          <li v-if="!currentUser" class="nav-item">
            <router-link to="/register" class="nav-link">
              <i class="nav-icon fas fa-user-plus"></i>
              <p>Sign Up</p>
            </router-link>
          </li>
          <li v-if="!currentUser" class="nav-item">
            <router-link to="/login" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>Login</p>
            </router-link>
          </li>
          <li
            v-if="currentUser && UserService.can('view any packages')"
            class="nav-item"
          >
            <router-link to="/packages" class="nav-link">
              <i class="nav-icon fas fa-cubes"></i>
              <p>Packages</p>
            </router-link>
          </li>
          <li
            v-if="currentUser && UserService.can('view any packages')"
            class="nav-item"
          >
            <router-link to="/channels" class="nav-link">
              <i class="nav-icon fas fa-cube"></i>
              <p>Channels</p>
            </router-link>
          </li>
          <li
            v-if="currentUser && UserService.can('view any packages')"
            class="nav-item"
          >
            <router-link to="/subscriptions" class="nav-link">
              <i class="nav-icon fas fa-tv"></i>
              <p>Subscriptions</p>
            </router-link>
          </li>
          <li
            v-if="currentUser && UserService.can('view any packages')"
            class="nav-item"
          >
            <router-link to="/users" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>Users</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import UserService from "../services/user.service.js";

export default {
  name: "MainHeaderNavbar",
  data() {
    return {
      UserService: UserService,
    };
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

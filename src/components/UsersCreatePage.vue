<template>
  <div class="content-header">
    <h1>Create User</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <UsersForm @on-submit="createUser" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "../services/users.service.js";
import UserService from "../services/user.service.js";
import UsersForm from "./UsersForm";

export default {
  name: "UsersCreatePage",
  components: {
    UsersForm,
  },
  data() {
    return {
      user: null,
      UsersService: UsersService,
      UserService: UserService,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("create users")) {
      this.$router.push("/login");
    }
  },
  methods: {
    createUser(userForm) {
      this.UsersService.createUser(userForm).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/users");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        },
      );
    },
  },
};
</script>

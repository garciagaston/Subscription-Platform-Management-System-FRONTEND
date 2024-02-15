<template>
  <div class="content-header">
    <h1>Edit User</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <UsersForm v-if="user" :user="user" @on-submit="editUser" />
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
  name: "UsersEditPage",
  components: {
    UsersForm,
  },
  data() {
    return {
      user: null,
      UserService: UserService,
      UsersService: UsersService,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("edit users")) {
      this.$router.push("/login");
    }
    this.getUser(this.$route.params.id);
  },
  methods: {
    getUser(userId) {
      let thiss = this;
      UserService.getUser(userId).then(function (response) {
        thiss.user = response.data;
      });
      return thiss.user;
    },
    editUser(userForm) {
      this.UsersService.editUser(this.user.id, userForm).then(
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

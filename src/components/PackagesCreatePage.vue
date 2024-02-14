<template>
  <div class="content-header">
    <h1>Create Package</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <PackagesForm @on-submit="createPackage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PackageService from "../services/packages.service.js";
import UserService from "../services/user.service.js";
import PackagesForm from "./PackagesForm";

export default {
  name: "PackagesCreatePage",
  components: {
    PackagesForm,
  },
  data() {
    return {
      packageDetail: null,
      UserService: UserService,
      PackageService: PackageService,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    createPackage(packageForm) {
      this.PackageService.createPackage(packageForm).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/packages");
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

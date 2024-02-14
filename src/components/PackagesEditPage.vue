<template>
  <div class="content-header">
    <h1>Edit Package</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <PackagesForm
              v-if="packageDetail"
              :package-detail="packageDetail"
              @on-submit="editPackage"
            />
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
  name: "PackagesEditPage",
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
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("edit packages")) {
      this.$router.push("/login");
    }
    this.getPackage(this.$route.params.id);
  },
  methods: {
    getPackage(packageId) {
      let thiss = this;
      PackageService.getPackage(packageId).then(function (response) {
        thiss.packageDetail = response.data;
      });
      return thiss.packageDetail;
    },
    editPackage(packageForm) {
      this.PackageService.editPackage(this.packageDetail.id, packageForm).then(
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

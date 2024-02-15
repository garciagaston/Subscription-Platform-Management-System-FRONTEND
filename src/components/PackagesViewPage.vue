<template>
  <div class="content-header">
    <h1>Package Detail</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div
                v-if="packageData"
                class="col-12 col-md-12 col-lg-4 order-1 order-md-2"
              >
                <PackageDetail :package-data="packageData" />
              </div>
            </div>
            <div class="card-footer clearfix">
              <router-link
                v-if="UserService.can('edit packages')"
                :to="'/packages/' + packageId + '/edit'"
                class="btn btn-primary float-right"
                ><i class="fas fa-pencil"></i> Edit Package</router-link
              >
              <router-link
                v-if="UserService.can('view any packages')"
                to="/packages"
                class="btn btn-text float-right"
                ><i class="fas fa-pencil"></i> Back</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PackageService from "../services/packages.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";
import PackageDetail from "./PackageDetail";

export default {
  name: "PackagesViewPage",
  data() {
    return {
      packageData: null,
      packageId: this.$route.params.id,
      UserService: UserService,
      moment: moment,
      PackageDetail: PackageDetail,
    };
  },
  components: {
    PackageDetail,
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
    this.getPackage(this.packageId);
  },
  methods: {
    getPackage(packageId) {
      let thiss = this;
      PackageService.getPackage(packageId).then(function (response) {
        thiss.packageData = response.data;
      });
      return thiss.packageData;
    },
  },
};
</script>

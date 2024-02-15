<template>
  <div class="content-header">
    <h1>Package</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-8">
          <!-- PACKAGE CARD -->
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Package Detail</h3>
              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
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
        <div v-if="packageData" class="col-4">
          <!-- CHANNELS CARD -->
          <div v-if="packageData.channels" class="card card-success">
            <div class="card-header">
              <h3 class="card-title">Channels</h3>
              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div
                v-for="channel in packageData.channels"
                :key="channel"
                class="col-10 order-1 order-md-2"
              >
                <ChannelDetail v-if="channel" :channel="channel" />
              </div>
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
import ChannelDetail from "./ChannelDetail";

export default {
  name: "PackagesViewPage",
  data() {
    return {
      packageData: null,
      packageId: this.$route.params.id,
      UserService: UserService,
      moment: moment,
      PackageDetail: PackageDetail,
      ChannelDetail: ChannelDetail,
    };
  },
  components: {
    PackageDetail,
    ChannelDetail,
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

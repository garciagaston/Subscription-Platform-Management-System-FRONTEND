<template>
  <div class="content-header">
    <h1>Packages</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div
                v-if="packageDetail"
                class="col-12 col-md-12 col-lg-4 order-1 order-md-2"
              >
                <h3 class="text-primary">
                  <i class="fas fa-cubes"></i> {{ packageDetail.name }}
                </h3>
                <p class="text-muted">
                  {{ packageDetail.description }}
                </p>
                <br />
                <div class="text-muted">
                  <p class="text-sm">
                    Name
                    <b class="d-block">{{ packageDetail.name }}</b>
                  </p>
                  <p class="text-sm">
                    Description
                    <b class="d-block">{{ packageDetail.description }}</b>
                  </p>
                  <p class="text-sm">
                    SKU
                    <b class="d-block">{{ packageDetail.sku }}</b>
                  </p>
                  <p class="text-sm">
                    image_url
                    <b class="d-block">{{ packageDetail.image_url }}</b>
                  </p>
                  <p class="text-sm">
                    active
                    <b class="d-block">{{ packageDetail.active }}</b>
                  </p>
                  <p class="text-sm">
                    created_at
                    <b class="d-block">{{
                      moment
                        .utc(packageDetail.created_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p class="text-sm">
                    updated_at
                    <b class="d-block">{{
                      moment
                        .utc(packageDetail.updated_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p v-if="packageDetail.deleted_at" class="text-sm">
                    deleted_at
                    <b class="d-block">{{
                      moment
                        .utc(packageDetail.deleted_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                </div>
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

export default {
  name: "PackagesViewPage",
  data() {
    return {
      packageDetail: null,
      packageId: this.$route.params.id,
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
    this.getPackage(this.packageId);
  },
  methods: {
    getPackage(packageId) {
      let thiss = this;
      PackageService.getPackage(packageId).then(function (response) {
        thiss.packageDetail = response.data;
      });
      return thiss.packageDetail;
    },
  },
};
</script>

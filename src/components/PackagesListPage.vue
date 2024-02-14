<template>
  <div class="content-header">
    <div class="row">
      <div class="col-6">
        <h1>Packages</h1>
      </div>
      <div class="col-6">
        <router-link
          v-if="UserService.can('create packages')"
          to="/packages/create"
          class="btn btn-primary btn-flat float-right"
          >Create package</router-link
        >
      </div>
    </div>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="packages.data" class="card">
            <div class="card-body">
              <div class="dataTables_wrapper dt-bootstrap4">
                <div class="row">
                  <!-- <div class="col-sm-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <select class="custom-select">
                          <option value="name">Name</option>
                          <option value="sku">SKU</option>
                        </select>
                      </div>
                      <input type="text" class="form-control" />
                      <span class="input-group-append">
                        <button type="button" class="btn btn-info btn-flat">
                          Search
                        </button>
                      </span>
                    </div>
                  </div> -->
                  <div class="col-sm-12">
                    <!-- TABLE -->
                    <table
                      class="table table-bordered table-hover dataTable dtr-inline"
                    >
                      <!-- NAME HEAD-->
                      <thead>
                        <tr>
                          <th
                            class="sorting sorting_asc"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-sort="ascending"
                            aria-label="Rendering engine: activate to sort column descending"
                          >
                            ID
                          </th>
                          <th
                            class="sorting sorting_asc"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-sort="ascending"
                            aria-label="Rendering engine: activate to sort column descending"
                          >
                            Name
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                          >
                            Description
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                          >
                            SKU
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Active
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Created At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Updated At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="packages"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <!-- TABLE BODY -->
                      <tbody>
                        <tr
                          v-for="(packageDetail, index) in packages.data"
                          :key="packageDetail"
                          :class="{
                            even: index % 2 === 0,
                            odd: index % 2 !== 0,
                          }"
                        >
                          <td>
                            {{ packageDetail.id }}
                          </td>
                          <td class="dtr-control sorting_1" tabindex="0">
                            {{ packageDetail.name }}
                          </td>
                          <td>{{ packageDetail.description }}</td>
                          <td>{{ packageDetail.sku }}</td>
                          <td>{{ packageDetail.active }}</td>
                          <td>
                            {{ moment.utc(packageDetail.created_at).fromNow() }}
                          </td>
                          <td>
                            {{ moment.utc(packageDetail.updated_at).fromNow() }}
                          </td>
                          <td>
                            <router-link
                              v-if="UserService.can('view any packages')"
                              :to="'/packages/' + packageDetail.id"
                              class="btn btn-secondary btn-flat mr-1"
                              >View</router-link
                            >
                            <router-link
                              v-if="UserService.can('edit packages')"
                              :to="'/packages/' + packageDetail.id + '/edit'"
                              class="btn btn-secondary btn-flat mr-1"
                            >
                              Edit
                            </router-link>
                            <button
                              v-if="UserService.can('delete packages')"
                              type="button"
                              class="btn btn-danger btn-flat"
                              @click="deletePackage(packageDetail.id)"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="row">
                      <!-- TABLE SHOWING -->
                      <div class="col-sm-12 col-md-5">
                        <div
                          id="example2_info"
                          class="dataTables_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {{ packages.meta.from }} to
                          {{ packages.meta.to }} of
                          {{ packages.meta.total }} entries
                        </div>
                      </div>
                      <!-- TABLE PAGINATION -->
                      <div class="col-sm-12 col-md-5">
                        <div
                          id="datatable_paginate"
                          class="dataTables_paginate paging_simple_numbers"
                        >
                          <ul class="pagination">
                            <li
                              id="datatable_previous"
                              class="paginate_button page-item previous"
                              :class="{
                                disabled: packages.links.prev === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: packages.links.prev === null,
                                }"
                                aria-controls="datatable"
                                :data-dt-idx="packages.meta.current_page - 1"
                                :tabindex="packages.meta.current_page - 1"
                                class="page-link"
                                @click="
                                  getAllPackages(
                                    packages.meta.current_page - 1,
                                    perPage,
                                  )
                                "
                              >
                                Previous
                              </button>
                            </li>
                            <li
                              v-for="index in packages.meta.last_page"
                              :key="index"
                              class="paginate_button page-item"
                              :class="{
                                active: index == packages.meta.current_page,
                              }"
                            >
                              <button
                                type="button"
                                aria-controls="datatable"
                                :data-dt-idx="index"
                                :tabindex="index"
                                class="page-link"
                                @click="getAllPackages(index, perPage)"
                              >
                                {{ index }}
                              </button>
                            </li>
                            <li
                              id="datatable_next"
                              class="paginate_button page-item next"
                              :class="{
                                disabled: packages.links.next === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: packages.links.next === null,
                                }"
                                aria-controls="pagination"
                                :data-dt-idx="packages.meta.current_page + 1"
                                :tabindex="packages.meta.current_page + 1"
                                class="page-link"
                                @click="
                                  getAllPackages(
                                    packages.meta.current_page + 1,
                                    perPage,
                                  )
                                "
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- TABLE SHOW PER PAGE -->
                      <div class="col-sm-12 col-md-2">
                        <label
                          >Show
                          <select
                            name="pagination-length"
                            aria-controls="pagination"
                            class="form-select form-select-sm"
                            @change="
                              getAllPackages(PAGE_DEFAULT, $event.target.value)
                            "
                          >
                            <option
                              v-for="perPageValue in perPages"
                              :key="perPageValue"
                              :value="perPageValue"
                              :selected="perPage == perPageValue"
                            >
                              {{ perPageValue }}
                            </option>
                          </select>
                          entries</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
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
import { useRoute } from "vue-router";
import moment from "moment";

const PER_PAGE_DEFAULT = 20;
const PAGE_DEFAULT = 1;

export default {
  name: "PackagesListPage",
  data() {
    return {
      packages: [],
      perPage: PER_PAGE_DEFAULT,
      page: PAGE_DEFAULT,
      perPages: [10, 20, 40, 100],
      PAGE_DEFAULT: PAGE_DEFAULT,
      PER_PAGE_DEFAULT: PER_PAGE_DEFAULT,
      UserService: UserService,
      moment: moment,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("view any packages")) {
      this.$router.push("/login");
    }
    const route = useRoute();
    this.perPage = route.query.per_page ?? PER_PAGE_DEFAULT;
    this.page = route.query.page ?? PAGE_DEFAULT;
    this.getAllPackages(this.page, this.perPage);
  },
  methods: {
    getAllPackages(page, perPage) {
      this.$router.push({
        path: this.$route.path,
        query: { page: page, per_page: perPage },
      });
      let thiss = this;
      PackageService.getAll(page, perPage).then(function (response) {
        thiss.packages = response;
      });
      return thiss.packages;
    },
    deletePackage(packageId) {
      let thiss = this;
      if (confirm("Do you really want to delete package #" + packageId + "?")) {
        PackageService.deletePackage(packageId).then(function () {
          thiss.getAllPackages(thiss.page, thiss.perPage);
        });
      }
    },
  },
};
</script>

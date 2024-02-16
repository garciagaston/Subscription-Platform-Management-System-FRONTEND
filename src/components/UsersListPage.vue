<template>
  <div class="content-header">
    <div class="row">
      <div class="col-6">
        <h1>Users</h1>
      </div>
      <div class="col-6">
        <router-link
          v-if="UserService.can('create users')"
          to="/users/create"
          class="btn btn-primary btn-flat float-right"
          >Create user</router-link
        >
      </div>
    </div>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="users.data" class="card">
            <div class="card-body">
              <div class="dataTables_wrapper dt-bootstrap4">
                <div class="row">
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
                            aria-controls="users"
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
                            aria-controls="users"
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
                            aria-controls="users"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                          >
                            Email
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="users"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                          >
                            Active Subscription
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="users"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Created At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="users"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Updated At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="users"
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
                          v-for="(user, index) in users.data"
                          :key="user"
                          :class="{
                            even: index % 2 === 0,
                            odd: index % 2 !== 0,
                          }"
                        >
                          <td>
                            {{ user.id }}
                          </td>
                          <td>
                            {{ user.name }}
                          </td>
                          <td>{{ user.email }}</td>
                          <td>{{ user.active_subscription !== null }}</td>
                          <td>
                            {{ moment.utc(user.created_at).fromNow() }}
                          </td>
                          <td>
                            {{ moment.utc(user.updated_at).fromNow() }}
                          </td>
                          <td>
                            <router-link
                              v-if="UserService.can('view any users')"
                              :id="'view-' + user.id"
                              :to="'/users/' + user.id"
                              class="btn btn-secondary btn-flat mr-1"
                              >View</router-link
                            >
                            <router-link
                              v-if="UserService.can('edit users')"
                              :id="'edit-' + user.id"
                              :to="'/users/' + user.id + '/edit'"
                              class="btn btn-secondary btn-flat mr-1"
                            >
                              Edit
                            </router-link>
                            <button
                              :id="'delete-' + user.id"
                              v-if="UserService.can('delete users')"
                              type="button"
                              class="btn btn-danger btn-flat"
                              @click="deleteUser(user.id)"
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
                          Showing {{ users.meta.from }} to
                          {{ users.meta.to }} of {{ users.meta.total }} entries
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
                                disabled: users.links.prev === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: users.links.prev === null,
                                }"
                                aria-controls="datatable"
                                :data-dt-idx="users.meta.current_page - 1"
                                :tabindex="users.meta.current_page - 1"
                                class="page-link"
                                @click="
                                  getAllUsers(
                                    users.meta.current_page - 1,
                                    perPage,
                                  )
                                "
                              >
                                Previous
                              </button>
                            </li>
                            <li
                              v-for="index in users.meta.last_page"
                              :key="index"
                              class="paginate_button page-item"
                              :class="{
                                active: index == users.meta.current_page,
                              }"
                            >
                              <button
                                type="button"
                                aria-controls="datatable"
                                :data-dt-idx="index"
                                :tabindex="index"
                                class="page-link"
                                @click="getAllUsers(index, perPage)"
                              >
                                {{ index }}
                              </button>
                            </li>
                            <li
                              id="datatable_next"
                              class="paginate_button page-item next"
                              :class="{
                                disabled: users.links.next === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: users.links.next === null,
                                }"
                                aria-controls="pagination"
                                :data-dt-idx="users.meta.current_page + 1"
                                :tabindex="users.meta.current_page + 1"
                                class="page-link"
                                @click="
                                  getAllUsers(
                                    users.meta.current_page + 1,
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
                              getAllUsers(PAGE_DEFAULT, $event.target.value)
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
import UsersService from "../services/users.service.js";
import UserService from "../services/user.service.js";
import { useRoute } from "vue-router";
import moment from "moment";

const PER_PAGE_DEFAULT = 20;
const PAGE_DEFAULT = 1;

export default {
  name: "UsersListPage",
  data() {
    return {
      users: [],
      perPage: PER_PAGE_DEFAULT,
      page: PAGE_DEFAULT,
      perPages: [10, 20, 40, 100],
      PAGE_DEFAULT: PAGE_DEFAULT,
      PER_PAGE_DEFAULT: PER_PAGE_DEFAULT,
      UserService: UserService,
      UsersService: UsersService,
      moment: moment,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("view any users")) {
      this.$router.push("/login");
    }
    const route = useRoute();
    this.perPage = route.query.per_page ?? PER_PAGE_DEFAULT;
    this.page = route.query.page ?? PAGE_DEFAULT;
    this.getAllUsers(this.page, this.perPage);
  },
  methods: {
    getAllUsers(page, perPage) {
      this.$router.push({
        path: this.$route.path,
        query: { page: page, per_page: perPage },
      });
      this.page = page;
      this.perPage = perPage;
      let thiss = this;
      UsersService.getAll(page, perPage).then(function (response) {
        thiss.users = response;
      });
      return thiss.users;
    },
    deleteUser(userId) {
      let thiss = this;
      if (confirm("Do you really want to delete user #" + userId + "?")) {
        UsersService.deleteUser(userId).then(function () {
          thiss.getAllUsers(thiss.page, thiss.perPage);
        });
      }
    },
  },
};
</script>

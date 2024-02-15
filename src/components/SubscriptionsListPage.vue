<template>
  <div class="content-header">
    <div class="row">
      <div class="col-6">
        <h1>Subscriptions</h1>
      </div>
      <div class="col-6">
        <router-link
          v-if="UserService.can('create subscriptions')"
          to="/subscriptions/create"
          class="btn btn-primary btn-flat float-right"
          >Create subscription</router-link
        >
      </div>
    </div>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="subscriptions.data" class="card">
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
                            aria-controls="subscriptions"
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
                            aria-controls="subscriptions"
                            rowspan="1"
                            colspan="1"
                            aria-sort="ascending"
                            aria-label="Rendering engine: activate to sort column descending"
                          >
                            User Id
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="subscriptions"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                          >
                            Package Id
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="subscriptions"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                          >
                            Start Date
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="subscriptions"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                          >
                            End Date
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="subscriptions"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Created At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="subscriptions"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Updated At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="subscriptions"
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
                          v-for="(
                            subscription, index
                          ) in subscriptions.data"
                          :key="subscription"
                          :class="{
                            even: index % 2 === 0,
                            odd: index % 2 !== 0,
                          }"
                        >
                          <td>
                            {{ subscription.id }}
                          </td>
                          <td>
                            {{ subscription.user_id }}
                          </td>
                          <td><router-link
                            v-if="UserService.can('view packages')"
                            :to="'/packages/' + subscription.package_id"
                            class="btn btn-text"
                            ><i class="fas fa-eye"></i> Package #{{
                              subscription.package_id
                            }}</router-link
                          ></td>
                          <td>{{ subscription.start_date }}</td>
                          <td>{{ subscription.end_date }}</td>
                          <td>
                            {{
                              moment
                                .utc(subscription.created_at)
                                .fromNow()
                            }}
                          </td>
                          <td>
                            {{
                              moment
                                .utc(subscription.updated_at)
                                .fromNow()
                            }}
                          </td>
                          <td>
                            <router-link
                              v-if="UserService.can('view any subscriptions')"
                              :to="'/subscriptions/' + subscription.id"
                              class="btn btn-secondary btn-flat mr-1"
                              >View</router-link
                            >
                            <router-link
                              v-if="UserService.can('edit subscriptions')"
                              :to="
                                '/subscriptions/' +
                                subscription.id +
                                '/edit'
                              "
                              class="btn btn-secondary btn-flat mr-1"
                            >
                              Edit
                            </router-link>
                            <button
                              v-if="UserService.can('delete subscriptions')"
                              type="button"
                              class="btn btn-danger btn-flat"
                              @click="deleteSubscription(subscription.id)"
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
                          Showing {{ subscriptions.meta.from }} to
                          {{ subscriptions.meta.to }} of
                          {{ subscriptions.meta.total }} entries
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
                                disabled: subscriptions.links.prev === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: subscriptions.links.prev === null,
                                }"
                                aria-controls="datatable"
                                :data-dt-idx="
                                  subscriptions.meta.current_page - 1
                                "
                                :tabindex="subscriptions.meta.current_page - 1"
                                class="page-link"
                                @click="
                                  getAllSubscriptions(
                                    subscriptions.meta.current_page - 1,
                                    perPage,
                                  )
                                "
                              >
                                Previous
                              </button>
                            </li>
                            <li
                              v-for="index in subscriptions.meta.last_page"
                              :key="index"
                              class="paginate_button page-item"
                              :class="{
                                active:
                                  index == subscriptions.meta.current_page,
                              }"
                            >
                              <button
                                type="button"
                                aria-controls="datatable"
                                :data-dt-idx="index"
                                :tabindex="index"
                                class="page-link"
                                @click="getAllSubscriptions(index, perPage)"
                              >
                                {{ index }}
                              </button>
                            </li>
                            <li
                              id="datatable_next"
                              class="paginate_button page-item next"
                              :class="{
                                disabled: subscriptions.links.next === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: subscriptions.links.next === null,
                                }"
                                aria-controls="pagination"
                                :data-dt-idx="
                                  subscriptions.meta.current_page + 1
                                "
                                :tabindex="subscriptions.meta.current_page + 1"
                                class="page-link"
                                @click="
                                  getAllSubscriptions(
                                    subscriptions.meta.current_page + 1,
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
                              getAllSubscriptions(
                                PAGE_DEFAULT,
                                $event.target.value,
                              )
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
import SubscriptionService from "../services/subscriptions.service.js";
import UserService from "../services/user.service.js";
import { useRoute } from "vue-router";
import moment from "moment";

const PER_PAGE_DEFAULT = 20;
const PAGE_DEFAULT = 1;

export default {
  name: "SubscriptionsListPage",
  data() {
    return {
      subscriptions: [],
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
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("view any subscriptions")) {
      this.$router.push("/login");
    }
    const route = useRoute();
    this.perPage = route.query.per_page ?? PER_PAGE_DEFAULT;
    this.page = route.query.page ?? PAGE_DEFAULT;
    this.getAllSubscriptions(this.page, this.perPage);
  },
  methods: {
    getAllSubscriptions(page, perPage) {
      this.$router.push({
        path: this.$route.path,
        query: { page: page, per_page: perPage },
      });
      this.page = page;
      this.perPage = perPage;
      let thiss = this;
      SubscriptionService.getAll(page, perPage).then(function (response) {
        thiss.subscriptions = response;
      });
      return thiss.subscriptions;
    },
    deleteSubscription(subscriptionId) {
      let thiss = this;
      if (
        confirm(
          "Do you really want to delete subscription #" + subscriptionId + "?",
        )
      ) {
        SubscriptionService.deleteSubscription(subscriptionId).then(
          function () {
            thiss.getAllSubscriptions(thiss.page, thiss.perPage);
          },
        );
      }
    },
  },
};
</script>

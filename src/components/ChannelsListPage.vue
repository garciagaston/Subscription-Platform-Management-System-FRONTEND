<template>
  <div class="content-header">
    <div class="row">
      <div class="col-6">
        <h1>Channels</h1>
      </div>
      <div class="col-6">
        <router-link
          v-if="UserService.can('create channels')"
          to="/channels/create"
          class="btn btn-primary btn-flat float-right"
          >Create channel</router-link
        >
      </div>
    </div>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="channels.data" class="card">
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
                            aria-controls="channels"
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
                            aria-controls="channels"
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
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                          >
                            Description
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                          >
                            Lineup Id
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                          >
                            Call Sign
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Active
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Display Order
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Created At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                          >
                            Updated At
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="channels"
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
                          v-for="(channelDetail, index) in channels.data"
                          :key="channelDetail"
                          :class="{
                            even: index % 2 === 0,
                            odd: index % 2 !== 0,
                          }"
                        >
                          <td>
                            {{ channelDetail.id }}
                          </td>
                          <td class="dtr-control sorting_1" tabindex="0">
                            {{ channelDetail.name }}
                          </td>
                          <td>{{ channelDetail.description }}</td>
                          <td>{{ channelDetail.lineup_id }}</td>
                          <td>{{ channelDetail.call_sign }}</td>
                          <td>{{ channelDetail.active }}</td>
                          <td>{{ channelDetail.display_order }}</td>
                          <td>
                            {{ moment.utc(channelDetail.created_at).fromNow() }}
                          </td>
                          <td>
                            {{ moment.utc(channelDetail.updated_at).fromNow() }}
                          </td>
                          <td>
                            <router-link
                              v-if="UserService.can('view any channels')"
                              :to="'/channels/' + channelDetail.id"
                              class="btn btn-secondary btn-flat mr-1"
                              >View</router-link
                            >
                            <router-link
                              v-if="UserService.can('edit channels')"
                              :to="'/channels/' + channelDetail.id + '/edit'"
                              class="btn btn-secondary btn-flat mr-1"
                            >
                              Edit
                            </router-link>
                            <button
                              v-if="UserService.can('delete channels')"
                              type="button"
                              class="btn btn-danger btn-flat"
                              @click="deleteChannel(channelDetail.id)"
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
                          Showing {{ channels.meta.from }} to
                          {{ channels.meta.to }} of
                          {{ channels.meta.total }} entries
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
                                disabled: channels.links.prev === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: channels.links.prev === null,
                                }"
                                aria-controls="datatable"
                                :data-dt-idx="channels.meta.current_page - 1"
                                :tabindex="channels.meta.current_page - 1"
                                class="page-link"
                                @click="
                                  getAllChannels(
                                    channels.meta.current_page - 1,
                                    perPage,
                                  )
                                "
                              >
                                Previous
                              </button>
                            </li>
                            <li
                              v-for="index in channels.meta.last_page"
                              :key="index"
                              class="paginate_button page-item"
                              :class="{
                                active: index == channels.meta.current_page,
                              }"
                            >
                              <button
                                type="button"
                                aria-controls="datatable"
                                :data-dt-idx="index"
                                :tabindex="index"
                                class="page-link"
                                @click="getAllChannels(index, perPage)"
                              >
                                {{ index }}
                              </button>
                            </li>
                            <li
                              id="datatable_next"
                              class="paginate_button page-item next"
                              :class="{
                                disabled: channels.links.next === null,
                              }"
                            >
                              <button
                                type="button"
                                :class="{
                                  disabled: channels.links.next === null,
                                }"
                                aria-controls="pagination"
                                :data-dt-idx="channels.meta.current_page + 1"
                                :tabindex="channels.meta.current_page + 1"
                                class="page-link"
                                @click="
                                  getAllChannels(
                                    channels.meta.current_page + 1,
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
                              getAllChannels(PAGE_DEFAULT, $event.target.value)
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
import ChannelService from "../services/channels.service.js";
import UserService from "../services/user.service.js";
import { useRoute } from "vue-router";
import moment from "moment";

const PER_PAGE_DEFAULT = 20;
const PAGE_DEFAULT = 1;

export default {
  name: "ChannelsListPage",
  data() {
    return {
      channels: [],
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
    if (!this.currentUser || !UserService.can("view any channels")) {
      this.$router.push("/login");
    }
    const route = useRoute();
    this.perPage = route.query.per_page ?? PER_PAGE_DEFAULT;
    this.page = route.query.page ?? PAGE_DEFAULT;
    this.getAllChannels(this.page, this.perPage);
  },
  methods: {
    getAllChannels(page, perPage) {
      this.$router.push({
        path: this.$route.path,
        query: { page: page, per_page: perPage },
      });
      this.page = page;
      this.perPage = perPage;
      let thiss = this;
      ChannelService.getAll(page, perPage).then(function (response) {
        thiss.channels = response;
      });
      return thiss.channels;
    },
    deleteChannel(channelId) {
      let thiss = this;
      if (confirm("Do you really want to delete channel #" + channelId + "?")) {
        ChannelService.deleteChannel(channelId).then(function () {
          thiss.getAllChannels(thiss.page, thiss.perPage);
        });
      }
    },
  },
};
</script>

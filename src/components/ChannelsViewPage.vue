<template>
  <div class="content-header">
    <h1>Channel Detail</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div
                v-if="channelDetail"
                class="col-12 col-md-12 col-lg-4 order-1 order-md-2"
              >
                <h3 class="text-primary">
                  <i class="fas fa-cube"></i> {{ channelDetail.name }}
                </h3>
                <p class="text-muted">
                  {{ channelDetail.description }}
                </p>
                <br />
                <div class="text-muted">
                  <p class="text-sm">
                    Name
                    <b class="d-block">{{ channelDetail.name }}</b>
                  </p>
                  <p class="text-sm">
                    Description
                    <b class="d-block">{{ channelDetail.description }}</b>
                  </p>
                  <p class="text-sm">
                    image_url
                    <b class="d-block">{{ channelDetail.image_url }}</b>
                  </p>
                  <p class="text-sm">
                    lineup_id
                    <b class="d-block">{{ channelDetail.lineup_id }}</b>
                  </p>
                  <p class="text-sm">
                    call_sign
                    <b class="d-block">{{ channelDetail.call_sign }}</b>
                  </p>
                  <p class="text-sm">
                    active
                    <b class="d-block">{{ channelDetail.active }}</b>
                  </p>
                  <p class="text-sm">
                    display_order
                    <b class="d-block">{{ channelDetail.display_order }}</b>
                  </p>
                  <p class="text-sm">
                    created_at
                    <b class="d-block">{{
                      moment
                        .utc(channelDetail.created_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p class="text-sm">
                    updated_at
                    <b class="d-block">{{
                      moment
                        .utc(channelDetail.updated_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                  <p v-if="channelDetail.deleted_at" class="text-sm">
                    deleted_at
                    <b class="d-block">{{
                      moment
                        .utc(channelDetail.deleted_at)
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}</b>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer clearfix">
              <router-link
                v-if="UserService.can('edit channels')"
                :to="'/channels/' + channelId + '/edit'"
                class="btn btn-primary float-right"
                ><i class="fas fa-pencil"></i> Edit Channel</router-link
              >
              <router-link
                v-if="UserService.can('view any channels')"
                to="/channels"
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
import ChannelService from "../services/channels.service.js";
import UserService from "../services/user.service.js";
import moment from "moment";

export default {
  name: "ChannelsViewPage",
  data() {
    return {
      channelDetail: null,
      channelId: this.$route.params.id,
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
    if (!this.currentUser || !UserService.can("view channels")) {
      this.$router.push("/login");
    }
    this.getChannel(this.channelId);
  },
  methods: {
    getChannel(channelId) {
      let thiss = this;
      ChannelService.getChannel(channelId).then(function (response) {
        thiss.channelDetail = response.data;
      });
      return thiss.channelDetail;
    },
  },
};
</script>

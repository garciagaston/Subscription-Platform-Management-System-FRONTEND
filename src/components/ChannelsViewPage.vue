<template>
  <div class="content-header">
    <h1>Channel</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Channel Detail</h3>
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
                v-if="channel"
                class="col-12 col-md-12 col-lg-4 order-1 order-md-2"
              >
                <ChannelDetail v-if="channel" :channel="channel" />
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
import ChannelDetail from "./ChannelDetail";

export default {
  name: "ChannelsViewPage",
  data() {
    return {
      channel: null,
      channelId: this.$route.params.id,
      UserService: UserService,
      moment: moment,
      ChannelDetail: ChannelDetail,
    };
  },
  components: {
    ChannelDetail,
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
        thiss.channel = response.data;
      });
      return thiss.channel;
    },
  },
};
</script>

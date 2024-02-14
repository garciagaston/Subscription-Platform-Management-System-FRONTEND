<template>
  <div class="content-header">
    <h1>Edit Channel</h1>
  </div>
  <div class="content px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <ChannelsForm
              v-if="channelDetail"
              :channel-detail="channelDetail"
              @on-submit="editChannel"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelService from "../services/channels.service.js";
import UserService from "../services/user.service.js";
import ChannelsForm from "./ChannelsForm";

export default {
  name: "ChannelsEditPage",
  components: {
    ChannelsForm,
  },
  data() {
    return {
      channelDetail: null,
      UserService: UserService,
      ChannelService: ChannelService,
    };
  },
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !UserService.can("edit channels")) {
      this.$router.push("/login");
    }
    this.getChannel(this.$route.params.id);
  },
  methods: {
    getChannel(channelId) {
      let thiss = this;
      ChannelService.getChannel(channelId).then(function (response) {
        thiss.channelDetail = response.data;
      });
      return thiss.channelDetail;
    },
    editChannel(channelForm) {
      this.ChannelService.editChannel(this.channelDetail.id, channelForm).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/channels");
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

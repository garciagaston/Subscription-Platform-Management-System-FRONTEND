<template>
  <header class="jumbotron">
    <h3>
      <strong>{{ currentUser.user.name }}</strong> Profile
    </h3>
  </header>
  <p>
    <strong>Token:</strong>
    {{ currentUser.token.substring(0, 20) }} ...
    {{ currentUser.token.substr(currentUser.token.length - 20) }}
  </p>
  <p>
    <strong>Id:</strong>
    {{ currentUser.user.id }}
  </p>
  <p>
    <strong>Name:</strong>
    {{ currentUser.user.name }}
  </p>
  <p>
    <strong>Email:</strong>
    {{ currentUser.user.email }}
  </p>
  <strong>Role:</strong>
  <ul>
    <li>{{ currentUser.user.role.name }}</li>
  </ul>
  <strong>Permissions:</strong>
  <ul>
    <li v-for="permission in currentUser.user.permissions" :key="permission">
      {{ permission }}
    </li>
  </ul>
  <strong>Active Subscriptions:</strong>
  <ul>
    <li
      v-for="subscription in currentUser.user.subscriptions"
      :key="subscription"
    >
      Subscription #{{ subscription.id }}:
      <ul v-if="subscription.active">
        <li>Start Date: {{ subscription.start_date }}</li>
        <li>End Date: {{ subscription.end_date }}</li>
        <li>
          Package #{{ subscription.package.id }}:
          {{ subscription.package.name }}
        </li>
        <li>
          Channels:
          <ul>
            <li v-for="channel in subscription.package.channels" :key="channel">
              Channel #{{ channel.id }}: {{ channel.name }}
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProfilePage",
  computed: {
    currentUser() {
      return this.$store?.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

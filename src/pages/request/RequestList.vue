<template>
  <base-card>
    <header>
      <h2>Request Received</h2>
    </header>
    <ul v-if="hasRequests">
      <request
        :email="request.userEmail"
        :message="request.message"
        :key="request.id"
        v-for="request of requests"
      ></request>
    </ul>
    <h3 v-else>You haven't received any request yet.</h3>
  </base-card>
</template>

<script>
import Request from './Request.vue';
export default {
  components: { Request },
  computed: {
    requests() {
      return this.$store.getters['request/getCoachSpecificRequest'];
    },
    hasRequests() {
      return this.$store.getters['request/hasRequests'];
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

<template>
  <base-dialog
    v-if="hasError"
    title="Error"
    :show="hasError"
    @close="closeModal"
  >
    <p>{{ error }}</p>
  </base-dialog>
  <base-card>
    <header>
      <h2>Request Received</h2>
    </header>
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else-if="hasRequests">
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
import BaseDialog from '../../components/ui/BaseDialog.vue';
import Request from './Request.vue';
export default {
  components: { Request, BaseDialog },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchAllRequest() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('request/loadRequestData');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.error = error.message || 'Unable to fetch requests';
      }
    },
    closeModal() {
      this.error = null;
    },
  },
  computed: {
    requests() {
      return this.$store.getters['request/getAllRequests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['request/hasRequests'];
    },
    hasError() {
      return !!this.error;
    },
  },
  created() {
    this.fetchAllRequest();
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

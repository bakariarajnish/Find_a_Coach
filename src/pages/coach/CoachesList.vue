<template>
  <section>
    <coach-filter @filter-change="updatedFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh List</base-button>
        <base-button isLink to="/register" v-if="!isCoachLoggedIn"
          >Register as Coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
        <li v-for="coach in filterCoaches" :key="coach.id">
          <Coach
            :id="coach.id"
            :key="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></Coach>
        </li>
      </ul>
      <h3 v-else>No Coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import Coach from '../../components/coach/Coach.vue';
import CoachFilter from '../../components/coach/CoachFilter.vue';
export default {
  components: { Coach, CoachFilter },
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filterCoaches() {
      const coaches = this.$store.getters['coach/getAllCoaches'];
      const filteredCoaches = [];
      for (let coach of coaches) {
        for (let filter in this.filters) {
          if (this.filters[filter] == true && coach.areas.includes(filter)) {
            filteredCoaches.push(coach);
            break;
          }
        }
      }
      return filteredCoaches;
    },
    hasCoaches() {
      return this.$store.getters['coach/hasCoaches'];
    },
    isCoachLoggedIn() {
      return this.$store.getters['getLoggedInCoachId'];
    },
  },
  methods: {
    updatedFilter(filters) {
      this.filters = filters;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

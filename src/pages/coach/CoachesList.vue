<template>
  <h1>Coaches List Component</h1>
  <section>
    <div class="controls">
      <button>Refresh List</button> |
      <router-link to="/register">Register as Coach</router-link>
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
  </section>
</template>

<script>
import Coach from '../../components/coach/Coach.vue';
export default {
  components: { Coach },
  computed: {
    filterCoaches() {
      return this.$store.getters['coach/getAllCoaches'];
    },
    hasCoaches() {
      return this.$store.getters['coach/hasCoaches'];
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

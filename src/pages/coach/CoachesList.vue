<template>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh List</base-button>
        <base-button isLink to="/register">Register as Coach</base-button>
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
import BaseButton from '../../components/ui/BaseButton.vue';
export default {
  components: { Coach, BaseButton },
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

<template>
  <div>
    <base-dialog :show="!!error" title="Error" @close="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @filter-change="updatedFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh List</base-button
          >
          <base-button
            isLink
            to="/register"
            v-if="!isRegistredAsCoach && isCoachLoggedIn"
            >Register as Coach</base-button
          >
          <base-button
            isLink
            to="/login?redirect=register"
            v-if="!isCoachLoggedIn"
            >Login to register as coach</base-button
          >
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoaches">
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
  </div>
</template>

<script>
import Coach from '../../components/coach/Coach.vue';
import CoachFilter from '../../components/coach/CoachFilter.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
  components: { Coach, CoachFilter, BaseDialog, BaseButton },
  data() {
    return {
      isLoading: false,
      error: null,
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
      return !this.isLoading && this.$store.getters['coach/hasCoaches'];
    },
    isCoachLoggedIn() {
      return this.$store.getters['coach/getCoachDetail'] !== null
        ? true
        : false;
    },
    isRegistredAsCoach() {
      return this.$store.getters['coach/isRegisteredAsCoach'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    updatedFilter(filters) {
      this.filters = filters;
    },
    async loadCoaches(reloadRequired = false) {
      console.log('reloadRequired', reloadRequired);
      if (!reloadRequired && !this.isLatestCoachesListRequired()) {
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch('coach/loadCoachesData');
      } catch (error) {
        this.error = error.message || 'Some issue while fetching data.';
      }

      this.isLoading = false;
    },
    closeDialog() {
      this.error = null;
    },
    isLatestCoachesListRequired() {
      const lastLoadedTime = this.$store.getters['coach/getLastRefreshTime'];
      if (lastLoadedTime == null) {
        this.$store.dispatch('coach/updateLastTimeCoachesLoaded');
      } else {
        const currentTime = new Date().getTime();
        const isNewDataRequired = (currentTime - lastLoadedTime) / 1000 > 60;
        if (isNewDataRequired) {
          this.$store.dispatch('coach/updateLastTimeCoachesLoaded');
          return true;
        }
        return false;
      }
      console.log('RRRR');
      return true;
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

<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>£{{ selectedCoach.hourlyRate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button v-if="!isNotContactPage" isLink :to="contactLink"
          >Contact</base-button
        >
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in selectedCoach.areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['coachId'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coach/getAllCoaches'].find(
      (coach) => coach.id === this.coachId
    );
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    isNotContactPage() {
      return this.$route.path.includes('/contact') ? true : false;
    },
  },
};
</script>

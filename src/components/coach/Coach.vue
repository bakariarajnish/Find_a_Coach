<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>£{{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" isLink :to="contactDetailUrl"
        >Contact</base-button
      >
      <base-button isLink :to="viewDetailUrl">View Details</base-button>
    </div>
  </li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    contactDetailUrl() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    viewDetailUrl() {
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>
<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>

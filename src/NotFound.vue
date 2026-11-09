<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>
        Sorry this page not found. Please go to home page
        <router-link to="/coaches">Coaches</router-link>
      </p>
    </base-card>
  </section>
</template>

<script>
import BaseCard from './components/ui/BaseCard.vue';
export default {
  components: { BaseCard },
};
</script>

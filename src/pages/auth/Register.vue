<template>
  <base-card>
    <h2>Register As Coach now!</h2>
    <register-form @coach-data="saveEnteredCoachData"></register-form>
  </base-card>
</template>

<script>
import RegisterForm from '../../components/coach/RegisterForm.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
export default {
  components: {
    RegisterForm,
    BaseCard,
  },
  methods: {
    saveEnteredCoachData(data) {
      this.$store.dispatch('coach/addNewCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>

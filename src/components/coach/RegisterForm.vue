<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">FirstName</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        v-model.trim="firstName.value"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">LastName</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        v-model.trim="lastName.value"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows="5"
        v-model.trim="description.value"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        name="rate"
        v-model.number="hourlyRate.value"
      />
      <p v-if="!hourlyRate.isValid">HourlyRate must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">Please select atleast one area of expertise</p>
    </div>
    <p v-if="!isFormValid">Please fix the above errors and submit again</p>
    <div>
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['coach-data'],
  data() {
    return {
      firstName: {
        value: '',
        isValid: true,
      },
      lastName: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
      hourlyRate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    clearInput(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.isFormValid = true;
      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.isFormValid = false;
      } else {
        this.clearInput('firstName');
      }
      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.isFormValid = false;
      } else {
        this.clearInput('lastName');
      }
      if (this.description.value === '') {
        this.description.isValid = false;
        this.isFormValid = false;
      } else {
        this.clearInput('description');
      }
      if (!this.hourlyRate.value || this.hourlyRate.value < 0) {
        this.hourlyRate.isValid = false;
        this.isFormValid = false;
      } else {
        this.clearInput('hourlyRate');
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.isFormValid = false;
      } else {
        this.clearInput('areas');
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.isFormValid) {
        return;
      }
      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        description: this.description.value,
        rate: this.hourlyRate.value,
        areas: this.areas.value,
      };

      this.$emit('coach-data', formData);
    },
  },
};
</script>

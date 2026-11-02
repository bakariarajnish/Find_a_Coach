<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="updateFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="updateFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="updateFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  event: ['filter-change'],
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    updateFilter(event) {
      const filterIdentifier = event.target.id;
      const isSelected = event.target.checked;

      const updatedFilter = {
        ...this.filter,
        [filterIdentifier]: isSelected,
      };
      this.filter = updatedFilter;
      this.$emit('filter-change', updatedFilter);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>

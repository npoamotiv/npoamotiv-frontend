<template>
  <div class="form-group">
    <label v-if="props.label" :for="id" class="form-label">{{ props.label }}</label>
    <input
      :id="id"
      :type="props.type"
      :value="props.modelValue"
      @input="updateValue"
      :placeholder="props.placeholder"
      :required="props.required"
      class="form-input"
      :class="{ 'has-error': props.error }"
    />
    <span v-if="error" class="error-text">{{ props.error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const id = computed(
  () => `input-${Math.random().toString(36).substring(2, 9)}`
);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-label {
  display: block;
  margin-bottom: 7px;
  color: var(--grey-color);
  font-weight: 400;
  font-size: 1rem;
}

.form-input {
  transition: border-color 0.2s;
  border: 1px solid #d5d5d6;
  border-radius: 0.75rem;
  max-width: 28.75rem;
  width: 100%;
  height: 3.5rem;
  font-weight: 400;
  font-size: 1rem;
  color: var(--grey-light-color);
  padding: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-input.has-error {
  border-color: #dc3545;
}

.error-text {
  display: block;
  margin-top: 0.25rem;
  color: #dc3545;
  font-size: 0.875rem;
}
</style>

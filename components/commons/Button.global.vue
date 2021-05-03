<template>
  <button
    v-bind="$attrs"
    type="button"
    :disabled="loading"
    :class="[$style.btn, { [$style.block]: block }]"
  >
    <slot>Submit</slot><span v-if="loading" :class="$style.spinner"></span>
  </button>
</template>
<script>
export default {
  name: 'AppButton',
  props: {
    loading: {
      type: Boolean
    },
    block: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" module>
$spinner-width: 15px;
.spinner {
  display: inline-block;
  margin-left: 10px;
  margin-top: 1px;
  width: $spinner-width;
  height: $spinner-width;
  flex: 0 0 $spinner-width;
  vertical-align: text-bottom;
  border: 1px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
    transition-timing-function: ease-in;
  }
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  background-color: #5b338b;
  text-align: center;
  vertical-align: middle;
  border: 2px solid transparent;
  text-transform: uppercase;
  color: #ffffff;
  &.block {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
  }
  &.disabled,
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>

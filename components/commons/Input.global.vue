<template>
  <ValidationProvider
    ref="validator"
    v-slot="{ errors, failed, ariaMsg, ariaInput }"
    :rules="rules"
    :custom-messages="customMessages"
    :name="name"
    :vid="vid"
    mode="passive"
    tag="div"
    :class="$style.wrapper"
  >
    <div
      :class="[
        $style.input,
        {
          [$style.invalid]: failed,
          [$style.floated]: value || floated,
          [$style.focusing]: focusing
        }
      ]"
    >
      <slot>
        <input
          ref="input"
          :value="value"
          v-bind="[$attrs, ariaInput]"
          :name="name"
          :type="inputTypeState"
          :placeholder="placeholder"
          @input="onInput"
          @focus="onFocusing"
          @blur="onFocusOut"
        />
        <label v-bind="ariaMsg">{{ label }}</label>
        <svg-icon
          v-if="type === 'password'"
          :class="$style.toggle_eye"
          :name="passwordVisible ? 'icons/ico-eye-close' : 'icons/ico-eye'"
          width="24"
          height="24"
          @click="passwordVisible = !passwordVisible"
        />
        <slot name="append" />
      </slot>
    </div>
    <div :class="$style.errors">
      <span v-if="errors && errors.length" :class="$style.invalid">{{
        errors[0]
      }}</span>
    </div>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'AppInput',
  components: {
    ValidationProvider
  },
  props: {
    vid: {
      type: String,
      default: null
    },
    rules: {
      type: [String, Object],
      default: null
    },
    customMessages: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: null,
      default: null
    },
    name: {
      type: String,
      default: 'field'
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    },
    floated: {
      type: Boolean
    }
  },
  data: () => ({
    focusing: false,
    passwordVisible: false
  }),
  computed: {
    inputTypeState() {
      return this.passwordVisible ? `text` : this.type
    }
  },
  methods: {
    onInput($event) {
      this.$emit('input', $event.target.value)
    },
    setFocusState(state) {
      this.focusing = state
    },
    onFocusing() {
      this.setFocusState(true)
    },
    onFocusOut() {
      this.setFocusState(false)
    },
    focusInput() {
      this.$refs.input.focus()
    }
  }
}
</script>
<style lang="scss" module>
@mixin floatingLabel() {
  > label {
    transform: scale(0.75) translateY(-33px) translateX(12px);
    background-color: #ffffff;
    padding: 0 8px;
    z-index: 2;
  }
}

.wrapper {
  position: relative;
  min-height: 90px;
  > .input {
    display: flex;
    align-items: center;
    position: relative;
    &.floated,
    &.focusing {
      > input {
        outline: none;
      }
      @include floatingLabel();
    }

    &.focusing {
      > input {
        border: solid 1px #5b338b;
      }
      > label {
        color: #5b338b;
        z-index: 60;
      }
    }
    > input {
      z-index: 1;
      background-color: transparent;
      height: 56px;
      width: 100%;
      max-width: 100%;
      font-size: 16px;
      line-height: 16px;
      padding: 19px 1rem;
      border-radius: 4px;
      border: solid 1px #3b8070;
      &:focus {
        outline: none;
      }
    }
    > label {
      transform-origin: 0 0;
      color: #35495e;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: transform, padding;
      transform: translate(17px, 0);
      position: absolute;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      margin: 0;
      padding: 0;
      z-index: 0;
    }
    &.invalid {
      > input {
        border-color: red;
      }
      > label {
        color: red;
      }
    }
    .toggle_eye {
      position: absolute;
      z-index: 3;
      cursor: pointer;
      right: 16px;
    }
  }
  .errors {
    span {
      margin: 4px;
      color: red;
      font-size: 12px;
      text-align: left;
      line-height: 12px;
      display: flex;
    }
  }
}
</style>

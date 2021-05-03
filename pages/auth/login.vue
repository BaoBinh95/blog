<template>
  <auth-layout>
    <template slot="body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(loginAction)">
          <div class="login">
            <img
              alt="Twentyci Logo"
              src="https://testportal.twentyci.asia/wp-content/themes/magentotest/assets/images/Logo.png"
            />
            <app-input
              v-model="credentials.email"
              label="Email"
              name="email"
              rules="required"
            />
            <app-input
              v-model="credentials.password"
              label="Password"
              name="password"
              type="password"
              rules="required"
            />
            <app-button block type="submit" :loading="loading"
              >Log In</app-button
            >
          </div>
        </form>
      </ValidationObserver>
    </template>
  </auth-layout>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AuthLayout from '~/components/partials/auth/Layout'
export default {
  name: 'Login',
  components: {
    AuthLayout,
    ValidationObserver
  },
  data() {
    return {
      credentials: {},
      loading: false
    }
  },
  head() {
    return {
      title: 'Admin Area'
    }
  },
  methods: {
    async loginAction() {
      this.loading = true
      await this.$axios
        .$post('/login', this.credentials)
        .then(async ({ token }) => {
          if (token) {
            await Promise.all([
              this.$store.dispatch('auth/authenticated', token)
            ]).then(() => {
              this.$router.push({ name: 'index' })
            })
          }
        })
        .catch(errors => console.log(errors))
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  img {
    padding: 30px 0;
  }
}
</style>

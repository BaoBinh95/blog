<template>
  <div class="main">
    <div class="content">
      <slot name="body" />
    </div>
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} TwentyCI Asia
      <p>Design by Ha Pham</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
$auth-width: 555px;
$phone-width: 452px;

@mixin phone {
  @media (max-width: $phone-width) {
    @content
  }
}

@mixin desktop {
  @media (min-width: $phone-width + 1px) {
    @content
  }
}

.main {
  with: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.content {
  max-width: $auth-width;
  width: 100%;
}

.footer {
  width: 100%;
  padding-bottom: 24px;
  p {
    max-width: $auth-width;
    margin: auto;
    text-align: center;
    font-size: 14px;
  }
}
</style>

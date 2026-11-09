<template>
  <div>
    <base-dialog :show="isLoading" fixed title="Authenticating. Please wait...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="Error" @close="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter email and password (atleast 6 characters long) before
          submitting the form.
        </p>
        <base-button type="submit">{{ submitButtonText }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchAuthModeBtnText
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      authMode: 'Login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === '' ||
        this.password.length < 5
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      let loginData = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.authMode === 'Login') {
          await this.$store.dispatch('login', loginData);
        } else if (this.authMode === 'Signup') {
          await this.$store.dispatch('signUp', loginData);
        }
      } catch (error) {
        console.log(error.message);
        if (error.message === 'EMAIL_EXISTS') {
          this.error =
            'The email address is already in use by another account.';
        } else if (error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          this.error =
            'We have blocked all requests from this device due to unusual activity. Try again later.';
        } else if (error.message === 'EMAIL_NOT_FOUND') {
          this.error =
            'There is no user record corresponding to this identifier. The user may have been deleted.';
        } else if (error.message === 'INVALID_PASSWORD') {
          this.error =
            'The password is invalid or the user does not have a password.';
        } else if (error.message === 'USER_DISABLED') {
          this.error =
            'The user account has been disabled by an administrator.';
        } else if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
          this.error =
            'The password is invalid or the user does not have a password.';
        } else {
          this.error = 'Unable to authenticate. Please check login data.';
        }
      }

      this.isLoading = false;
    },
    closeDialog() {
      this.error = null;
    },
    switchAuthMode() {
      this.authMode = this.authMode === 'Login' ? 'Signup' : 'Login';
    },
  },
  computed: {
    submitButtonText() {
      const btnText = this.authMode === 'Login' ? 'Login' : 'SignUp';
      return btnText;
    },
    switchAuthModeBtnText() {
      const switchBtnText =
        this.authMode === 'Login' ? 'SignUp instead' : 'Login Instead';
      return switchBtnText;
    },
  },
};
</script>

<style scoped>
p {
  color: red;
}
</style>

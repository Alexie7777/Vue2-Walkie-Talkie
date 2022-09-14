<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      background-color: gray;
    "
  >
    <aside
      style="
        background-color: white;
        border-radius: 20px;
        padding: 5rem;
        width: 30rem;
        height: 35rem;
      "
    >
      <h2 style="position: relative; right: -0.6rem; top: -1.5rem">
        {{ newUser ? "Sign Up" : "Log in" }}
      </h2>

      <!-- TODO: Form validation -->

      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
          justify-content: flex-start;
        "
      >
        <vs-input
          block
          label-placeholder="E-mail"
          v-model="email"
          type="email"
        />
        <vs-input
          block
          label-placeholder="password"
          v-model="password"
          type="password"
        />
        <vs-button
          @click="signInOrCreateUser"
          :loading="stLoading"
          icon
          success
          flat
        >
          <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
          <p style="padding-left: 5px">
            {{ newUser ? "Sign Up" : "Login" }}
          </p>
        </vs-button>

        <div style="display: flex; flex-direction: column; gap: 0.5rem">
          <div v-if="!newUser">
            <p style="display: flex; justify-content: center">
              Don't have an account? &nbsp;
              <a href="#" @click="newUser = true"> Sign Up</a>
            </p>
          </div>

          <div v-else>
            <p style="display: flex; justify-content: center">
              Wanna &nbsp
              <a href="#" @click="newUser = false"> login in</a>&nbsp with
              E-mail?
            </p>
          </div>

          <p style="margin: auto">OR</p>

          <vs-tooltip
            ><vs-button
              style="display: flex; justify-content: flex-start"
              :loading="tmLoading"
              icon
              block
              dark
              flat
              @click="handleSignin()"
            >
              <font-awesome-icon icon="fa-solid fa-mask" />
              <p style="margin-left: 5px">Sign In Anonymously</p>
            </vs-button>
            <template #tooltip> You may lose all your account data </template>
          </vs-tooltip>
          <vs-button
            style="display: flex; justify-content: flex-start"
            :loading="ggLoading"
            icon
            block
            dark
            flat
            @click="handleSigninWithGoogle()"
          >
            <font-awesome-icon icon="fa-brands fa-google" />
            <p style="margin-left: 5px">Sign In with Google</p>
          </vs-button>
          <vs-button
            :loading="ghLoading"
            icon
            block
            dark
            flat
            @click="handleSigninWithGithub()"
          >
            <font-awesome-icon icon="fa-brands fa-github" />
            <p style="margin-left: 5px">Sign In with Github</p>
          </vs-button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebase";
import { Color } from "@/types/color";
import { ggProvider } from "@/firebase";
import { ghProvider } from "@/firebase";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  tmLoading = false;
  stLoading = false;
  newUser = false;
  errorMess = "";
  ggLoading = false;
  auth = auth;
  ghLoading = false;

  // sign in Anonymously
  async handleSignin() {
    this.tmLoading = true;
    try {
      await auth.signInAnonymously();
    } catch (err) {
      this.errorMess = err.message;
      this.openNotification("top-left", "danger");
    }
    this.tmLoading = false;
  }

  async handleSigninWithGoogle() {
    this.ggLoading = true;
    try {
      await auth.signInWithPopup(ggProvider);
    } catch (err) {
      this.errorMess = err.message;
      this.openNotification("top-left", "danger");
    }
    this.ggLoading = false;
  }

  async handleSigninWithGithub() {
    this.ghLoading = true;
    try {
      await auth.signInWithPopup(ghProvider);
    } catch (err) {
      this.errorMess = err.message;
      this.openNotification("top-left", "danger");
    }
    this.ghLoading = false;
  }

  openNotification(position = null, color: Color) {
    const noti = this.$vs.notification({
      progress: "auto",
      color,
      position,
      title: "Login Error",
      text: this.errorMess,
    });
  }

  async signInOrCreateUser() {
    this.stLoading = true;
    try {
      if (this.newUser) {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
      } else {
        await auth.signInWithEmailAndPassword(this.email, this.password);
      }
    } catch (err) {
      this.errorMess = err.message;
      this.openNotification("top-left", "danger");
    }
    this.stLoading = false;
  }
}
</script>

<style lang="less">
/* .vs-input, */
/* .vs-button { */
/*   width: 300px; */
/* } */
</style>

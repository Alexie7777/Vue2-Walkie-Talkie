<template>
  <aside
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
    "
  >
    <h3>Sign in Anonymously</h3>
    <vs-button
      style="padding: 2px"
      :loading="loading"
      icon
      success
      flat
      @click="handleSignin"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
      <p style="padding-left: 5px">Sign in</p>
    </vs-button>

    <div v-if="newUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>

    <div v-else>
      <h3>Sign in with Email</h3>
      <a href="#" @click="newUser = true">Sign Up for a New Account</a>
    </div>
    <!-- TODO: Form validation -->
    <!-- TODO: Layout adjustment -->

    <vs-input label-placeholder="E-mail" v-model="email" type="email" />
    <vs-input label-placeholder="password" v-model="password" type="password" />
    <vs-button
      @click="signInOrCreateUser"
      style="padding: 2px"
      :loading="loading"
      icon
      success
      flat
    >
      <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
      <p style="padding-left: 5px">{{ newUser ? "Sign Up" : "Login" }}</p>
    </vs-button>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebase";
import {
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Color } from "@/types/color";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  loading = false;
  newUser = true;
  errorMess = "";

  handleSignin() {
    this.loading = true;
    signInAnonymously(auth);
    this.loading = false;
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
    this.loading = true;
    try {
      if (this.newUser) {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
      } else {
        await signInWithEmailAndPassword(auth, this.email, this.password);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        this.errorMess = err.message;
        this.openNotification("top-left", "danger");
      }
    }
    this.loading = false;
  }
}
</script>

<style scoped></style>

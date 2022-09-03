<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <vs-button gradient @click="handleSignin"> Sign in </vs-button>

    <vs-input label-placeholder="E-mail" v-model="email" type="email" />
    <vs-input label-placeholder="password" v-model="password" type="password" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebase";
import { signInAnonymously } from "firebase/auth";

@Component
export default class Login extends Vue {
  email = "";
  password = "";

  handleSignin() {
    console.log("Login");
    signInAnonymously(auth);
  }
}
</script>

<style scoped></style>

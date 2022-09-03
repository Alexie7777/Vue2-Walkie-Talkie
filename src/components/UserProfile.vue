<template>
  <div>
    <div>Logged-in as {{ user.uid }}</div>
    <button @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

@Component
export default class UserProfile extends Vue {
  @Prop(Object) readonly user;

  auth = auth;

  handleSignOut() {
    signOut(this.auth);
  }
}
</script>

<style scoped></style>

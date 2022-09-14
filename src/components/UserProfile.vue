<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: auto;
    "
  >
    <div style="margin-left: 2rem">Logged-in as {{ user.uid }}</div>
    <vs-button style="margin-right: 2rem" @click="auth.signOut()"
      >Sign Out</vs-button
    >
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebase";

@Component
export default class UserProfile extends Vue {
  @Prop(Object) readonly user;

  auth = auth;
}
</script>

<style scoped></style>

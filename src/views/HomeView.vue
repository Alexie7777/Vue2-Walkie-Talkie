<template>
  <User #user="{ user }">
    <div v-if="user">
      <UserProfile :user="user" />
    </div>
    <Login v-else />
  </User>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Login, User, UserProfile } from "@/components/";

@Component({
  components: {
    Login,
    User,
    UserProfile,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped></style>

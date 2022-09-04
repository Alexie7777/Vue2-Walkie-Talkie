<template>
  <User #user="{ user }">
    <div v-if="user">
      <UserProfile :user="user" />
      <ChatList :uid="user.uid" />
    </div>
    <Login v-else />
  </User>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Login, User, UserProfile, ChatList } from "@/components/";

@Component({
  components: {
    Login,
    User,
    UserProfile,
    ChatList,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped></style>

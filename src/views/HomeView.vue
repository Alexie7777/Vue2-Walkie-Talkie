<template>
  <User #user="{ user }">
    <div
      style="
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: gray;
      "
      v-if="user"
    >
      <div
        style="
          display: flex;
          width: 30rem;
          height: 30rem;
          background-color: white;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
        "
      >
        <UserProfile :user="user" />
        <ChatList :uid="user.uid" />
      </div>
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

<style lang="less"></style>

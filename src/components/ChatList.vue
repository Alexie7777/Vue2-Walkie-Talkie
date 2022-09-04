<template>
  <div>
    <button @click="createChatRoom">Create New Chat Room</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

@Component
export default class ChatList extends Vue {
  @Prop(String) readonly uid: string;

  async createChatRoom() {
    const newChat = await addDoc(collection(db, "chats"), {
      createAt: Date.now(),
      owner: this.uid,
      members: [this.uid],
    });

    console.log(newChat);
  }
}
</script>

<style scoped></style>

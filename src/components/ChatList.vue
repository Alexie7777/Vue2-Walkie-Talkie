<template>
  <div style="margin-bottom: auto">
    <p v-if="chats.length == 0">No Chat Room Found.</p>
    <ul>
      <li v-for="chat of sliceChats" :key="chat.id">
        <router-link :to="{ name: 'ChatsView', params: { id: chat.id } }">{{
          chat.id
        }}</router-link>
      </li>
    </ul>

    <div style="display: flex; flex-direction: column; gap: 5px">
      <vs-button style="margin-top: 1rem" @click="createChatRoom()">
        Create New Chat Room
      </vs-button>

      <vs-button style="margin: auto" @click=""> Join a Chat Room </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from "../firebase";

export default {
  data() {
    return {
      chats: [],
    };
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid),
    };
  },
  computed: {
    sliceChats: function () {
      return this.chats.slice(-10);
    },
  },
  methods: {
    async createChatRoom() {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });
      this.openNotification("top-center", "success");

      console.log(newChat);
    },
    openNotification(position = null, color) {
      const noti = this.$vs.notification({
        position,
        color,
        title: "🎉 Successfully create chat room ",
        text: "",
      });
    },
  },
  props: ["uid"],
};
</script>

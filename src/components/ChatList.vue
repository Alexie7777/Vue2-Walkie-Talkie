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

      <vs-button style="margin: auto" @click="active = !active">
        Join a Chat Room
      </vs-button>
      <vs-dialog v-model="active">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
          "
        >
          <vs-input
            v-model="roomID"
            placeholder="Please enter the chat room ID "
          ></vs-input>
          <vs-button @click="joinChatRoom">Submit!</vs-button>
        </div>
      </vs-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from "../firebase";

export default {
  data() {
    return {
      roomID: "",
      chats: [],
      active: false,
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

    joinChatRoom() {
      this.$router.push({ name: "ChatsView", params: { id: this.roomID } });
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

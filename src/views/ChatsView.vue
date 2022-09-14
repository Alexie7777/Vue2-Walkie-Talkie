<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: gray;
    "
  >
    <main
      style="
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 30rem;
        background-color: white;
        border-radius: 20px;
        padding: 5rem;
        justify-content: space-between;
        align-items: center;
      "
      class="section"
    >
      <h3 style="margin-top: -2rem">Welcome to ChatRoom {{ chatId }}</h3>

      <User style="margin-bottom: -3rem" #user="{ user }">
        <div v-if="user">
          <ul style="max-height: 256px; overflow: auto">
            <li
              style="display: flex"
              v-for="message of messages"
              :key="message.id"
            >
              <ChatMessage
                :message="message"
                :owner="user.uid === message.sender"
              />
            </li>
          </ul>

          <div style="display: flex; position: relative">
            <vs-input block v-model="newMessageText" class="input" />

            <vs-button
              flat
              style="width: 130px"
              success
              :disabled="!newMessageText || loading"
              @click="addMessage(user.uid)"
              animation-type="vertical"
            >
              Send
              <template #animate>
                <font-awesome-icon icon="fa-solid fa-paper-plane" />
                Message
              </template>
            </vs-button>
            <vs-tooltip
              border
              v-if="!recorder"
              style="width: 60px; position: absolute; right: 80px; top: 2px"
              ><vs-button
                flat
                success
                transparent
                @click="record()"
                animation-type="vertical"
              >
                <font-awesome-icon icon="fa-solid fa-microphone" />
              </vs-button>
              <template #tooltip>Send a audio message</template>
            </vs-tooltip>
            <vs-tooltip
              border
              v-else
              style="width: 60px; position: absolute; right: 80px; top: 2px"
              ><vs-button
                flat
                @click="stop()"
                success
                animation-type="vertical"
              >
                <font-awesome-icon icon="fa-solid fa-circle-stop" />
              </vs-button>
              <template #tooltip>Stop recording</template>
            </vs-tooltip>
          </div>

          <audio v-if="newAudio" controls :src="newAudioURL"></audio>
        </div>

        <!-- <Login v-else /> -->
      </User>
    </main>
  </div>
</template>

<script lang="ts">
import { User, ChatMessage } from "@/components";
import { db, storage } from "../firebase";

export default {
  components: {
    User,
    ChatMessage,
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(10),
    };
  },
  methods: {
    async addMessage(uid) {
      this.loading = true;

      let audioURL = null;

      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);

        await storageRef.put(this.newAudio);

        audioURL = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
        audioURL,
      });
      this.loading = false;
      this.newMessageText = "";
      this.newAudio = null;
    },

    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });

      this.recorder.start();
    },

    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

audio::-webkit-media-controls-mute-button {
  display: none !important;
}

audio::-webkit-media-controls-volume-slider {
  display: none !important;
}
</style>

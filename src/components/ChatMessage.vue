<template>
  <div class="message" :class="{ 'from-user': owner }">
    {{ message.text }}

    <audio
      style="max-width: 250px"
      v-if="message.audioURL"
      :src="message.audioURL"
      controls
    ></audio>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { message } from "@/types/message";

@Component
export default class ChatMessage extends Vue {
  @Prop(Object) readonly message: message;
  @Prop(Boolean) readonly owner: boolean;
}
</script>

<style scoped>
.message {
  background: #dddddd;
  color: black;
  /* margin-left: 10px; */
  margin-top: 5px;
  margin-bottom: 5px;
  /* margin-left: 260px; */
  margin-left: auto;
  max-width: 260px;
  white-space: normal;
  border-radius: 5px;
  padding: 0.4rem;
  display: inline-block;
  overflow-wrap: anywhere;
}

.from-user {
  margin-right: 10px;
  max-width: 260px;
  /* overflow: hidden; */
  margin-left: 2px;
  background: #91bbff;
}

.sender {
  font-size: 0.5rem;
}
</style>

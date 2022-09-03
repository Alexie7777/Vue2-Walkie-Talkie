<template>
  <div>
    <slot name="user" :user="user"></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { auth } from "@/firebase";
import { onMounted } from "vue";

export default {
  setup() {
    const user = ref(null);
    const unsubsribe = auth.onAuthStateChanged(
      (firebaseUser) => (user.value = firebaseUser)
    );

    onMounted(() => {
      console.log(user);
    });

    return {
      user,
      unsubsribe,
    };
  },
};
</script>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

onMounted(() => {});
</script>

<template>
  <div>
    <div class="bar d-flex justify-center align-center">
      <div class="d-flex">
        <h1 style="color: aliceblue">MosciiTest</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  background-color: #18201b;
  height: 100px;
  width: 100%;
  padding-left: 3%;
  padding-right: 3%;
}
.mdi {
  color: #ffffff;
}

</style>

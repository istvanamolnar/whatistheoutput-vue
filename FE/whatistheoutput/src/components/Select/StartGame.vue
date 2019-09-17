<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <input class="lofasz" type="text" placeholder="Enter your name" v-model="nickname" />
    <input class="lofasz" type="submit" value="Let's play!" @click="startGame()" />
  </div>
</template>

<script>
export default {
  name: 'ManageQuestions',
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    startGame() {
      this.$router.push('letsplay');
    }
  }
}
</script>
<style>
  .lofasz {
    background-color: #000;
    border-style: none;
    color: #fffb00;
    width: 30vh;
    margin: 10px;
    text-align: center;
    font-weight: 800;
  }

  ::-webkit-input-placeholder {
    text-align: center;
  }
</style>
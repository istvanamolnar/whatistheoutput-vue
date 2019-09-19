<template>
  <div class="d-flex flex-column align-items-center justify-content-center bg-dark h-100" ref="main">
    <div class="d-flex flex-column align-items-center">
      <input class="text" type="text" placeholder="Enter your name" v-model="nickname" />
      <input class="text" type="submit" value="Let's play!" @click.once="startGame()" />
    </div>
    <div class="h5 mt-4 text-white">Choose theme:</div>
    <div class="bg-transparent" @click="changeTheme">
      <div class="mx-auto d-flex justify-content-around">
        <img :src="serverURL + '/images/l-leaves.png'" alt="l-leaves" ref="l-leaves" class="img-thumbnail theme">
        <img :src="serverURL + '/images/d-shattered.png'" alt="d-shattered" ref="d-shattered" class="img-thumbnail theme">
      </div>
      <div class="mx-auto my-3 d-flex justify-content-center">
        <img :src="serverURL + '/images/d-evolution.png'" alt="d-evolution" ref="d-evolution" class="img-thumbnail theme">
        <img :src="serverURL + '/images/l-hypnotize.png'" alt="l-hypnotize" ref="l-hypnotize" class="img-thumbnail theme">
      </div>
      <div class="mx-auto d-flex justify-content-center">
        <img :src="serverURL + '/images/l-memphis.png'" alt="l-memphis" ref="l-memphis" class="img-thumbnail theme">
        <img :src="serverURL + '/images/d-bicycles.png'" alt="d-bicycles" ref="d-bicycles" class="img-thumbnail theme">
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';
import axios from 'axios';

export default {
  name: 'ManageQuestions',
  data() {
    return {
      nickname: 'I',
      background: 'd-shattered',
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL
    }
  },

  mounted() {
    this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.background}.png')`;
  },

  methods: {
    startGame() {
      eventBus.user = {
        name: this.nickname,
        theme: this.background,
        currentGame: {
          questions: [],
          score: 0,
          answers: []
        }
      };
      axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`, { crossdomain: true })
      .then(res => {
        eventBus.user.currentGame.questions = res.data.slice(1);
      })
      .then(() => this.$router.push('letsplay'))
      // eslint-disable-next-line
      .catch(err => console.log(err));
    },

    changeTheme(event) {
      this.background = event.target.alt;
      this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.background}.png')`;
    }
  }
}
</script>
<style>
  .text {
    background-color: #000;
    border: 2px solid #666;
    color: #fff;
    width: 50vw;
    margin: 10px;
    text-align: center;
    font-weight: 800;
    height: 50px;
    font-size: 20px;
  }

  ::-webkit-input-placeholder {
    text-align: center;
  }

  .theme {
    background-color: transparent;
    border: 2px solid #666;
    height: 10vh;
    width: 10vh;
    cursor: pointer;
    margin: 1vh;
  }
</style>
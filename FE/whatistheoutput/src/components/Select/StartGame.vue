<template>
  <div class="d-flex flex-column align-items-center justify-content-center bg-dark h-100" ref="main">
    <div class="d-flex flex-column align-items-center">
      <input class="text" type="text" placeholder="Enter your name" v-model="nickname" ref="nameInput"/>
      <input class="text" type="submit" value="Let's play!" @click.once="startGame()" ref="startButton"/>
    </div>
    <div class="h3 p-3 mt-4 chose-theme" ref="chooseTheme">Choose theme:</div>
    <div class="bg-transparent thumbnails">
      <div class="mx-auto my-1 d-flex justify-content-around">
        <img :src="serverURL + '/images/l-leaves.png'" @click="changeTheme" alt="l-leaves" ref="l-leaves" class="img-thumbnail theme">
        <img :src="serverURL + '/images/d-shattered.png'" @click="changeTheme" alt="d-shattered" ref="d-shattered" class="img-thumbnail theme">
      </div>
      <div class="mx-auto my-1 d-flex justify-content-center">
        <img :src="serverURL + '/images/d-evolution.png'" @click="changeTheme" alt="d-evolution" ref="d-evolution" class="img-thumbnail theme">
        <img :src="serverURL + '/images/l-alchemy.png'" @click="changeTheme" alt="l-alchemy" ref="l-alchemy" class="img-thumbnail theme">
      </div>
      <div class="mx-auto my-1 d-flex justify-content-center">
        <img :src="serverURL + '/images/l-memphis.png'" @click="changeTheme" alt="l-memphis" ref="l-memphis" class="img-thumbnail theme">
        <img :src="serverURL + '/images/d-bicycles.png'" @click="changeTheme" alt="d-bicycles" ref="d-bicycles" class="img-thumbnail theme">
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
      nickname: '',
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
        eventBus.user.currentGame.questions = res.data.slice(5);
      })
      .then(() => this.$router.push('letsplay'))
      // eslint-disable-next-line
      .catch(err => console.log(err));
    },

    changeTheme(event) {
      this.background = event.target.alt;
      if (this.background[0] === 'd') {
      this.$refs.nameInput.style.backgroundColor = 'black';
      this.$refs.nameInput.style.color = 'white';
      this.$refs.startButton.style.backgroundColor = 'white';
      this.$refs.startButton.style.color = 'black';
      this.$refs.chooseTheme.style.color = 'white';
      this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    } else if (this.background[0] === 'l') {
      this.$refs.nameInput.style.backgroundColor = 'white';
      this.$refs.nameInput.style.color = 'black';
      this.$refs.startButton.style.backgroundColor = 'black';
      this.$refs.startButton.style.color = 'white';
      this.$refs.chooseTheme.style.color = 'black';
      this.$refs.chooseTheme.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    } else {
      // eslint-disable-next-line
      console.log("Something went wrong");
    }
      this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.background}.png')`;
    }
  }
}
</script>
<style>
  .text {
    background-color: transparent;
    color: #666;
    border: 2px solid #666;
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

  .chose-theme {
    font-family: 'ZCOOL KuaiLe', cursive;
    border-radius: 15px;
  }

  @media all and (max-height: 420px) {
    .thumbnails {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
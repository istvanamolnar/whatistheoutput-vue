<template>
  <div class="d-flex pt-4 flex-column align-items-center bg-dark h-100" ref="main">
    <div class="h3 pt-3 chose-theme" ref="chooseTheme">Choose theme:</div>
    <div class="bg-transparent thumbnails">
      <div class="mx-auto my-1 d-flex justify-content-around">
        <img :src="serverURL + '/images/l-leaves.png'" @click="changeTheme" alt="l-leaves" ref="l-leaves" class="img-thumbnail theme">
        <img :src="serverURL + '/images/d-shattered.png'" @click="changeTheme" alt="d-shattered" ref="d-shattered" class="img-thumbnail theme">
      </div>
      <div class="mx-auto my-1 d-flex justify-content-center middle-row">
        <img :src="serverURL + '/images/d-evolution.png'" @click="changeTheme" alt="d-evolution" ref="d-evolution" class="img-thumbnail theme">
        <img :src="serverURL + '/images/l-alchemy.png'" @click="changeTheme" alt="l-alchemy" ref="l-alchemy" class="img-thumbnail theme">
      </div>
      <div class="mx-auto my-1 d-flex justify-content-center">
        <img :src="serverURL + '/images/l-memphis.png'" @click="changeTheme" alt="l-memphis" ref="l-memphis" class="img-thumbnail theme">
        <img :src="serverURL + '/images/d-bicycles.png'" @click="changeTheme" alt="d-bicycles" ref="d-bicycles" class="img-thumbnail theme">
      </div>
    </div>
    <div class="questionRange">
      <p class="numOfQuestions" ref="questionCounter">number of questions: <output id="rangevalue">8</output></p>
      <div id="slider" @click="logTarget">
        <input class="bar" type="range" id="rangeinput" ref="value" value="8" min="5" max="10" onchange="rangevalue.value=value" />
        <span class="highlight"></span><br>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <input class="text" type="text" placeholder="Enter your name" v-model="nickname" ref="nameInput"/>
      <input class="text btn btn-success" type="submit" value="Let's play!" @click.once="startGame()" ref="startButton"/>
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
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      numOfQuestions: 8
    }
  },

  mounted() {
    this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    this.$refs.chooseTheme.style.color = 'white';
    this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.background}.png')`;
    this.$refs.questionCounter.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    this.$refs.questionCounter.style.color = 'rgba(0, 0, 0, 0.9)';
    this.$refs.startButton.style.backgroundColor = '#009b48';
    this.$refs.startButton.style.color = 'white';
  },

  methods: {
    startGame() {
      eventBus.user = {
        name: this.nickname,
        theme: this.background,
        currentGame: {
          numOfQuestions: this.numOfQuestions,
          questions: [],
          score: 0,
          answers: []
        }
      };
      axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/questions?num=${this.numOfQuestions}`, { crossdomain: true })
      .then(res => {
        eventBus.user.currentGame.questions = res.data.slice(1);
      })
      .then(() => this.$router.push('letsplay'))
      // eslint-disable-next-line
      .catch(err => console.log(err));
    },

    changeTheme(event) {
      this.background = event.target.alt;
      if (this.background[0] === 'd') {
      this.$refs.nameInput.style.backgroundColor = 'black';
      this.$refs.nameInput.style.color = '#009b48';
      this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      this.$refs.chooseTheme.style.color = 'white';
      this.$refs.questionCounter.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      this.$refs.questionCounter.style.color = 'rgba(255, 255, 255, 0.9)';
    } else if (this.background[0] === 'l') {
      this.$refs.nameInput.style.backgroundColor = 'white';
      this.$refs.nameInput.style.color = '#009b48';
      this.$refs.chooseTheme.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
      this.$refs.chooseTheme.style.color = 'black';
      this.$refs.questionCounter.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      this.$refs.questionCounter.style.color = 'rgba(0, 0, 0, 0.9)';
    } else {
      // eslint-disable-next-line
      console.log("Something went wrong");
    }
      this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.background}.png')`;
    },
    logTarget() {
      this.numOfQuestions = this.$refs.value.value;
    }
  }
}
</script>
<style>
  .text {
    border: 2px solid #888;
    width: 50vw;
    margin: 10px;
    text-align: center;
    font-weight: 800;
    height: 50px;
    font-size: 18px;
    color:#009b48;
  }

  .text::placeholder {
    color: #009b48;
  }

  ::-webkit-input-placeholder {
    text-align: center;
  }

  .theme {
    border: 3px solid #009b48;
    height: 10vh;
    width: 10vh;
    cursor: pointer;
    margin: 1vh;
    padding: 0;
  }

  .chose-theme {
    font-family: 'ZCOOL KuaiLe', cursive;
    border-radius: 15px;
    font-weight: 700;
  }

  .questionRange {
    height: 100px;
    width: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 2px solid ,000;
    border-radius: 10px;
    padding: 10px;
    font-weight: 600;
  }

  #slider {
    width: 220px;
    height: 30px;
    display: flex;
    align-items: center;
    background: transparent;
    border: 3px solid #888;
    border-radius: 12px;
    justify-content: center;
  }
  #slider .bar {
    width: 100%;
    height: 2px;
    background: #009b48;
  }
  #slider .highlight {
    height: 2px;
    position: absolute;
    width: 140px;
    border-radius: 40px;
    background: #009b48;
  }
  input[type="range"] {
    -webkit-appearance: none;
    background-color: #000;
    height: 2px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    top: 0px;
    z-index: 1;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 30px;
    border: 2px solid #000;
    background-color: #009b48;
  }

  #rangevalue {
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    width: 30px;
    height: 30px;
    text-align: center;
    color: #009b48;
  }
  input[type="range"]:focus {
    outline: none;
  }

  .numOfQuestions {
    padding: 0 10px;
    border-radius: 4px;
    border: 2px solid #000;
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    height: 40px;
    display: flex;
    width: 300px;
    color: #000;
    margin: auto;
    justify-content: space-around;
  }

  @media all and (max-height: 420px) {
    .thumbnails {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 60vw;
      height: 20vh;
      margin-bottom: 3vh;
    }

    .middle-row {
      flex-direction: row-reverse;
    }

  .theme {
    height: 9vw;
    width: 9vw;
  }

    .chose-theme {
      margin-top: 0;
      padding: 0;
    }

    .text {
      width: 50vw;
      height: 10vh;
      margin: 3px 0;
      font-size: 2.5vw;
    }
  }
</style>
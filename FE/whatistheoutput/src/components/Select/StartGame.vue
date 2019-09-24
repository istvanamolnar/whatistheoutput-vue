<template>
  <div class="d-flex flex-column align-items-center bg-dark h-100" ref="main">
    <div class="h3 p-2 chose-theme" ref="chooseTheme">Choose theme:</div>
    <div class="container bg-transparent thumbnails">
      <div class="row w-50vw">
        <img :src="serverURL + '/images/' + background + '.png'" class="img-thumbnail theme"
          v-for="background in themes" :key="background"
          @click="changeTheme" :alt="background">
      </div>
    </div>
    <div class="questionRange">
      <p class="numOfQuestions" ref="questionCounter">number of questions: 
        <output id="rangevalue">8</output></p>
      <div id="slider" @click="getNumOfQuestions">
        <input class="bar" type="range" id="rangeinput" 
          value="8" min="5" max="10" onchange="rangevalue.value=value" ref="value"/>
        <span class="highlight"></span><br>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <input class="text" type="text" 
        placeholder="Enter your name" 
        v-model="nickname" 
        ref="nameInput" required/>
      <input class="text btn btn-success" type="submit" 
        value="Let's play!" 
        @click.once="startGame()" 
        ref="startButton"/>
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
      numOfQuestions: 8,
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      theme: 'd-bicycles',
      themes: ['d-bicycles', 'd-evolution', 'd-shattered', 'd-squares', 'd-pool', 'l-wood', 'l-alchemy', 'l-restaurant', 'l-memphis', 'l-symphony']
    }
  },

  mounted() {
    this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/d-bicycles.png')`;
    this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    this.$refs.chooseTheme.style.color = 'rgba(255, 255, 255, 0.9)';
    this.$refs.nameInput.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    this.$refs.nameInput.style.color = '#009b48';
    this.$refs.questionCounter.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    this.$refs.questionCounter.style.color = 'rgba(255, 255, 255, 0.9)';
    this.$refs.startButton.style.backgroundColor = '#009b48';
    this.$refs.startButton.style.color = 'rgba(255, 255, 255, 0.9)';
  },

  methods: {
    startGame() {
      eventBus.user = {
        name: this.nickname,
        theme: this.theme,
        currentGame: {
          answers: [],
          numOfQuestions: this.numOfQuestions,
          questions: [],
          score: 0
        }
      };
      axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/questions?num=${this.numOfQuestions}`, { crossdomain: true })
      .then(res => {
        eventBus.user.currentGame.questions = res.data;
        eventBus.user.currentGame.questions.forEach(question => {
          question.question = question.question.join('\n');
          question.description = question.description.join('\n');
        });
      })
      .then(() => this.$router.push('letsplay'))
      // eslint-disable-next-line
      .catch(err => console.log(err));
    },

    changeTheme(event) {
      this.theme = event.target.alt;
      if (this.theme[0] === 'd') {
        this.$refs.nameInput.style.backgroundColor = 'black';
        this.$refs.nameInput.style.color = '#009b48';
        this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        this.$refs.chooseTheme.style.color = 'white';
        this.$refs.questionCounter.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        this.$refs.questionCounter.style.color = 'rgba(255, 255, 255, 0.9)';
      } else if (this.theme[0] === 'l') {
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
      this.$refs.main.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.theme}.png')`;
    },
    getNumOfQuestions() {
      this.numOfQuestions = this.$refs.value.value;
    }
  }
}
</script>
<style>
  .text {
    border: 2px solid #888;
    color:#009b48;
    font-size: 18px;
    font-weight: 800;
    height: 50px;
    margin: 10px;
    text-align: center;
    width: 50vw;
  }

  .text::placeholder {
    color: #009b48;
  }

  ::-webkit-input-placeholder {
    text-align: center;
  }

  .theme {
    border: 3px solid #009b48;
    cursor: pointer;
    height: 10vh;
    margin: 1vh;
    padding: 0;
    width: 10vh;
  }

  .chose-theme {
    border-radius: 15px;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-weight: 700;
    margin-top: 30px;
  }

  .questionRange {
    align-items: center;
    border: 2px solid ,000;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    height: 100px;
    justify-content: space-between;
    padding: 10px;
    width: 330px;
  }

  #slider {
    align-items: center;
    background: transparent;
    border-radius: 12px;
    border: 3px solid #888;
    display: flex;
    justify-content: center;
    height: 30px;
    width: 220px;
  }
  #slider .bar {
    background: #009b48;
    height: 2px;
    width: 100%;
  }
  #slider .highlight {
    background: #009b48;
    border-radius: 40px;
    height: 2px;
    position: absolute;
    width: 140px;
  }
  input[type="range"] {
    -webkit-appearance: none;
    background-color: #000;
    height: 2px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #009b48;
    border: 2px solid #000;
    border-radius: 30px;
    cursor: pointer;
    height: 40px;
    position: relative;
    top: 0px;
    width: 40px;
    z-index: 1;
  }

  #rangevalue {
    color: #009b48;
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    height: 30px;
    text-align: center;
    width: 30px;
  }
  input[type="range"]:focus {
    outline: none;
  }

  .numOfQuestions {
    border-radius: 4px;
    border: 2px solid #000;
    color: #000;
    display: flex;
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    height: 40px;
    justify-content: space-around;
    margin: auto;
    padding: 0 10px;
    width: 300px;
  }

  @media all and (max-height: 420px) {
    .thumbnails {
      display: flex;
      flex-direction: row;
      height: 20vh;
      justify-content: center;
      margin-bottom: 3vh;
      width: 60vw;
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
      padding-top: 0;
    }

    .text {
      font-size: 2.5vw;
      height: 10vh;
      margin: 3px 0;
      width: 50vw;
    }
  }
</style>
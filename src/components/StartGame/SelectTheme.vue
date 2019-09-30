<template>
  <div class="d-flex align-items-center bg-dark h-100 m-0 main" ref="main">
    <div class="top">
      <div class="h3 p-2 m-0 chose-theme" ref="chooseTheme">Choose theme:</div>
      <div class="container-fluid bg-transparent p-0 m-0 d-flex justify-content-center">
        <div class="row m-0 justify-content-center">
          <img :src="imagesURL + '/images/' + background + '.png'" class="theme"
            v-for="background in themes" :key="background"
            @click="changeTheme" :alt="background">
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="question-range">
        <p class="num-of-questions" ref="questionCounter">number of questions: 
          <output id="rangevalue">{{numOfQuestions}}</output>
        </p>
        <div id="slider">
          <input class="bar" type="range" id="rangeinput" 
            value="8" min="4" max="12" @mousemove="numOfQuestions = $refs.value.value" v-on="handlers" onchange="rangevalue.value=value" ref="value"/>
          <span class="highlight"></span><br>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center button-container">
        <input class="text" type="text"
          v-model="nickname"
          onfocus="this.value = ''"
          onblur="this.value = 'Enter your name'"
          ref="nameInput" required/>
        <div class="letsplay btn btn-success"
          @click="startGame()" 
          ref="startButton">Let's play!</div>
      </div>
    </div>
    <welcome-page/>
    <img :src="imagesURL + '/images/settings.png'" class="manage-questions" @click="$router.push('manage')"/>
  </div>
</template>

<script>
import WelcomePage from './WelcomePage';
import { eventBus } from '../../main';
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'SelectTheme',
  components: {
    'welcome-page': WelcomePage
  },

  data() {
    const vm = this;
    return {
      nickname: 'Enter your name',
      numOfQuestions: 8,
      imagesURL: process.env.VUE_APP_IMAGES_URL,
      theme: 'd-bicycles',
      themes: ['d-bicycles', 'd-shattered', 'l-alchemy', 'l-restaurant'],
      disabledPlayButton: false,
      handlers: {
        touchmove: vm.divTouchmove
      }
    }
  },

  mounted() {
    // currently, this is the only way I can generate an auto-popup-modal
    setTimeout(() => {
      $(document).ready(function () {
        $('#welcomepage').modal('show')
      });
    }, 500);
    this.$refs.main.style.backgroundImage = `url('${this.imagesURL}/images/d-bicycles.png')`;
    this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    this.$refs.chooseTheme.style.color = 'rgba(255, 255, 255, 0.9)';
    this.$refs.nameInput.style.backgroundColor = 'rgba(0, 0, 0)';
    this.$refs.nameInput.style.color = '#009b48';
    this.$refs.questionCounter.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    this.$refs.questionCounter.style.color = 'rgba(255, 255, 255, 0.9)';
    this.$refs.startButton.style.backgroundColor = '#009b48';
    this.$refs.startButton.style.color = 'rgba(255, 255, 255, 0.9)';
  },

  methods: {
    startGame() {
      this.numOfQuestions = this.$refs.value.value
      if (this.$refs.nameInput.value && !this.disabledPlayButton) {
        this.disabledPlayButton = true; // otherwise play button can be clicked multiple times, which causes duplicated first question
        eventBus.user = {
          game: 'whatistheoutput',
          name: this.nickname,
          theme: this.theme,
          currentGame: {
            answers: [],
            numOfQuestions: this.numOfQuestions,
            questions: [],
            score: 0
          }
        };
        axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/whatistheoutput?numOfQuestions=${this.numOfQuestions}`, { crossdomain: true })
        .then(res => {
          eventBus.user.currentGame.questions = res.data;
        })
        .then(() => this.$router.push('letsplay'))
        // eslint-disable-next-line
        .catch(err => console.log(err));
      } else {
        const isBlack = this.$refs.nameInput.style.backgroundColor === 'rgb(0, 0, 0)';
        this.$refs.nameInput.style.backgroundColor = isBlack ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
      }
    },

    changeTheme(event) {
      this.theme = event.target.alt;
      if (this.theme[0] === 'd') {
        this.$refs.nameInput.style.backgroundColor = 'rgb(0, 0, 0)';
        this.$refs.nameInput.style.color = '#009b48';
        this.$refs.chooseTheme.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        this.$refs.chooseTheme.style.color = '#fff';
        this.$refs.questionCounter.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        this.$refs.questionCounter.style.color = 'rgba(255, 255, 255, 0.9)';
      } else if (this.theme[0] === 'l') {
        this.$refs.nameInput.style.backgroundColor = 'rgb(255, 255, 255)';
        this.$refs.nameInput.style.color = '#009b48';
        this.$refs.chooseTheme.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        this.$refs.chooseTheme.style.color = '#000';
        this.$refs.questionCounter.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        this.$refs.questionCounter.style.color = 'rgba(0, 0, 0, 0.9)';
      } else {
        // eslint-disable-next-line
        console.log("Something went wrong");
      }
      this.$refs.main.style.backgroundImage = `url('${this.imagesURL}/images/${this.theme}.png')`;
    },

    divTouchmove() {
      this.numOfQuestions = this.$refs.value.value;
    }
  },
}

</script>
<style scoped>
  .text, .letsplay {
    border: 2px solid #888;
    border-radius: 5px;
    color:#3ca744;
    font-size: 18px;
    font-weight: 800;
    height: 45px;
    margin: 7px;
    text-align: center;
    width: 100%;
  }

  .text::placeholder {
    color: #3ca744;
  }

  .letsplay:hover {
    cursor: pointer;
  }

  ::-webkit-input-placeholder {
    text-align: center;
  }

  .theme {
    border: 3px solid #3ca744;
    cursor: pointer;
    height: 89px;
    margin: 1vh;
    padding: 0;
    width: 89px;
  }

  .chose-theme {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-weight: 700;
    margin-top: 30px;
    width: 100vw;
    text-align: center;
  }

  .question-range {
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
    background: #3ca744;
    height: 2px;
    width: 100%;
  }
  #slider .highlight {
    background: #3ca744;
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
    background-color: #3ca744;
    border: 2px solid #000;
    border-radius: 30px;
    cursor: pointer;
    height: 40px;
    position: relative;
    top: 0px;
    width: 40px;
    z-index: 1;
  }
  input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    background-color: #3ca744;
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
    color: #3ca744;
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    height: 30px;
    text-align: center;
    width: 30px;
  }
  input[type="range"]:focus {
    outline: none;
  }

  .num-of-questions {
    align-items: center;
    border-radius: 4px;
    border: 2px solid #000;
    color: #000;
    display: flex;
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    height: 40px;
    justify-content: space-around;
    margin: 0;
    padding: 0 10px;
    width: max-content;
  }

  .row {
    width: 240px;
  }

  .button-container {
    width: 320px;
  }

  .disabled {
    opacity: 1;
  }

  .main {
    flex-direction: column;
  }

  .manage-questions {
    bottom: 10px;
    height: 10px;
    left: 10px;
    position:fixed;
    width: 10px;
  }

  .manage-questions:hover {
    cursor: pointer;
  }

  @media all and (max-height: 420px) {
    .row {
      width: 100vw;
    }
  }
  @media all and (min-width: 950px) {
    .row {
      width: 100vw;
    }
  }
</style>
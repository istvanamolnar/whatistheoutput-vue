<template>
  <div class="main" ref="main">
    <div class="top">
      <div class="chose-theme" ref="chooseTheme">Choose theme:</div>
      <div class="select-container">
        <img :src="imagesURL + '/images/' + background + '.png'" 
          class="theme"
          v-for="background in themes" :key="background"
          @click="changeTheme" 
          :alt="background">
      </div>
    </div>
    <div class="bottom">
      <div class="question-range">
        <p class="num-of-questions" ref="questionCounter">number of questions: 
          <output id="rangevalue" ref="rangeValue">{{numOfQuestions}}</output>
        </p>
        <div id="slider">
          <input class="bar" type="range" id="rangeinput" 
            value="4" min="4" max="12" @mousemove="changeValue" v-on="handlers" onchange="rangevalue.value=value" ref="value"/>
          <span class="highlight"></span><br>
        </div>
      </div>
      <div class="button-container">
        <input class="text" type="text"
          v-model="nickname"
          onfocus="this.value = this.value === 'Enter your name' ? '' : this.value"
          onblur="this.value = this.value === '' ? 'Enter your name' : this.value"
          @keydown.enter="startGame"
          ref="nameInput" required/>
        <div class="letsplay btn btn-success"
          @click="startGame" 
          ref="startButton">Let's play!</div>
      </div>
    </div>
    <welcome-page/>
    <img :src="imagesURL + '/images/settings.png'" class="manage-questions" @click="manageQuestions"/>
    <a href="https://gitlab.com/istvanamolnar/whatistheoutput" target="_blank"><img :src="imagesURL + '/images/gitlab.png'" class="gitlab-icon"/></a> 
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
      numOfQuestions: 4,
      imagesURL: process.env.VUE_APP_IMAGES_URL,
      theme: 'd-bicycles',
      themes: ['d-bicycles', 'd-shattered', 'l-alchemy', 'l-ahoy'],
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
    this.$refs.chooseTheme.style.backgroundColor = 'rgb(0, 0, 0)';
    this.$refs.chooseTheme.style.color = 'rgb(255, 255, 255)';
    this.$refs.nameInput.style.backgroundColor = 'rgb(0, 0, 0';
    this.$refs.nameInput.style.color = '#009b48';
    this.$refs.questionCounter.style.backgroundColor = 'rgb(0, 0, 0)';
    this.$refs.questionCounter.style.color = 'rgb(255, 255, 255)';
    this.$refs.rangeValue.style.color = '#3ca744';
    this.$refs.startButton.style.backgroundColor = '#009b48';
    this.$refs.startButton.style.color = 'rgb(255, 255, 255)';
  },

  methods: {
    changeValue() {
      this.numOfQuestions = this.$refs.value.value;
      if (this.$refs.rangeValue.value > 9) {
        this.$refs.rangeValue.style.color = '#f00';
      } else if (this.$refs.rangeValue.value > 6) {
        this.$refs.rangeValue.style.color = '#ffd500';
      } else {
        this.$refs.rangeValue.style.color = '#3ca744';
      }
    },

    startGame() {
      this.numOfQuestions = this.$refs.value.value
      if (this.$refs.nameInput.value !== '' && this.$refs.nameInput.value !== 'Enter your name' && !this.disabledPlayButton) {
        this.disabledPlayButton = true; // otherwise play button can be clicked multiple times, which causes duplicated first question
        eventBus.user = {
          game: 'whatistheoutput',
          name: this.nickname,
          theme: this.theme,
          themes: ['d-bicycles', 'd-shattered', 'l-alchemy', 'l-ahoy'],
          currentGame: {
            answers: [],
            numOfQuestions: this.numOfQuestions,
            questions: [],
            score: 0
          }
        };
        axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/whatistheoutput?numOfQuestions=${this.numOfQuestions}`)
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
        this.$refs.chooseTheme.style.backgroundColor = 'rgb(0, 0, 0)';
        this.$refs.chooseTheme.style.color = '#fff';
        this.$refs.questionCounter.style.backgroundColor = 'rgb(0, 0, 0)';
        this.$refs.questionCounter.style.color = 'rgb(255, 255, 255)';
      } else if (this.theme[0] === 'l') {
        this.$refs.nameInput.style.backgroundColor = 'rgb(255, 255, 255)';
        this.$refs.nameInput.style.color = '#009b48';
        this.$refs.chooseTheme.style.backgroundColor = 'rgb(255, 255, 255)';
        this.$refs.chooseTheme.style.color = '#000';
        this.$refs.questionCounter.style.backgroundColor = 'rgb(255, 255, 255)';
        this.$refs.questionCounter.style.color = 'rgb(0, 0, 0)';
      } else {
        // eslint-disable-next-line
        console.log("Something went wrong");
      }
      this.$refs.main.style.backgroundImage = `url('${this.imagesURL}/images/${this.theme}.png')`;
    },

    divTouchmove() {
      this.numOfQuestions = this.$refs.value.value;
      if (this.$refs.rangeValue.value > 9) {
        this.$refs.rangeValue.style.color = '#f00';
      } else if (this.$refs.rangeValue.value > 6) {
        this.$refs.rangeValue.style.color = '#ffd500';
      } else {
        this.$refs.rangeValue.style.color = '#3ca744';
      }
    },
    manageQuestions() {
      eventBus.user = {theme: this.theme};
      this.$router.push('manage');
    }
  },
}

</script>
<style scoped>
  .main {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .chose-theme {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 26px;
    font-weight: 700;
    margin-top: 20px;
    width: 100vw;
    text-align: center;
  }

  .select-container {
    background-color: transparent;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    width: 240px;
  }
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

  .letsplay {
    color: #fff;
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
    cursor: pointer;
    height: 2px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #3ca744;
    border: 2px solid #000;
    border-radius: 30px;
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
    height: 40px;
    position: relative;
    top: 0px;
    width: 40px;
    z-index: 1;
  }

  #rangevalue {
    font-size: 24px;
    font-family: 'ZCOOL KuaiLe', cursive;
    height: 40px;
    text-align: center;
    width: 40px;
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

  .button-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 320px;
  }

  .disabled {
    opacity: 1;
  }

  .manage-questions {
    bottom: 15px;
    height: 15px;
    left: 10px;
    position:fixed;
    width: 15px;
  }

  .gitlab-icon {
    bottom: 15px;
    height: 15px;
    position:fixed;
    left: 40px;
    width: 15px;
  }

  .manage-questions:hover {
    cursor: pointer;
  }

  @media all and (max-height: 420px) {
    .select-container {
      width: 100vw;
    }
    .chose-theme {
      font-size: 20px;
      margin-top: 0;
    }

    .theme {
      height: 60px;
      width: 60px;
    }
  }
  @media all and (min-width: 950px) {
    .select-container {
      width: 100vw;
    }
  }
</style>

<template>
  <div class="container-fluid align-items-center claim-container" ref="claim-container">
    <transition name="slide-fade">
      <div class="d-flex flex-column align-items-center claim-background" ref="claimBackground">
        <transition name="bounceIn">
          <div v-if="show" class="d-flex flex-column justify-content-center" ref="claimHeader">
            <h1 class="claimHeader font-weight-bold">Well done {{ name }}!</h1>
          </div>
        </transition>
        <div class="d-flex align-items-center justify-content-center">
          <h2 class="claim-score" ref="claimScore">Your score is:</h2>
          <transition name="bounceIn">
            <div v-if="show" class="final-score">{{score}}</div>
          </transition>
        </div>
        <h3 class="claim-text" ref="claim-text">
          You won:
        </h3>
        <div class="lootbox-text">Epic Chest</div>
        <img class="treasure-chest" :src="imagesURL + '/images/treasure.png'" alt="treasure">
        <transition name="bounceIn">
          <div v-if="show" 
            class="mt-3 btn btn-success d-flex justify-content-center align-items-center font-weight-bold claim-button"
            data-toggle="modal" 
            data-target="#rewardpage">OPEN</div>
        </transition>
        <transition name="bounceIn">
          <div v-if="show" 
            class="mt-3 btn btn-info d-flex justify-content-center align-items-center font-weight-bold claim-button"
            data-toggle="modal" 
            data-target="#questionSummary">SUMMARY</div>
        </transition>
      </div>
    </transition>
    <reward-page/>
    <question-summary/>
  </div>
</template>

<script>
import RewardPage from './RewardPage';
import QuestionSummary from './QuestionSummary';
import { eventBus } from '../../main';

export default {
  name: 'SummaryPage',
  components: {
    'reward-page': RewardPage,
    'question-summary': QuestionSummary
  },

  data() {
    return {
      answers: eventBus.user.currentGame.answers,
      name: eventBus.user.name,
      score: eventBus.user.currentGame.score,
      imagesURL: process.env.VUE_APP_IMAGES_URL,
      show: false,
      theme: eventBus.user.theme
    }
  },

  mounted() {
    // for css animation
    this.show = true;
    setTimeout(() => {
      this.$refs.claimContainer.style.backgroundImage = `url('${this.imagesURL}/images/${this.theme}.png')`;
      if (this.theme[0] === 'd') {
        this.$refs.claimHeader.style.color = '#ddd';
        this.$refs.claimScore.style.color = '#ddd';
        this.$refs.claimText.style.color = '#ddd';
      } else {
        this.$refs.claimHeader.style.color = '#333';
        this.$refs.claimScore.style.color = '#333';
        this.$refs.claimText.style.color = '#333';
      }
    }, 0);
  }
}
</script>

<style scoped>
  .claim-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .claim-text, .claim-header {
    align-items: center;
    border: none;
    display: flex;
    font-family: 'ZCOOL KuaiLe', cursive;
    justify-content: center;
    text-align: center;
    width: 75vw;
  }

  .claim-score {
    font-family: 'ZCOOL KuaiLe', cursive;
  }

  .claim-button:hover {
    cursor: pointer;
  }

  .claim-button {
    height: 50px;
    width: 250px;
  }

  .final-score {
    color: #009b48;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 34px;
    font-weight: 700;
    padding: 5px;
  }

  .answer-sox {
    border-radius: 4px;
    padding-left: 10px;
  }

  .selected-answer {
    color: #fff;
    font-weight: 600;
  }

  .answer-check {
    background-color: #333;
    border-radius: 5px;
    margin: 50px;
    padding: 20px;
  }

  .lootbox-text {
    color: #F725E2;
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 30px;
    font-weight: 700;
  }

  .treasure-chest {
    width: 25vw;
    min-width: 120px;
    max-width: 250px;
  }

  /* Animations */
  .bounceIn-enter-active {
    animation: bounce-in 1s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
<template>
  <div v-if="theme" class="container-fluid align-items-center claim-container" ref="claimContainer">
    <transition name="slide-fade">
      <div class="d-flex flex-column align-items-center claim-background" ref="claimBackground">
        <transition name="bounceIn">
          <div v-if="show" class="d-flex flex-column justify-content-center" ref="claimHeader">
            <h1 class="claim-header font-weight-bold">Well done {{ name }}!</h1>
          </div>
        </transition>
        <div class="d-flex align-items-center justify-content-center">
          <h2 class="claim-score" ref="claimScore">Your score is:</h2>
          <transition name="bounceIn">
            <div v-if="show" class="final-score">{{score}}</div>
          </transition>
        </div>
        <h3 class="claim-text" ref="claimText">
          You won:
        </h3>
        <div class="lootbox-text">Epic Chest</div>
        <img class="treasure-chest" :src="imagesURL + '/images/treasure.png'" alt="treasure">
        <transition name="bounceIn">
          <div v-if="show" 
            class="btn btn-success claim-button"
            @click="isRewardRevealed = true"
            data-toggle="modal" 
            data-target="#rewardpage">OPEN</div>
        </transition>
        <transition name="bounceIn">
          <div v-if="show" 
            class="btn btn-info claim-button"
            data-toggle="modal" 
            data-target="#questionSummary">SUMMARY</div>
        </transition>
        <transition name="bounceIn">
          <div v-if="show" 
            class="btn btn-warning claim-button"
            @click="isLeaderboardRevealed = true"
            data-toggle="modal" 
            data-target="#leaderboardpage">Leaderboard</div>
        </transition>
      </div>
    </transition>
    <reward-page v-if="isRewardRevealed"/>
    <question-summary/>
    <leaderboard-page v-if="isLeaderboardRevealed"/>
  </div>
</template>

<script>
import RewardPage from './RewardPage';
import QuestionSummary from './QuestionSummary';
import Leaderboard from './Leaderboard';
import { mapGetters } from 'vuex';

export default {
  name: 'SummaryPage',
  components: {
    'reward-page': RewardPage,
    'question-summary': QuestionSummary,
    'leaderboard-page': Leaderboard
  },

  computed: mapGetters([
    'name',
    'score',
    'theme'
  ]),

  data() {
    return {
      imagesURL: process.env.VUE_APP_IMAGES_URL,
      isRewardRevealed: false,
      isLeaderboardRevealed: false,
      show: false
    }
  },

  mounted() {
    // for css animation
    this.show = true;
    this.$refs.claimContainer.style.backgroundImage = `url('${this.imagesURL}/images/${this.theme}.png')`;
    setTimeout(() => {
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
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight: 700;
    height: 50px;
    margin-top: 15px;
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
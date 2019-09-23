<template>
  <div class="container-fluid justify-content-center align-items-center claimContainer" ref="claimContainer">
    <transition name="slide-fade">
      <div class="d-flex flex-column align-items-center claimBackground" ref="claimBackground">
        <transition name="bounceIn">
          <div v-if="show" class="d-flex flex-column align-items-center justify-content-center" ref="claimHeader">
            <h1 class="claimHeader font-weight-bold">Well done {{ name }}!</h1>
          </div>
        </transition>
        <div class="d-flex align-items-center justify-content-center">
          <h2 class="claimScore" ref="claimScore">Your score is:</h2>
          <transition name="bounceIn">
            <div v-if="show" class="finalScore">{{score}}</div>
          </transition>
        </div>
        <h3 class="claimText" ref="claimText">
          You won:
        </h3>
        <div class="lootboxText 2">Epic Chest</div>
        <img class="treasure-chest" :src="serverURL + '/images/treasure.png'" alt="treasure">
        <transition name="bounceIn">
          <div v-if="show" 
            class="mt-3 btn btn-success d-flex justify-content-center align-items-center font-weight-bold claimButton"
            @click="$router.push('reward')">OPEN</div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  name: 'LikedInfo',

  data() {
    return {
      serverURL: process.env.VUE_APP_BACKEND_SERVER_URL,
      name: eventBus.user.name,
      score: eventBus.user.currentGame.score,
      answers: eventBus.user.currentGame.answers,
      theme: eventBus.user.theme,
      show: false
    }
  },

  mounted() {
    this.show = true;
    setTimeout(() => {
      this.$refs.claimContainer.style.backgroundImage = `url('${process.env.VUE_APP_BACKEND_SERVER_URL}/images/${this.theme}.png')`;
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
  .claimContainer {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .claimText, .claimHeader {
    font-family: 'ZCOOL KuaiLe', cursive;
    border: none;
    text-align: center;
    width: 75vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .claimScore {
    font-family: 'ZCOOL KuaiLe', cursive;
  }

  .claimButton:hover {
    cursor: pointer;
  }

  .claimButton {
    width: 120px;
    height: 50px;
  }

  .finalScore {
    font-family: 'ZCOOL KuaiLe', cursive;
    color: #009b48;
    padding: 20px;
    font-size: 34px;
    font-weight: 700;
  }

  .answerBox {
    border-radius: 4px;
    padding-left: 10px;
  }

  .selectedAnswer {
    color: #fff;
    font-weight: 600;
  }

  .answerCheck {
    background-color: #333;
    margin: 50px;
    padding: 20px;
    border-radius: 5px;
  }

  .lootboxText {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 30px;
    color: #F725E2;
    font-weight: 700;
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
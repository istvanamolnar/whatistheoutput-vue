<template>
  <div class="modal fade" id="rewardpage" tabindex="-2" role="dialog" ref="rewardPage">
    <div v-if="randomPhoto" class="reward-dialog" :key="randomPhoto.toString()" role="document">
      <div class="reward-content" ref="rewardContainer">
        <div class="congratulations">Congratulations!</div>
        <div class="congratulations">You have won:</div>
        <div class="reward">A random photo:</div>
        <img :src="randomPhoto" class="random-photo bounce" alt="Random unsplash photo">
        <div class="finish-button-container">
          <div class="btn btn-success finish-button" @click="openImage()" >{{opened ? "New game" : "Nice, cheers!"}}</div>
          <div class="btn btn-outline-danger finish-button" @click="handleRandomPhoto()">I don't like this one</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RewardPage',

  computed: mapGetters([
    'randomPhoto',
    'theme'
  ]),

  data() {
    return {
      opened: false
    }
  },

  mounted() {
    this.saveGame();
    this.getRandomPhoto()
      .then(() => {
        this.setBgColor();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  },

  methods: {
    ...mapActions([
      'getRandomPhoto',
      'saveGame',
      'downloadImage'
    ]),

    handleRandomPhoto() {
      this.opened = false;
      this.getRandomPhoto()
      .then(() => {
        this.setBgColor();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },

    setBgColor() {
      setTimeout(() => {
        if (this.theme[0] === 'd') {
          this.$refs.rewardContainer.style.backgroundColor = '#000';
          this.$refs.rewardContainer.style.color = '#eee';
        } else if (this.theme[0] === 'l') {
          this.$refs.rewardContainer.style.color = '#111';
          this.$refs.rewardContainer.style.backgroundColor = '#fff';
        }
      }, 0);
    },

    openImage() {
      if (this.opened) {
        window.location.href = '/';
      } else {
        this.downloadImage(this.randomPhoto);
        this.opened = true;
      }
      
    }
  }
}
</script>

<style scoped>
  .congratulations {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 30px;
    max-width: 300px;
  }

  .reward {
    font-size: 24px;
    margin: 10px auto;
  }

  .random-photo {
    height: 90%;
    width: 90%;
  }

  .finish-button {
    width: max-content;
    margin: 20px 10px;
  }

  .finish-button:hover {
    cursor: pointer;
  }

  .reward-dialog {
    width: 450px;
    margin: auto;
  }

  .reward-content {
    align-items: center;
    border: 1px solid #888;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .bounce {
    animation: bounce-in 0.5s;
  }

  @media all and (max-width: 450px) {
    .reward-dialog {
      width: 100vw;
    }

    .finish-button-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 10px;
    }

    .finish-button {
      margin: 0 auto 10px;
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
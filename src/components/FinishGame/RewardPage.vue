<template>
  <div class="modal fade" id="rewardpage" tabindex="-2" role="dialog" ref="rewardPage">
    <div v-if="dogPhoto" class="reward-dialog" :key="dogPhoto.toString()" role="document">
      <div class="reward-content" ref="rewardContainer">
        <div class="congratulations">Congratulations!</div>
        <div class="congratulations">You have won:</div>
        <div class="reward">A random dog photo:</div>
        <img :src="dogPhoto" class="dog-photo bounce" alt="Random dog photo">
        <div class="finish-button-container">
          <div class="btn btn-success finish-button" @click="openImage()" >{{opened ? "New game" : "Nice, cheers!"}}</div>
          <div class="btn btn-outline-danger finish-button" @click="getDogPhoto">I don't like this one</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'RewardPage',
  data() {
    return {
      dogPhoto: null,
      opened: false,
      theme: eventBus.user.theme
    }
  },

  mounted() {
    this.getDogPhoto();
    this.saveUserData();
  },

  methods: {
    getDogPhoto() {
      this.opened = false;
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        this.dogPhoto = res.data.message;
        setTimeout(() => {
          if (this.theme[0] === 'd') {
            this.$refs.rewardContainer.style.backgroundColor = '#000';
            this.$refs.rewardContainer.style.color = '#eee';
          } else if (this.theme[0] === 'l') {
            this.$refs.rewardContainer.style.color = '#111';
            this.$refs.rewardContainer.style.backgroundColor = '#fff';
          }
        }, 0);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },

    saveUserData() {
      axios({
        headers: { "x-api-key": process.env.VUE_APP_API_KEY },
        method: 'post',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/user`,
        data: {
          name: eventBus.user.name,
          score: eventBus.user.currentGame.score,
          userAnswers: eventBus.user.currentGame.answers,
          game: eventBus.user.game
        }
      })
      // eslint-disable-next-line
      .then((res) => console.log(res.data.message))
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },

    openImage() {
      if (this.opened) {
        window.location.href = '/';
      } else {
        window.open(this.dogPhoto, '_blank');
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

  .dog-photo {
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
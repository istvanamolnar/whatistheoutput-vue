<template>
  <div class="modal fade p-3" id="rewardpage" tabindex="-2" role="dialog" ref="rewardPage">
    <div v-if="dogPhoto" class="modal-dialog mx-auto my-3" role="document">
      <div class="reward-content modal-content d-flex flex-column" ref="rewardContainer">
        <div class="congratulations">Congratulations!</div>
        <div class="congratulations">You have won:</div>
        <div class="reward">A random dog photo:</div>
        <div class="d-flex justify-content-center align-items-center">
          <img :src="dogPhoto" class="dog-photo" alt="Random dog photo">
        </div>
        <div class="d-flex justify-content-center">
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
      dogPhoto: String,
      opened: false,
      theme: eventBus.user.theme
    }
  },

  mounted() {
    this.getDogPhoto();
    this.saveUserData();
    if (this.theme[0] === 'd') {
      this.$refs.rewardContainer.style.backgroundColor = '#333';
      this.$refs.rewardContainer.style.color = '#ddd';
    } else if (this.theme[0] === 'l') {
      this.$refs.rewardContainer.style.backgroundColor = '#ddd';
      this.$refs.rewardContainer.style.color = '#333';
    }
  },

  methods: {
    getDogPhoto() {
      this.opened = false;
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        this.dogPhoto = res.data.message;
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },

    saveUserData() {
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/user`,
        data: {
          name: eventBus.user.name,
          score: eventBus.user.currentGame.score,
          userAnswers: eventBus.user.currentGame.answers,
          game: eventBus.user.game
        }
      })
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
    margin: auto;
    max-width: 300px;
  }

  .reward {
    font-family: 'Courier New', Courier, monospace;
    font-size: 24px;
    margin: 10px auto;
  }

  .dog-photo {
    height: 90%;
    width: 90%;
  }

  .finish-button {
    width: max-content;
    margin: 20px auto;;
  }

  .finish-button:hover {
    cursor: pointer;
  }

  .reward-content {
    border: 1px solid #888;
  }
</style>
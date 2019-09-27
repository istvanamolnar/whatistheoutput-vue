<template>
  <div class="modal fade p-3" id="welcomepage" tabindex="-1" role="dialog" ref="welcome-page">
    <div class="modal-dialog mx-auto my-3" role="document">
      <div class="welcome-content modal-content d-flex flex-column">
        <transition name="slide-fade" mode="out-in">
          <div v-if="page === 'guest'" class="modal-body pt-0">
            <div class="welcome-text">Welcome to</div>
            <div class="welcome-text">What Is The Output quiz</div>
            <div class="rules my-3">In this game, you will get tricky JavaScript interview questions.</div>
            <div class="rules mb-2">Afterwards, you can claim your well deserved reward, according to your score.</div>
          </div>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <div v-if="page === 'login'" class="modal-body pt-0">
            <div class="welcome-text">Welcome back!</div>
            <div class="secondline-text mb-3">Please sign in:</div>
            <div class="login-area">
              <form>
                <div class="form-group">
                  <label for="username">username</label>
                  <input type="email" class="form-control input-field" id="username" placeholder="Enter username">
                </div>
                <div class="form-group">
                  <label for="password">password</label>
                  <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
              </form>
            </div>
          </div>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <div v-if="page === 'signup'" class="modal-body pt-0">
            <div class="welcome-text">Welcome, stranger!</div>
            <div class="secondline-text mb-3">Quick sign up, no verification. Or continue as a guest, no strings attached.</div>
            <div class="signup-area">
              <form>
                <div class="form-group">
                  <label for="username">username</label>
                  <input type="email" class="form-control input-field" id="username" placeholder="Enter username" ref="signupUsername">
                </div>
                <div class="form-group">
                  <label for="password">password</label>
                  <input type="password" class="form-control" id="password" placeholder="Password" ref="signupPassword">
                  <small class="form-text text-right" ref="passwordHint">minimum 8 characters</small>
                </div>
              </form>
            </div>
          </div>
        </transition>
        <div class="mx-auto">
          <div class="proceed-button btn btn-outline-success m-3" @click="signupUser" ref="signupButton">Sign up</div>
          <div class="proceed-button btn btn-outline-danger m-3" @click="loginUser" ref="loginButton">Login</div>
          <div class="proceed-button btn btn-warning m-3" data-dismiss="modal" ref="guestButton">Continue as guest</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'WelcomPage',
    data() {
      return {
        page: 'guest'
      }
    },

    methods: {
      loginUser() {
        if (this.page === 'login') {
        } else {
          this.page = 'login';
          this.$refs.signupButton.className = 'proceed-button btn btn-outline-success m-3';
          this.$refs.loginButton.className = 'proceed-button btn btn-danger m-3';
          this.$refs.guestButton.className = 'proceed-button btn btn-outline-warning m-3';
        }
      },

      signupUser() {
        if (this.page === 'signup') {
          if (this.$refs.signupPassword.value.length < 8) {
            this.$refs.passwordHint.style.color = '#f00';
            this.$refs.passwordHint.style.fontSize = '1em';
            this.$refs.passwordHint.style.fontWeight = '600';
          } else {
            const userToSignup = {
              username: this.$refs.signupUsername.value,
              password: this.$refs.signupPassword.value
            };
            

          }
        } else {
          this.page = 'signup';
          this.$refs.signupButton.className = 'proceed-button btn btn-success m-3';
          this.$refs.loginButton.className = 'proceed-button btn btn-outline-danger m-3';
          this.$refs.guestButton.className = 'proceed-button btn btn-outline-warning m-3';
        }
      }
    }
  }
</script>

<style>
  .welcome-content {
    background-color: #333;
    border-radius: 10px;
    color: #eee;
    text-align: center;
  }

  .welcome-text {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 32px;
  }

  .rules {
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    margin: auto;
    max-width: 300px;
  }

  .rules:hover, .welcome-text:hover {
    cursor: default;
  }

  .secondline-text {
    font-family: 'Courier New', Courier, monospace;
  }

  .proceed-button:hover {
    cursor: pointer;
  }

  /* Animations */
  .slide-fade-leave-active {
    transition: all .4s ease;
  }
  .slide-fade-enter-active {
  transition: all .4s ease;
  }
  .slide-fade-enter{
    transform: translateX(-100px);
    opacity: 0;
  }
  
  .slide-fade-leave-active {
    transform: translateX(100px);
    opacity: 0;
    position: absolute;
    z-index: 1;
  }
</style>
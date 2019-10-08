<template>
  <div class="modal fade" id="welcomepage" tabindex="-1" role="dialog" ref="welcome-page">
    <div class="modal-dialog welcome-container" role="document">
      <div class="welcome-content modal-content d-flex flex-column align-items-center">
        <div class="modal-body">
          <div class="welcome-text">Welcome to</div>
          <div class="welcome-text">What Is The Output quiz!</div>
          <div class="rules">In this game, you will get tricky JavaScript interview questions.</div>
          <div class="rules">Afterwards, you can claim your well deserved reward, according to your score.</div>
          <div class="rules"><strong>Have fun!</strong></div>
        </div>
        <div class="okay-button btn btn-success" data-dismiss="modal">Okay</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage'
}
</script>

<style scoped>
  .welcome-content {
    background-color: #333;
    border-radius: 10px;
    color: #eee;
    text-align: center;
  }

  .welcome-container {
    max-width: max-content;
  }

  .welcome-text {
    font-family: 'ZCOOL KuaiLe', cursive;
    font-size: 32px;
  }

  .rules {
    font-size: 20px;
    margin: 20px auto;
    max-width: 300px;
  }

  .rules:hover, .welcome-text:hover {
    cursor: default;
  }

  .okay-button {
    max-width: max-content;
    padding: 5px 50px;
    font-weight: 600;
    margin: 0 auto 15px;
  }
  .okay-button:hover {
    cursor: pointer;
  }
</style>
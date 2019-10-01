<template>
  <div class="modal fade p-3" id="welcomepage" tabindex="-1" role="dialog" ref="welcome-page">
    <div class="modal-dialog mx-auto my-3 welcome-container" role="document">
      <div class="welcome-content modal-content d-flex flex-column align-items-center">
        <div class="modal-body py-0">
          <div class="welcome-text">Welcome to</div>
          <div class="welcome-text">What Is The Output quiz!</div>
          <div class="rules my-3">In this game, you will get tricky JavaScript interview questions.</div>
          <div class="rules">Afterwards, you can claim your well deserved reward, according to your score.</div>
          <div class="rules my-2 font-weight-bold">Have fun!</div>
        </div>
        <div class="okay-button btn btn-success mb-3" data-dismiss="modal">Okay</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
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
    margin: auto;
    max-width: 300px;
  }

  .rules:hover, .welcome-text:hover {
    cursor: default;
  }

  .okay-button {
    max-width: max-content;
    padding: 5px 50px;
    font-weight: 600;
    margin: auto;
  }
  .okay-button:hover {
    cursor: pointer;
  }
</style>
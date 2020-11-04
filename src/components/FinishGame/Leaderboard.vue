<template>
  <div class="modal fade bg" id="leaderboardpage" tabindex="1" role="dialog" ref="bg">
    <div class="modal-dialog leaderboard-container" role="document">
      <div class="modal-content leaderboard-content">
        <button class="btn btn-info close-button" data-dismiss="modal">Close</button>
        <table class="table table-sm table-bordered table-container" ref="tableContainer">
          <thead>
            <tr>
              <th scope="col" class="rank">#</th>
              <th scope="col" class="name">name</th>
              <th scope="col" class="score">score</th>
            </tr>
          </thead>
          <tbody v-if="leaderboardData">
            <tr v-for="(game, index) in leaderboardData" :key="game.gameId" class="table-row" ref="tableRow">
              <td class="rank">{{index + 1}}</td>
              <td class="name"><strong>{{game.name}}</strong></td>
              <td class="score">{{game.score}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Leaderboard',

  computed: mapGetters([
    'leaderboardData',
    'name',
    'theme'
  ]),

  methods: {
    ...mapActions([
      'getLeaderboard'
    ])
  },

  mounted() {
    this.getLeaderboard()
    .then(() => {
      this.leaderboardData.forEach((game, index) => {
        if (game.name === this.name) {
          setTimeout(() => {
            this.$refs.tableRow[index].style.backgroundColor = '#3ca744'
            this.$refs.tableRow[index].style.color = '#fff'
          }, 0);
        }
      });
      if (this.theme[0] === 'd') {
        this.$refs.tableContainer.classList.add('table-dark');
        this.$refs.tableContainer.style.color = '#ddd';
      } else {
        this.$refs.tableContainer.classList.add('table-light');
        this.$refs.tableContainer.style.color = '#333';
      }
    })
    // eslint-disable-next-line
    .catch(err => console.log(err));
  }
}
</script>

<style scoped>
  .leaderboard-container {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .content-container {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }

  .leaderboard-content {
    background-color: transparent;
    max-width: max-content;
    border: none;
  }

  .table-container {
    cursor: default;
    margin: auto;
    width: 300px;
    border: 3px solid #888;
    border-radius: 10px;
  }

  .close-button {
    align-self: flex-end;
    margin-bottom: 15px;
    width: 120px;
  }

  .name, .score, .rank {
    border-color: #888;
    text-align: center;
  }

  .table-row:nth-child(1) {
    background-color: #ffd500;
    color: #333;
  }

  .table-row:nth-child(2) {
    background-color: #ccc;
    color: #333;
  }

  .table-row:nth-child(3) {
    background-color: #ff5900;
  }
</style>
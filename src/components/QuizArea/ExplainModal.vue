<template>
  <div class="modal fade" id="seedetails" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content" ref="title" >
        <div class="modal-header">
          <div id="DetailsLabel">
            <highlight-code lang="javascript" class="explain-code">
              {{ questionText }}
            </highlight-code>
          </div>
        </div>
        <div class="modal-body explanation" ref="details">
            <p>{{ description }}</p>
        </div>
        <button type="button" class="btn btn-success thanks-button" data-dismiss="modal">Thanks</button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  name: 'ExplainModal',
  props: {
    description: String,
    questionText: String
  },

  data() {
    return {
      theme: eventBus.user.theme
    }
  },

  mounted() {
    if (this.theme[0] === 'd') {
      this.$refs.title.style.backgroundColor = '#0f0f0f';
      this.$refs.details.style.color = '#bbb';
      this.$refs.details.style.backgroundColor = '#0f0f0f';
    } else if (this.theme[0] === 'l') {
      this.$refs.title.style.backgroundColor = '#f0f0f0';
      this.$refs.details.style.color = '#444';
      this.$refs.details.style.backgroundColor = '#f0f0f0';
    }
  }
}

</script>

<style scoped>
  .modal-content {
    border: 2px solid #f0f0f0;
    width: max-content;
  }

  .modal-header {
    border: none;
    margin: auto;
  }

  .explain-code {
    font-size: 18px;
  }

  .explanation {
    max-width: 100vw;
    margin: auto;
  }

  .thanks-button {
    margin: 0 auto 20px;
    width: 100px;
  }
</style>

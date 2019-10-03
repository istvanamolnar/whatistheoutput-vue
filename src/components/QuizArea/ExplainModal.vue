<template>
  <div class="modal fade" id="seedetails" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center" role="document">
      <div class="modal-content" ref="title" >
        <div class="modal-header mx-auto p-1">
          <div id="DetailsLabel">
            <highlight-code lang="javascript" class="m-auto p-1 explain-code">
              {{ questionText }}
            </highlight-code>
          </div>
        </div>
        <div class="modal-body mx-auto explanation" ref="details">
            <p class="m-0">{{ description }}</p>
        </div>
        <button type="button" class="btn btn-success mx-auto mb-3" data-dismiss="modal">Thanks</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplainModal',
  props: ['description', 'questionText', 'theme',],
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
  }

  .explanation {
    max-width: 100vw;
  }

  .explain-code {
    font-size: 18px;
  }
</style>
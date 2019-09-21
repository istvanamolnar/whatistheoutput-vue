<template>
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center" role="document">
      <div class="modal-content" ref="title" >
        <div class="modal-header mx-auto p-1">
          <div id="exampleModalLongTitle">
            <highlight-code lang="javascript" class="m-auto p-1">
              {{ questionText }}
            </highlight-code>
          </div>
        </div>
        <div class="modal-body mx-auto explanation" ref="details">
          <highlight-code lang="javascript" class="m-auto p-1">
            {{ description }}
          </highlight-code>
        </div>
        <div class="modal-footer mx-auto" ref="footer">
          <button type="button" class="btn btn-success m-auto" data-dismiss="modal">Thanks</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplainModal',
  props: ['description', 'theme', 'questionText'],
  data() {
    return {
      showModal: false
    }
  },
  mounted() {
    if (this.theme === 'dark') {
      this.$refs.title.style.backgroundColor = '#0f0f0f';
      this.$refs.details.style.backgroundColor = '#0f0f0f';
      this.$refs.footer.style.backgroundColor = '#0f0f0f';
    } else if (this.theme === 'light') {
      this.$refs.title.style.backgroundColor = '#f0f0f0';
      this.$refs.details.style.backgroundColor = '#f0f0f0';
      this.$refs.footer.style.backgroundColor = '#f0f0f0';
    }
  }
}

</script>

<style>
  .modal-content {
    width: max-content;
    border: 2px solid #f0f0f0;
  }

  .explanation {
    max-width: 100vw;
  }
</style>
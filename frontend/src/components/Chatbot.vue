<template>
  <div id="frogue-container" class="position-right-bottom"
  data-chatbot="de01eef9-f380-4ed2-aecd-41abf5da2008"
  data-user="qjemfrkwl23@gmail.com"
  data-init-key="value"
  ></div>
</template>

<script>
(function(d, s, id) {
  var js = d.getElementsByTagName(s)[0];
  var fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "frogue-embed"));
</script>

<style>
  #frogue-btn-iframe {
    width: 40px !important;
    height: 40px !important;
    right: -10px !important;
  }
  #frogue-launcher {
    box-shadow: 0 0px 0px 0 rgba(79,98,114,.2)!important;
  }
</style>

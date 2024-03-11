<script>

import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDDZqA_Yrhf-pqkyJwqM0YndnbnsvjlqRk&callback=initMap');
    });

    function loadScript(url) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = url;
      document.body.appendChild(script);
    }

    return {};
  },
};
</script>

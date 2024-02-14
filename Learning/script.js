AFRAME.registerComponent('click-event', {
    init: function() {
      this.el.addEventListener('click', () => {
        document.getElementById('info-panel').setAttribute('visible', true);
      });
    }
  });
  
  AFRAME.registerComponent('rotate-on-marker', {
    tick: function() {
      const marker = document.getElementById('map-marker');
      if (marker) {
        this.el.object3D.rotation.y = -marker.object3D.rotation.y;
      }
    }
  });
  
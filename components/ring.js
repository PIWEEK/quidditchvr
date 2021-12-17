AFRAME.registerComponent('ring', {
    init: function() {
        this.enabled = false;
        var self = this;

        this.el.addEventListener('hit', (e) => {
            if (self.enabled){
                self.enabled=false;
                self.el.setAttribute("visible", "false");
                self.el.parentElement.setAttribute("visible", "false");
                self.el.emit('ringcleared');
                document.getElementById("soundeffects").setAttribute("sound", "src: url(sound/clear.mp3); autoplay: false");
                document.getElementById("soundeffects").components.sound.playSound();
            }
        })
    },
    setEnabled:function(enabled){
        this.enabled=enabled;
    }
})
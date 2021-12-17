AFRAME.registerComponent('score', {
    schema: {
        rings: {type: 'string'},
    },
    init: function () {
        var self = this;
        this.enabled = false;
        this.reset();

        var rings = document.querySelectorAll(this.data.rings);
        for (var i=0;i<rings.length;i++){
                rings[i].addEventListener('ringcleared', function (e) {
                self.num_rings = self.num_rings-1;
                self.txt_rings = ("00" + self.num_rings).slice(-2);

                if (self.num_rings == 0){
                    document.getElementById("wineffect").components.sound.playSound();
                    self.el.setAttribute('text', "align:center;color:red;value:Time: " + self.txt_time);
                    self.timeout = 8000;
                } else {
                    self.el.setAttribute('text', "align:center;color:white;value:Rings: " + self.txt_rings + " - Time: " + self.txt_time);
                }

            });
        }

        this.el.addEventListener('startminigame', function (e) {
            self.time = 0;
        });
    },
    reset: function(){
        this.num_rings=10;
        this.time=0;
        this.refresh=0;
        this.txt_rings="10";
        this.txt_time="000";
        this.end="000";
        this.visible = true;
        this.timeout = 8000;
        this.el.setAttribute('text', "align:center;color:white; value:Rings: " + self.txt_rings + " - Time: " + self.txt_time);
    },
    setEnabled:function(enabled){
        this.enabled = enabled;
    },
    tick: function (time, timeDelta) {
        if (this.enabled){
            this.time += timeDelta;
            this.refresh += timeDelta;
            if (this.num_rings > 0){
                if (this.refresh > 1000){
                    this.refresh = 0;
                    this.txt_time = ("000"+Math.round(this.time/1000)).slice(-3);
                    this.el.setAttribute('text', "align:center;color:white;value:Rings: " + this.txt_rings + " - Time: " + this.txt_time);
                }
            } else {
                this.timeout -= timeDelta;
                if (this.refresh > 400){
                    this.refresh = 0;
                    this.el.setAttribute("visible", this.visible);
                    this.visible = ! this.visible;
                }
                if (this.timeout <=0){
                    this.el.emit('startminigame', {value: "menu"})
                }
            }
        }
    }
});
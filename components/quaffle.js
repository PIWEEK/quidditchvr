AFRAME.registerComponent('quaffle', {
    schema: {
        controls: {type: 'selector'},
    },
    init: function () {
        this.oldposition = new THREE.Vector3(0, -90, 0);
        this.player = document.getElementById("player");
        this.hand = document.getElementById("righthand");
        this.reset();
        this.timedisplay=document.getElementById("time");
        var self = this;
        this.inhand = false;


        this.data.controls.addEventListener('grab', function (e) {
            self.grab = e.detail.value;
            if (!self.grab){
                self.inhand = false;
            }
        });


        this.el.addEventListener('hit', (e) => {
            if (self.grab){
                self.inhand = true;
            }
        })

    },
    reset:function(){
        this.time = 60000;
        this.refresh = 0;
        this.txt_time="000";
        this.end = false;
        this.el.object3D.position.setX(-115.6);
        this.el.object3D.position.setY(6);
        this.el.object3D.position.setZ(-0.5);
        this.timeout = 8000;
        this.timevisible = true;
        this.inhand = false;
        this.el.setAttribute("visible", "true");
    },
    tick: function (time, timeDelta) {
        this.displaytime(timeDelta);

        if (this.inhand){
            this.oldposition.x = this.el.object3D.position.x;
            this.oldposition.y = this.el.object3D.position.y;
            this.oldposition.z = this.el.object3D.position.z;
            this.hand.object3D.getWorldPosition(this.el.object3D.position);
        }
    },
    displaytime: function(timeDelta){
        this.time -= timeDelta;
        this.refresh += timeDelta;
        if (!this.end){
            if (this.time<=0){
                this.time = 0;
                this.txt_time = "000";
                this.end = true;
                this.timeout=8000;
                document.getElementById("wineffect").components.sound.playSound();
                this.timedisplay.setAttribute('text', "align:center;color:red;value:Time: " + this.txt_time);
            }

            if (this.refresh > 1000){
                this.refresh = 0;
                this.txt_time = ("000"+Math.round(this.time/1000)).slice(-3);
                this.timedisplay.setAttribute('text', "align:center;color:white;value:Time: " + this.txt_time);
            }
        } else {
            if (this.refresh > 400){
                this.refresh = 0;
                this.timedisplay.setAttribute("visible", this.timevisible);
                this.timevisible = ! this.timevisible;
            }

            this.timeout -= timeDelta;
            if (this.timeout <=0){
                this.el.emit('startminigame', {value: "menu"})
            }
        }
    }
});
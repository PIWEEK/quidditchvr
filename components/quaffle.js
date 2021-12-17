AFRAME.registerComponent('quaffle', {
    schema: {
        controls: {type: 'selector'},
    },
    init: function () {
        this.enabled = false;
        this.oldposition = new THREE.Vector3(0, 0, 0);
        this.player = document.getElementById("player");
        this.hand = document.getElementById("righthand");
        this.reset();
        this.timedisplay=document.getElementById("time");
        var self = this;
        this.inhand = false;
        this.launched = false;
        this.speed = 0;
        this.timelaunched = 0;


        this.data.controls.addEventListener('grab', function (e) {
            self.grab = e.detail.value;
            if (!self.grab){
                self.inhand = false;
                var x = (self.el.object3D.position.x - self.oldposition.x)*200+self.oldposition.x;
                var y = (self.el.object3D.position.y - self.oldposition.y)*200+self.oldposition.y;
                var z = (self.el.object3D.position.z - self.oldposition.z)*200+self.oldposition.z;
                document.getElementById("quaffletarget").object3D.position.setX(x);
                document.getElementById("quaffletarget").object3D.position.setY(y);
                document.getElementById("quaffletarget").object3D.position.setZ(z);
                self.el.object3D.lookAt(x, y, z);
                self.speed = self.el.object3D.position.distanceTo(self.oldposition) / 5;
                self.launched = true;
                this.timelaunched = 0;
            }
        });


        this.el.addEventListener('hit', (e) => {
            if (self.grab){
                self.inhand = true;
            } else {
                document.getElementById("debug").setAttribute('text', "align:center;color:white;value:Goal");
            }
        })

        this.el.addEventListener('hitend', (e) => {

            document.getElementById("debug").setAttribute('text', "align:center;color:white;value:");

        })



    },
    setEnabled(enabled){
        this.enabled=enabled;
    },
    reset:function(){

        this.time = 60000;
        this.refresh = 0;
        this.txt_time="000";
        this.end = false;

        this.timeout = 8000;
        this.timevisible = true;
        this.resetball();

    },
    tick: function (time, timeDelta) {
        if (this.enabled){
            this.displaytime(timeDelta);

            if (this.inhand){
                this.oldposition.x = this.el.object3D.position.x;
                this.oldposition.y = this.el.object3D.position.y;
                this.oldposition.z = this.el.object3D.position.z;
                this.hand.object3D.getWorldPosition(this.el.object3D.position);
            } else if (this.launched){
                this.timelaunched+=timeDelta;
                if (this.timelaunched>5000){
                    this.resetball();
                }
                this.el.object3D.translateZ(this.speed*timeDelta);
            }
        }
    },
    resetball: function(timeDelta){
        this.speed = 0;
        this.el.object3D.position.setX(-115.6);
        this.el.object3D.position.setY(6);
        this.el.object3D.position.setZ(-0.5);
        this.inhand = false;
        this.launched = false;
        this.timelaunched = 0;
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
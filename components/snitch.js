AFRAME.registerComponent('snitch', {
            schema: {
                target: {type: 'selector'},
            },
            init: function () {
                this.reset();
                this.enabled = false;
                this.timedisplay=document.getElementById("time");
                var self = this;
                this.el.addEventListener('hit', (e) => {
                    if (!self.touched){
                        self.touched = true;
                        document.getElementById("wineffect").components.sound.playSound();
                        self.el.setAttribute("visible", "false");
                        document.getElementById("handsnitch").setAttribute("visible", "true");
                        self.timedisplay.setAttribute('text', "align:center;color:red;value:Time: " + self.txt_time);
                    }
                })
            },
            reset:function(){
                this.time = 0;
                this.refresh = 0;
                this.txt_time="000";
                this.touched = false;
                this.el.object3D.position.setX(-150);
                this.el.object3D.position.setY(10);
                this.el.object3D.position.setZ(0);
                this.data.target.object3D.position.setX(150);
                this.data.target.object3D.position.setY(5+Math.floor(Math.random() * 15));
                this.data.target.object3D.position.setZ(-30+Math.floor(Math.random() * 60));
                this.timeout = 8000;
                this.timevisible = true;
                this.el.setAttribute("visible", "true");
                document.getElementById("handsnitch").setAttribute("visible", "false");
            },
            setEnabled:function(enabled){
                this.enabled = enabled;
            },
            tick: function (time, timeDelta) {
                if (this.enabled){
                    this.time += timeDelta;
                    this.refresh += timeDelta;

                    if (!this.touched){
                        this.el.object3D.translateZ(0.012*timeDelta);
                        if (this.el.object3D.position.distanceTo(this.data.target.object3D.position)<0.1){
                            this.data.target.object3D.position.setX(-this.data.target.object3D.position.x);
                            this.data.target.object3D.position.setY(5+Math.floor(Math.random() * 15));
                            this.data.target.object3D.position.setZ(-30+Math.floor(Math.random() * 60));
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
                            document.getElementById("handsnitch").setAttribute("visible", "false");
                            this.el.emit('startminigame', {value: "menu"})
                        }
                    }
                }
            }
    });
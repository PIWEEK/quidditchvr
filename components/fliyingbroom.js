AFRAME.registerComponent('fliying-broom', {
            schema: {
                controls: {type: 'selector'},
            },
            init: function () {
                this.maxSpeed = 0.02;
                this.speed = 0;
                this.rotation = new THREE.Vector3(0, 0, 0);
                this.controllerRotation = new THREE.Vector3(0, 0, 0);

                this.el.object3D.rotation.set(THREE.Math.degToRad(this.rotation.x),
                                        THREE.Math.degToRad(this.rotation.y),
                                        THREE.Math.degToRad(this.rotation.z));


                self = this;
                this.data.controls.addEventListener('rotationxchange', function (e) {
                    self.controllerRotation.x = e.detail.value;
                });

                this.data.controls.addEventListener('rotationychange', function (e) {
                    self.controllerRotation.y = e.detail.value;
                });

                this.data.controls.addEventListener('grip', function (e) {
                    self.grip = e.detail.value;
                });

                this.data.controls.addEventListener('speedboost', function (e) {
                    if (e.detail.value){
                        self.maxSpeed = 0.04;
                    } else {
                        self.maxSpeed = 0.02;
                    }
                });



            },

            tick: function (time, timeDelta) {
                this.speed = Math.max(this.speed - 0.00015, 0);

                if (this.grip){
                    console.log(this.maxSpeed);
                    this.speed = this.maxSpeed;
                    this.rotation.setY(this.rotation.y-this.controllerRotation.x)
                    this.el.object3D.position.setY(this.el.object3D.position.y-this.controllerRotation.y/10)

                    this.el.object3D.rotation.set(THREE.Math.degToRad(this.rotation.x),
                                            THREE.Math.degToRad(this.rotation.y),
                                            THREE.Math.degToRad(this.rotation.z));
                }

                this.el.object3D.translateZ(-this.speed*timeDelta);

                if (this.el.object3D.position.y < 1) {
                    this.el.object3D.position.y = 1;
                }

                if (this.el.object3D.position.y > 25) {
                    this.el.object3D.position.y = 25;
                }

                if (this.el.object3D.position.z < -40) {
                    this.el.object3D.position.z = -40;
                }

                if (this.el.object3D.position.z > 40) {
                    this.el.object3D.position.z = 40;
                }

                if (this.el.object3D.position.x < -160) {
                    this.el.object3D.position.x = -160;
                }

                if (this.el.object3D.position.x > 160) {
                    this.el.object3D.position.x = 160;
                }

            }
        });
AFRAME.registerComponent('fliying-broom', {
            schema: {
                thumbstickControls: {type: 'selector'},
                keysControls: {type: 'selector'},
            },
            init: function () {
                this.speed = -0.01;
                this.rotation = new THREE.Vector3(0, 0, 0);
                this.controllerRotation = new THREE.Vector3(0, 0, 0);

                this.el.object3D.rotation.set(THREE.Math.degToRad(this.rotation.x),
                                        THREE.Math.degToRad(this.rotation.y),
                                        THREE.Math.degToRad(this.rotation.z));


                self = this;
                this.data.keysControls.addEventListener('rotationxchange', function (e) {
                    self.controllerRotation.x = e.detail.value;
                });

                this.data.keysControls.addEventListener('rotationychange', function (e) {
                    self.controllerRotation.y = e.detail.value;
                });
                this.data.thumbstickControls.addEventListener('rotationxchange', function (e) {
                    self.controllerRotation.x = e.detail.value;
                });

                this.data.thumbstickControls.addEventListener('rotationychange', function (e) {
                    self.controllerRotation.y = e.detail.value;
                });


            },

            tick: function (time, timeDelta) {
                this.rotation.setY(this.rotation.y-this.controllerRotation.x)
                this.el.object3D.position.setY(this.el.object3D.position.y-this.controllerRotation.y/10)

                this.el.object3D.rotation.set(THREE.Math.degToRad(this.rotation.x),
                                        THREE.Math.degToRad(this.rotation.y),
                                        THREE.Math.degToRad(this.rotation.z));

                this.el.object3D.translateZ(this.speed*timeDelta);


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
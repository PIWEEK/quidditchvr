AFRAME.registerComponent('handcontrol',{
    init: function () {
        var self = this;
        this.el.addEventListener('thumbstickmoved', function (evt) {
            self.el.emit('rotationxchange', {value: evt.detail.x});
            self.el.emit('rotationychange', {value: evt.detail.y});
        });

        this.el.addEventListener('gripdown', function (evt) {
            self.el.emit('grip', {value: true});
        });

        this.el.addEventListener('gripup', function (evt) {
            self.el.emit('grip', {value: false});
        });

        this.el.addEventListener('thumbstickdown', function (evt) {
            self.el.emit('speedboost', {value: true});
        });

        this.el.addEventListener('thumbstickup', function (evt) {
            self.el.emit('speedboost', {value: false});
        });
    }
});
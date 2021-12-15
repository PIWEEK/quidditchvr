AFRAME.registerComponent('thumbstick',{
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.thumbstickMoved);
        var self = this;
    },
    thumbstickMoved: function (evt) {
        self.el.emit('rotationxchange', {value: evt.detail.x});
        self.el.emit('rotationychange', {value: evt.detail.y});
    }
});
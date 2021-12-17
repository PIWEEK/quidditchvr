AFRAME.registerComponent('grabcontrol',{
    init: function () {
        var self = this;

        this.el.addEventListener('gripdown', function (evt) {
            self.el.emit('grab', {value: true});
        });

        this.el.addEventListener('gripup', function (evt) {
            self.el.emit('grab', {value: false});
        });
    }
});
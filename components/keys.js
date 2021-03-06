AFRAME.registerComponent('keys',{
    init: function () {
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);
        var self = this;
    },
    keyDown: function (evt) {
        if (evt.key=='a'){
            self.el.emit('rotationxchange', {value: -1})
        }
        if (evt.key=='d'){
            self.el.emit('rotationxchange', {value: 1})
        }
        if (evt.key=='w'){
            self.el.emit('rotationychange', {value: -1})
        }
        if (evt.key=='s'){
            self.el.emit('rotationychange', {value: 1})
        }
        if (evt.key==' '){
            self.el.emit('grip', {value: true});
        }
        if (evt.key == 'e'){
            self.el.emit('speedboost', {value: true});
        }
    },

    keyUp: function (evt) {
        if (evt.key=='a' || evt.key=='d'){
            self.el.emit('rotationxchange', {value: 0})
        }
        if (evt.key=='w'|| evt.key=='s'){
            self.el.emit('rotationychange', {value: 0})
        }
        if (evt.key==' '){
            self.el.emit('grip', {value: false});
        }
        if (evt.key == 'e'){
            self.el.emit('speedboost', {value: false});
        }
    }
});
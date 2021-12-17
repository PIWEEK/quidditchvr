AFRAME.registerComponent('menuitem', {
    schema: {
        minigame: {type: 'string'},
    },
    init: function() {
        this.touched = false;
        this.opacity = 0;
        var self = this;

        this.el.addEventListener('hit', (e) => {
            self.touched = true;
        })

        this.el.addEventListener('hitend', (e) => {
            self.touched = false;
        })
    },
    tick: function (time, timeDelta) {
        if (this.touched){
            this.opacity = this.opacity + timeDelta / 5000;
            if (this.opacity >=0.6){
                this.opacity = 0.6;
                this.el.emit('startminigame', {value: this.data.minigame})
            }
        }else {
            this.opacity = this.opacity - timeDelta / 2500;
            if (this.opacity <= 0){
                this.opacity = 0;
            }
        }
        this.el.setAttribute("material", "color:blue; transparent:true; opacity:"+this.opacity);



    }
})

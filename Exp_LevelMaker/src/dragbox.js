Crafty.init(300, 200);
Crafty.background('#eeeeee');
Crafty.c('DragBoxListener', {
    init: function () {
        this.requires('2D, Canvas, Mouse');
        this.box_is_active = false;
        this.bind('MouseDown', this._mouse_down);
        this.bind('Draw', this._draw_me);
        this.ready = true;
    },
    _mouse_down: function (e) {
        // function bound to MouseDown
        this.box_is_active = true;
        this.attr({startx: e.realX,
                   starty: e.realY,
                   xnow: e.realX,
                   ynow: e.realY});
        this.uniqueBind('MouseMove', this._mousemove_with_active_box);
        // this.one('MouseUp', this._mouse_up);
        // Oops, that doesn't work unless the mouseup occurs
        // within the element area. Better to use jquery instead:
        var that = this;
        $(window).one('mouseup', function () {that._mouse_up()});
    },
    _mouse_up: function () {
        this.box_is_active = false;
        this.unbind('MouseMove', this._mousemove_with_active_box);
        this.trigger('Change');
    },
    _mousemove_with_active_box: function (e) {
        this.xnow = e.realX;
        this.ynow = e.realY;
        console.log(parseInt(this.xnow/35) + ',' + parseInt(this.ynow/20));
        this.trigger('Change');
    },
    _draw_me: function (e) {
        if (!this.box_is_active) { return; }
        var ctx = e.ctx;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "green";
        ctx.fillStyle = '#A7A7A7'
        ctx.beginPath();
        ctx.moveTo(this.startx, this.starty);
        ctx.lineTo(this.xnow, this.starty);
        ctx.lineTo(this.xnow, this.ynow);
        ctx.lineTo(this.startx, this.ynow);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
});
Crafty.e('DragBoxListener').attr({x:0, y:0, w:400, h:300});
(function () {
    'use strict';

    function foolproof(func) {
        func.locked = false;
        func.requested = false;
        func.lock = function () {
            func.locked = true;
        };
        func.unlock = function () {
            func.locked = false;
            if (func.requested) {
                func.requested = false;
                foolproofWrap();
            }
        };

        function foolproofWrap() {
            if (func.locked) {
                func.requested = true;
                return;
            }
            func.lock();
            func.apply(func, arguments);
        }

        return foolproofWrap;
    }

    this.H = this.H || {};
    this.H.foolproof = foolproof;

}).call(this);
(function (undef) {
    'use strict';

    function foolproof(func) {
        var lastReturnValue = undef;
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
                return lastReturnValue;
            }
            func.lock();
            lastReturnValue = func.apply(func, arguments);
            return lastReturnValue;
        }
        foolproofWrap.status = function () {
            return {
                locked: func.locked,
                requested: func.requested
            };
        };

        return foolproofWrap;
    }

    this.H = this.H || {};
    this.H.foolproof = foolproof;

}).call(this);
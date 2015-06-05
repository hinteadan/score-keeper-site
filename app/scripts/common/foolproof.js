(function (undef) {
    'use strict';

    function foolproof(func) {
        var lastReturnValue = undef,
            onStatusChange = null;
        func.locked = false;
        func.requested = false;
        func.unlock = function () {
            func.locked = false;
            raiseOnStatusChange();
            if (func.requested) {
                func.requested = false;
                raiseOnStatusChange();
                return foolproofWrap();
            }
            return lastReturnValue;
        };

        function status() {
            return {
                locked: func.locked,
                requested: func.requested
            };
        }

        function raiseOnStatusChange() {
            if (typeof (onStatusChange) !== 'function') {
                return;
            }
            onStatusChange.call(foolproofWrap, status());
        }

        function foolproofWrap() {
            if (func.locked) {
                func.requested = true;
                raiseOnStatusChange();
                return lastReturnValue;
            }
            func.locked = true;
            raiseOnStatusChange();
            lastReturnValue = func.apply(func, arguments);
            return lastReturnValue;
        }
        foolproofWrap.onStatusChange = function (doThis) {
            onStatusChange = doThis;
        };
        foolproofWrap.status = status;

        return foolproofWrap;
    }

    this.H = this.H || {};
    this.H.foolproof = foolproof;

}).call(this);
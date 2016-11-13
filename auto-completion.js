var detectEventSupport = (function () {
    return {
        eventName: function (name) {
            var testElement = document.createElement('i'),
                isSupported;
            name = 'on' + name;
            isSupported = (name in testElement);
            if (!isSupported) {
                testElement.setAttribute(name, 'xxx');
                isSupported = typeof  testElement[name] === 'function';
            }

            testElement = null;
            return isSupported;
        },
        getEventName: function () {
            var self = this;
            switch (true) {
                case self.eventName('propertychange'):
                    return 'propertychange';
                    break;
                case self.eventName('input'):
                    return 'input';
                    break;
                case self.eventName('keyup'):
                    return 'keyup';
                    break;
                case self.eventName('focus'):
                    return 'focus';
                    break;
                default:
                    break;

            }
        }
    }
}());

var autoCompletion = (function () {
    return {
        init: function (obj) {
            var self = this;
            console.log(obj);
            console.log(window.input);
            obj.triggerBtn.on('propertychange keyup focus', function () {
                $.web(obj.ajaxLink, {key: $(this).val()}, self.getTpl, obj.method);
            })
        },
        getTpl: function (json) {
            console.log(json);
        }
    }
}());

$(document).ready(function () {
    autoCompletion.init({
        triggerBtn: $('.autoComplet'),
        targetEle: $('.completeList'),
        ajaxLink: '/admin/main/shopper',
        method: 'get'
    })
});
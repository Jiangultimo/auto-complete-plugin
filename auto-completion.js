/*
 * 判断浏览器事件支持情况，暂时没用到，先留着
 */
var detectEventSupport = (function() {
    return {
        eventName: function(name) {
            var testElement = document.createElement('i'), //创建一个dom元素
                isSupported;
            name = 'on' + name;
            isSupported = (name in testElement); //在原型中查找是否存在‘onxx’事件
            if (!isSupported) {
                testElement.setAttribute(name, 'xxx');
                isSupported = typeof testElement[name] === 'function';
            }

            testElement = null;
            return isSupported;
        },
        getEventName: function() {
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


/*
 * @_obj
 * @_obj.triggerBtn 触发按钮
 * @_obj.targetEle 加载列表的目标dom
 * @_obj.ajaxLink 请求url
 * @_obj.method 请求方法
 */
var autoCompletion = (function() {
    return {
        pramas: null,
        init: function(_obj) {
            var self = this;
            self.pramas = _obj;
            self.pramas.triggerBtn.on('propertychange keyup focus', function() {
                $.ajax({
                    url: self.pramas.ajaxLink,
                    data: {
                        key: $(this).val()
                    },
                    method: self.pramas.method,
                    success: function(json) {
                        self.getTpl(json)
                    }
                });
            })
        },
        getTpl: function(_json) {
            var self = this;
            var str = '';
            for (var i = 0, len = _json.length; i < len; i++) {
                str += '<li data-id="' + _json[i].id + '">' + _json[i].name + '</li>'
            }
            self.pramas.targetEle.html('').append(str);

            //模板渲染完成，绑定点击事件获取id
            self.bindEvent();
        },
        bindEvent: function() {
            var self = this;
            self.pramas.targetEle.find('li').on('click', function() {
                var uid = $(this).attr('data-id');
                self.pramas.triggerBtn.attr('data-id', uid);
                $(this).parent().html('');
                self.pramas.triggerBtn.val($(this).text());
            });
        }
    }
}());

$.extend({
    setDateState: function(element,dateTime){
        var defaultVal;
        if (dateTime){
            defaultVal = dateTime
        } else {
            var nowDate = new Date();
            var fullYear = nowDate.getFullYear();
            var month = ("0" + (nowDate.getMonth() + 1)).slice(-2);
            var day = ("0" + nowDate.getDate()).slice(-2);
            defaultVal = fullYear + '-' + month + '-' + day;
        }
        element.val(defaultVal);
    },
    ModalHelper: (function(bodyCls){
        var scrollTop;
        return {
            afterOpen : function(){
                scrollTop = $(document).scrollTop();
                $('body').addClass(bodyCls);
                $('body').css({
                    'top': -scrollTop + 'px'
                })
            },
            beforeClose: function () {
                $('body').removeClass(bodyCls);
                $(document).scrollTop(scrollTop)
            }
        }
    })('ui-modal-open'),
    openDialog: function(el){
        el.addClass('ui-show').removeClass('ui-hide');
    },
    closeDialog: function(el){
        el.parents('.m-dialog').addClass('ui-hide').removeClass('ui-show');
    },
    openModal: function(){
        $('.J_menuModalHandel').show();
        $('.J_menuModalHandel').children().animate({
            'right': 0
        });
        $.ModalHelper.afterOpen();
    },
    closeModal: function(){
        $.ModalHelper.beforeClose();
        $('.J_menuModalHandel').children().animate({
            'right': '-2.35rem'
        });
        $('.J_menuModalHandel').hide();
    },
    numberToChinese(num){
        var chnNumChar = ['零','一','二','三','四','五','六','七','八','九','十'];
        return chnNumChar[num];
    },
    skuQuantity(){
        $(".J_skuQuantity").each(function(k,v){
            var _minus = $(v).find(".J_btnMinusHandle");
            var _plus = $(v).find(".J_benPlusHandle");
            var _quantity = $(v).find(".J_quantityInput");
            var _quantityPrice = _quantity.attr('data-price');
            var _quantityMax = _quantity.attr('data-max');

            console.log(_quantityPrice);
            _plus.on("tap", function() {
                if (parseInt(_quantity.val()) > _quantityMax  - 1) {
                    _plus.addClass("off");
                } else {
                    _quantity.val(parseInt(_quantity.val()) + 1);
                    _minus.removeClass("off");
                }
                setTotal();
            });
            _minus.on('tap',function(){
                if (parseInt(_quantity.val()) > 1) {
                    _quantity.val(parseInt(_quantity.val()) - 1);
                    _plus.removeClass("off");
                } else {
                    _minus.addClass('off');
                }
                setTotal();  
            })
            _quantity.on('blur',function(){
                if (parseInt(_quantity.val()) > _quantityMax  - 1) {
                    _quantity.val(_quantityMax);
                    _plus.addClass("off");
                    _minus.removeClass("off");
                } else {
                    _quantity.val(1);
                    _plus.removeClass("off");
                    _minus.addClass("off");
                }
                setTotal();  
            })
            function setTotal(){
                $(".J_goodsTotal").html((parseInt(_quantity.val()) * parseInt(_quantityPrice)).toFixed(2)); 
            }
        });
    }
});
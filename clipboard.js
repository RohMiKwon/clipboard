(function($){
    'use strict';

    //this.clipboard = window.ui.clipboard.init(this.$container.find('.url'), this.options.clipboard);

    window.ui = window.ui || {};

    window.ui.clipboard = (function(){
        var defs = {
            baseUrl: window.location.href,
            messages: 'URL이 복사되었습니다.'
        };

        return {
            init: function ($target, options){
                if(!$target.length) return;

                this.$target = $target;
                this.options = $.extend({}, defs, options);
                this.bCopySuccess = true;
                this.copyText = this.options.baseUrl;
                this.$target.on('click', $.proxy(this.onClick, this));
            },

            onClick: function(){
                this.append();
                this.execCopy();
                this.remove();
            },

            append: function(){
                var fakeElement = this.fakeElement = document.createElement('textarea');

                fakeElement.innerHTML = this.copyText;
                fakeElement.setAttribute('class', 'fake-clipboard-text');
                fakeElement.setAttribute('readOnly', 'true');

                // 아이폰 키보드 이슈 대응
                if($('body').hasClass('mobile')) {
                    fakeElement.setAttribute('disabled', 'true');
                }

                fakeElement.style.position = 'fixed';
                fakeElement.style.top = 0;
                fakeElement.style.left = 0;
                fakeElement.style.opacity = 0;

                document.body.appendChild(fakeElement);

                fakeElement.focus();
                fakeElement.setSelectionRange(0, 9999);
            },

            execCopy: function(){
                try{
                    this.bCopySuccess = document.execCommand('copy');
                } catch(e) {
                    this.bCopySuccess = false;
                }
            },

            remove: function(){
                if(this.bCopySuccess){
                    if(this.fakeElement && this.fakeElement.parentNode){
                        this.fakeElement.parentNode.removeChild(this.fakeElement);
                    }

                    alert(this.options.messages);
                }else{
                    window.prompt("Copy to clipboard: Ctrl+C, Enter", this.copyText);
                }

                window.getSelection().removeAllRanges();
            }
        }
    })();
})( jQuery );

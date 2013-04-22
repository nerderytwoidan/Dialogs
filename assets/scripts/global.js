/* ---------------------------------------------------------------------
Global JavaScript

Target Browsers: All
Authors: Thane Woidan
------------------------------------------------------------------------ */

// Namespace Object
var NERD = NERD || {};

// Pass reference to jQuery and Namespace
(function($, APP) {

    // DOM Ready Function
    $(function() {
        APP.Dialog.init();
    });

APP.Dialog = {
    $contents: undefined,
    $toggles: undefined,
    $dialog: undefined,
    $dialogHead: undefined,
    $dialogContent: undefined,

    CONTENT_DATA_SELECTOR: 'dialog-target',

    WRAP_ID:            'dialog-wrap',
    WRAP_HEAD_CLASS:    'dialog-head',
    WRAP_CONTENT_CLASS: 'dialog-content',

    WRAP_TEMPLATE: '<div id="dialog-wrap" class="dialog"><div class="dialog-head"></div><div class="dialog-content"></div></div>',
    DIALOG_OPEN_CLASS: 'dialog-open',

    init: function () {
        this.$contents = $('.makeDialog');
        this.$toggles = $('.dialogToggle');

        if (this.$contents.jquery && this.$toggles.jquery) {
            this.hideContents();
            this.spawnWrapper();
            this.bind();
        }
    },

    bind: function () {
        var self = this;

        this.$toggles.on('click', function (e) {
            var targetContentClass = $(this).data(self.CONTENT_DATA_SELECTOR);

            if (targetContentClass) {
                var $targetEle = $('.' + targetContentClass);

                self.fillContent($targetEle);
                self.toggleDialog();
            } else {
                self.toggleDialog();
            }
        });
    },

    hideContents: function () {
        this.$contents.each(function () {
            $(this).hide();
        });
    },

    spawnWrapper: function () {
        $('body').append(this.WRAP_TEMPLATE);

        this.$dialog = $('#' + this.WRAP_ID);
        this.$dialog.hide();

        this.$dialogHead = this.$dialog.find("." + this.WRAP_HEAD_CLASS);
        this.$dialogContent = this.$dialog.find("." + this.WRAP_CONTENT_CLASS);
    },

    toggleDialog: function () {
        if (this.$dialog.hasClass(this.DIALOG_OPEN_CLASS)) {
            this.$dialog.removeClass(this.DIALOG_OPEN_CLASS);
            this.$dialog.hide();
        } else {
            this.$dialog.addClass(this.DIALOG_OPEN_CLASS);
            this.$dialog.show();
        }
    },

    fillContent: function ($ele) {
        var contentBucket = $ele.html();

        this.$dialogHead.empty();
        this.$dialogContent.empty();

        this.$dialogContent.html(contentBucket);
    }
};





}(jQuery, NERD));

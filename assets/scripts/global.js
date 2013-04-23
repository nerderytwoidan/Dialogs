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
    $overlay: undefined,
    $dialog: undefined,
    $dialogHead: undefined,
    $dialogContent: undefined,

    CONTENT_DATA_SELECTOR: 'dialog-target',
    TITLE_DATA_SELECTOR:  'dialog-title',
    MODAL_DATA_SELECTOR:   'dialog-modal',

    WRAP_ID:            'js-dialogWrap',
    OVERLAY_ID:         'js-dialogOverlay',
    WRAP_HEAD_CLASS:    'dialog-head',
    WRAP_CONTENT_CLASS: 'dialog-content',

    WRAP_TEMPLATE:    '<div id="js-dialogWrap" class="dialog"><div class="dialog-head"></div><div class="dialog-content"></div></div>',
    OVERLAY_TEMPLATE: '<div id="js-dialogOverlay" class="dialogOverlay"></div>',
    CLOSE_TEMPLATE:   '<a href="#" class="dialog-close">Close</a>',
    CLOSE_BUTTON_CLASS: 'dialog-close',
    DIALOG_OPEN_CLASS:  'dialog_isOpen',

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
            e.preventDefault();

            var targetContentClass = $(this).data(self.CONTENT_DATA_SELECTOR);

            if (targetContentClass) {
                var $targetEle = $('.' + targetContentClass);

                if ($(this).data(self.MODAL_DATA_SELECTOR) === true) {
                    self.spawnOverlay();
                    var isModal = true;

                    self.fillContent($targetEle);
                    self.toggleVisibility(true);
                } else {
                    self.fillContent($targetEle);
                    self.toggleVisibility(false);
                }


            } else {
                self.toggleVisibility();
            }
        });

        var $closeButton = this.$dialogHead.find('.' + this.CLOSE_BUTTON_CLASS);
        $closeButton.on('click', function (e) {
            e.preventDefault();
            self.toggleVisibility();
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
        this.$dialogHead.append(this.CLOSE_TEMPLATE);
        this.$dialogContent = this.$dialog.find("." + this.WRAP_CONTENT_CLASS);
    },

    spawnOverlay: function () {
        if (this.$overlay) {
            return;
        } else {
            this.$dialog.before(this.OVERLAY_TEMPLATE);
            this.$overlay = $('#' + this.OVERLAY_ID);
        }
    },

    toggleVisibility: function (isModal) {
        if (this.$dialog.hasClass(this.DIALOG_OPEN_CLASS) && isModal) {
            this.$dialog.removeClass(this.DIALOG_OPEN_CLASS);
            this.$dialog.hide();
            this.$overlay.hide();
        } else if (this.$dialog.hasClass(this.DIALOG_OPEN_CLASS)) {
            this.$dialog.addClass(this.DIALOG_OPEN_CLASS);
            this.$dialog.show();
            this.$overlay.show();
        } else if (this.$dialog.hasClass(this.DIALOG_OPEN_CLASS)) {

        } else {

        }
    },

    fillContent: function ($ele) {
        var contentBucket = $ele.html();

        this.$dialogContent.empty();
        this.$dialogContent.html(contentBucket);
    }
};





}(jQuery, NERD));

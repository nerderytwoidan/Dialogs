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
    $dialogHeading: undefined,
    $dialogContent: undefined,

    dialogTitle: '',

    CONTENT_DATA_SELECTOR: 'dialog-target',
    TITLE_DATA_SELECTOR:   'dialog-title',
    MODAL_DATA_SELECTOR:   'dialog-modal',

    WRAP_ID:            'js-dialogWrap',
    OVERLAY_ID:         'js-dialogOverlay',
    WRAP_HEAD_CLASS:    'dialog-head',
    HEADING_CLASS:      'dialog-head-heading',
    WRAP_CONTENT_CLASS: 'dialog-content',

    WRAP_TEMPLATE:    '<div id="js-dialogWrap" class="dialog"><div class="dialog-head"><span class="dialog-head-heading"></span></div><div class="dialog-content"></div></div>',
    OVERLAY_TEMPLATE: '<div id="js-dialogOverlay" class="dialogOverlay" style="display: none;"></div>',
    CLOSE_TEMPLATE:   '<a href="#" class="dialog-close">Close</a>',
    CLOSE_BUTTON_CLASS: 'dialog-close',
    DIALOG_OPEN_CLASS:  'dialog_isOpen',

    init: function () {
        this.$contents = $('.makeDialog');
        this.$toggles = $('.dialogToggle');

        if (this.$contents.jquery && this.$toggles.jquery) {
            this.hideContents();
            this.spawnWrapper();
            this.spawnOverlay();
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
                var isModal = false;

                // Specified as modal
                if ($(this).data(self.MODAL_DATA_SELECTOR) === true) {
                    isModal = true;
                }

                // Set title string
                if ($(this).data(self.TITLE_DATA_SELECTOR) !== '') {
                    self.dialogTitle = $(this).data(self.TITLE_DATA_SELECTOR);
                }

                self.fillContent($targetEle);
                self.fillTitle(self.dialogTitle);
                self.toggleVisibility(isModal);
                self.position();
            } else {
                self.toggleVisibility();
                throw('You need to specify a target container on your toggle element!');
            }
        });

        // Bind close button to close
        var $closeButton = this.$dialogHead.find('.' + this.CLOSE_BUTTON_CLASS);
        $closeButton.on('click', function (e) {
            e.preventDefault();
            self.toggleVisibility(true);
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
        this.$dialogHeading = this.$dialogHead.find('.' + this.HEADING_CLASS);
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
        if (this.$dialog.hasClass(this.DIALOG_OPEN_CLASS)) {
            this.$dialog.removeClass(this.DIALOG_OPEN_CLASS);
            this.$dialog.hide();
            this.$dialogHeading.text('');
            this.$overlay.hide();
        } else {
            this.$dialog.addClass(this.DIALOG_OPEN_CLASS);
            this.$dialog.show();

            if (isModal) {
                this.$overlay.show();
            }
        }
    },

    fillContent: function ($ele) {
        var contentBucket = $ele.html();

        this.$dialogContent.empty();
        this.$dialogContent.html(contentBucket);
    },

    fillTitle: function (titleString) {
        if (titleString === '') {
            return;
        } else {
            this.$dialogHeading.text(titleString);
        }
    },

    position: function () {
        this.$dialog.css({
            'position': 'absolute',
            'top': ($(window).height() / 2) - (this.$dialog.outerHeight() / 2),
            'left': ($(window).width() / 2) - (this.$dialog.outerWidth() / 2)
        });
    }
};





}(jQuery, NERD));

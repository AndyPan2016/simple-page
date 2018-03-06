/**
 * view.js
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-06-22 13:22:22
 */

'use strict';

module.define('view-popup', function(){
    module.exports = {
        className: {
			btnClose: 'popup-btn-close',
			btnSure: 'popup-btn-sure',
			btnCancel: 'popup-btn-cancel',
			popupMain: 'popup-main',
			show: 'show'
		},
        mask: $('#J-popup-mask'),
        popupMainSubmit: $('#J-popup-main-submit'),
    };
});


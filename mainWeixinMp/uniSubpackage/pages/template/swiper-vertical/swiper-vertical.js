
                require('../../../common/runtime.js');
                require('../../../common/vendor.js');
                require('../../../common/main.js');
                (global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/template/swiper-vertical/swiper-vertical"],{

 1000:
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
 __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
 __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
 __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



 }),

 1001:
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 var _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( 1002);
 var _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
 for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

 }),

 1002:
 (function(module, exports, __webpack_require__) {

"use strict";
(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var videoData = [{
  src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4'
}, {
  src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-02.mp4'
}, {
  src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-03.mp4'
}, {
  src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4'
}, {
  src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-02.mp4'
}, {
  src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-03.mp4'
}];
var _default = {
  data: function data() {
    return {
      circular: true,
      videoList: [{
        id: "video0",
        src: "",
        img: ""
      }, {
        id: "video1",
        src: "",
        img: ""
      }, {
        id: "video2",
        src: "",
        img: ""
      }],
      videoDataList: []
    };
  },
  onLoad: function onLoad(e) {},
  onReady: function onReady() {
    this.init();
    this.getData();
  },
  methods: {
    init: function init() {
      this._videoIndex = 0;
      this._videoContextList = [];

      for (var i = 0; i < this.videoList.length; i++) {
        this._videoContextList.push(uni.createVideoContext('video' + i, this));
      }

      this._videoDataIndex = 0;
    },
    getData: function getData(e) {
      var _this = this;

      this.videoDataList = videoData;
      setTimeout(function () {
        _this.updateVideo(true);
      }, 200);
    },
    onSwiperChange: function onSwiperChange(e) {
      var _this2 = this;

      var currentIndex = e.detail.current;

      if (currentIndex === this._videoIndex) {
        return;
      }

      var isNext = false;

      if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
        isNext = true;
      } else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
        isNext = false;
      } else if (currentIndex > this._videoIndex) {
        isNext = true;
      }

      if (isNext) {
        this._videoDataIndex++;
      } else {
        this._videoDataIndex--;
      }

      if (this._videoDataIndex < 0) {
        this._videoDataIndex = this.videoDataList.length - 1;
      } else if (this._videoDataIndex >= this.videoDataList.length) {
        this._videoDataIndex = 0;
      }

      this.circular = this._videoDataIndex != 0;

      if (this._videoIndex >= 0) {
        this._videoContextList[this._videoIndex].pause();

        this._videoContextList[this._videoIndex].seek(0);
      }

      this._videoIndex = currentIndex;
      setTimeout(function () {
        _this2.updateVideo(isNext);
      }, 200);
    },
    getNextIndex: function getNextIndex(isNext) {
      var index = this._videoIndex + (isNext ? 1 : -1);

      if (index < 0) {
        return this.videoList.length - 1;
      } else if (index >= this.videoList.length) {
        return 0;
      }

      return index;
    },
    getNextDataIndex: function getNextDataIndex(isNext) {
      var index = this._videoDataIndex + (isNext ? 1 : -1);

      if (index < 0) {
        return this.videoDataList.length - 1;
      } else if (index >= this.videoDataList.length) {
        return 0;
      }

      return index;
    },
    updateVideo: function updateVideo(isNext) {
      var _this3 = this;

      this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
      this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].src);
      setTimeout(function () {
        _this3._videoContextList[_this3._videoIndex].play();
      }, 200);
      console.log("v:" + this._videoIndex + " d:" + this._videoDataIndex + "; next v:" + this.getNextIndex(isNext) + " next d:" + this.getNextDataIndex(isNext));
    }
  }
};
exports.default = _default;
}.call(this, __webpack_require__( 1)["default"]))

 }),

 1003:
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( 1004);
 var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
 for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

 }),

 1004:
 (function(module, exports, __webpack_require__) {

    if(false) { var cssReload; }


 }),

 1005:
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( 1006);
 var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
 for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_node_modules_css_loader_index_js_ref_6_oneOf_1_2_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

 }),

 1006:
 (function(module, exports, __webpack_require__) {

    if(false) { var cssReload; }


 }),

 997:
 (function(module, exports, __webpack_require__) {

"use strict";
(function(createPage) {

__webpack_require__( 4);

__webpack_require__( 5);

var _vue = _interopRequireDefault(__webpack_require__( 2));

var _swiperVertical = _interopRequireDefault(__webpack_require__( 998));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_swiperVertical.default);
}.call(this, __webpack_require__( 1)["createPage"]))

 }),

 998:
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 var _swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( 999);
 var _swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( 1001);
 for(var __WEBPACK_IMPORT_KEY__ in _swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 var _swiper_vertical_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( 1003);
 var _swiper_vertical_nvue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( 1005);
 var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( 14);

var renderjs







var component = Object(_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _swiper_vertical_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

if (false) { var api; }
component.options.__file = "src/pages/template/swiper-vertical/swiper-vertical.nvue"
 __webpack_exports__["default"] = (component.exports);

 }),

 999:
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( 1000);
 __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

 __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

 __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

 __webpack_require__.d(__webpack_exports__, "components", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_swiper_vertical_nvue_vue_type_template_id_31a3f0b0___WEBPACK_IMPORTED_MODULE_0__["components"]; });



 })

},[[997,"common/runtime","common/vendor"]]]);

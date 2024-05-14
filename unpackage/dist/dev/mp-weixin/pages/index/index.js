"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      haibaoImg: null,
      modalName: "",
      haibaoShow: false,
      erweimapath: "https://www.xinhuanet.com/politics/2016-07/19/5119875106653616178_11n.jpg",
      goods: {
        "itemid": "2nNozWXiotnRwxGUakBuXUD-0npyN5GSNmYDb0pgTxw",
        "itemtitle": "开丽产妇卫生巾产后专用刀纸月子安睡裤计量卫生巾孕妇用品安心裤",
        "itemshorttitle": "开丽产妇卫生巾月子安睡裤计量卫生",
        "itemdesc": "【开丽旗舰店】安心裤型亲肤面料，产后专用不勒刀口，免穿设计方便，超强吸收加长加大款，产妇的优质选择！【赠运费险】",
        "itemprice": "39.90",
        "todaysale": "3",
        "itempic": "https://img.alicdn.com/imgextra/i1/2742920221/O1CN01nFqqJ41DVGNfjYMmu_!!2742920221.jpg",
        "itemendprice": "29.91"
      }
    };
  },
  onLoad() {
  },
  methods: {
    posterSuccess(haibaoImg) {
      this.haibaoImg = haibaoImg;
      this.modalName = "Image";
    },
    showModal() {
      if (!this.haibaoImg) {
        this.haibaoShow = true;
        common_vendor.index.showLoading({
          title: "海报生成中..."
        });
      } else {
        this.modalName = "Image";
      }
    },
    hideModal() {
      this.modalName = null;
    }
  }
};
if (!Array) {
  const _easycom_cc_poster2 = common_vendor.resolveComponent("cc-poster");
  _easycom_cc_poster2();
}
const _easycom_cc_poster = () => "../../uni_modules/cc-poster/components/cc-poster/cc-poster.js";
if (!Math) {
  _easycom_cc_poster();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.showModal && $options.showModal(...args)),
    b: $data.goods && $data.erweimapath && $data.haibaoShow
  }, $data.goods && $data.erweimapath && $data.haibaoShow ? {
    c: common_vendor.o($options.posterSuccess),
    d: common_vendor.p({
      imgSrc: $data.goods.itempic,
      QrSrc: $data.erweimapath,
      Title: $data.goods.itemtitle,
      PriceTxt: $data.goods.itemendprice,
      OriginalTxt: $data.goods.itemprice,
      LineType: false
    }),
    e: common_vendor.o((...args) => $options.hideModal && $options.hideModal(...args))
  } : {}, {
    f: common_vendor.n($data.modalName == "Image" ? "show" : ""),
    g: common_vendor.o((...args) => $options.hideModal && $options.hideModal(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/llbt/Documents/GitHub/gfMap/cc-poster/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

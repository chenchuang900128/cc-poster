"use strict";
const common_vendor = require("../../../../common/vendor.js");
var _this;
const _sfc_main = {
  name: "cc-poster",
  props: {
    CanvasID: {
      //CanvasID 等同于 canvas-id
      Type: String,
      default: "PosterCanvas"
    },
    imgSrc: {
      //展示图
      Type: String,
      default: ""
    },
    QrSrc: {
      //二维码
      Type: String,
      default: ""
    },
    Title: {
      //文本内容
      Type: String,
      default: "省钱兄"
    },
    TitleColor: {
      //标题颜色
      Type: String,
      default: "#333333"
    },
    LineType: {
      //标题显示行数 大于两行是否省略	（注超出2行显示会导致画布布局絮乱）
      Type: [String, Boolean],
      default: true
    },
    PriceTxt: {
      //价格值
      Type: String,
      default: ""
    },
    PriceColor: {
      //价格颜色
      Type: String,
      default: "#e31d1a"
    },
    OriginalTxt: {
      //原价值
      Type: String,
      default: ""
    },
    OriginalColor: {
      //默认颜色（如原价与扫描二维码颜色）
      Type: String,
      default: "#b8b8b8"
    },
    Width: {
      //画布宽度  (高度根据图片比例计算 单位upx)
      Type: String,
      default: 750
    },
    CanvasBg: {
      //canvas画布背景色
      Type: String,
      default: "#ffffff"
    },
    Referrer: {
      //推荐人信息
      Type: String,
      default: "精选好物"
    },
    ViewDetails: {
      //描述提示文字
      Type: String,
      default: "长按或扫描识别二维码领券"
    }
  },
  data() {
    return {
      loading: false,
      tempFilePath: "",
      canvasW: 0,
      canvasH: 0,
      canvasImgSrc: "",
      ctx: null
    };
  },
  methods: {
    toSave(url) {
      console.log("长按开始");
      common_vendor.index.getImageInfo({
        src: url,
        success: function(image) {
          console.log("图片信息：", JSON.stringify(image));
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: image.path,
            success: function() {
              console.log("save success");
              common_vendor.index.showToast({
                title: "海报已保存相册",
                icon: "success",
                duration: 2e3
              });
            }
          });
        }
      });
    },
    async OnCanvas() {
      this.loading = true;
      _this.ctx = common_vendor.index.createCanvasContext(_this.CanvasID, this);
      const C_W = common_vendor.index.upx2px(_this.Width), C_P = common_vendor.index.upx2px(30), C_Q = common_vendor.index.upx2px(150);
      let _strlineW = 0;
      let _imgInfo = await _this.getImageInfo({
        imgSrc: _this.imgSrc
      });
      console.log("图片信息0：", JSON.stringify(""));
      let _QrCode = await _this.getImageInfo({
        imgSrc: _this.QrSrc
      });
      console.log("图片信息1：", JSON.stringify(""));
      let r = [_imgInfo.width, _imgInfo.height];
      let q = [_QrCode.width, _QrCode.height];
      let imgW = C_W - C_P * 2;
      if (r[0] != imgW) {
        r[1] = Math.floor(imgW / r[0] * r[1]);
        r[0] = imgW;
      }
      if (q[0] != C_Q) {
        q[1] = Math.floor(C_Q / q[0] * q[1]);
        q[0] = C_Q;
      }
      _this.canvasW = C_W;
      _this.canvasH = r[1] + q[1] + 128;
      _this.ctx.setFillStyle(_this.CanvasBg);
      _this.ctx.fillRect(0, 0, C_W, _this.canvasH);
      _this.ctx.drawImage(_imgInfo.path, C_P, C_P, r[0], r[1]);
      _this.ctx.setFontSize(common_vendor.index.upx2px(32));
      _this.ctx.setFillStyle(_this.TitleColor);
      let _strLastIndex = 0;
      let _strHeight = r[1] + C_P * 2 + 10;
      let _num = 1;
      for (let i = 0; i < _this.Title.length; i++) {
        _strlineW += _this.ctx.measureText(_this.Title[i]).width;
        if (_strlineW > r[0]) {
          if (_num == 2 && _this.LineType) {
            _this.ctx.fillText(_this.Title.substring(_strLastIndex, i - 8) + "...", C_P, _strHeight);
            _strlineW = 0;
            _strLastIndex = i;
            _num++;
            break;
          } else {
            _this.ctx.fillText(_this.Title.substring(_strLastIndex, i), C_P, _strHeight);
            _strlineW = 0;
            _strHeight += 20;
            _strLastIndex = i;
            _num++;
          }
        } else if (i == _this.Title.length - 1) {
          _this.ctx.fillText(_this.Title.substring(_strLastIndex, i + 1), C_P, _strHeight);
          _strlineW = 0;
        }
      }
      _strlineW = C_P;
      _strHeight += common_vendor.index.upx2px(60);
      if (_num == 1) {
        _strHeight += 20;
      }
      if (_this.PriceTxt != "") {
        _this.ctx.setFillStyle(_this.PriceColor);
        _this.ctx.setFontSize(common_vendor.index.upx2px(38));
        _this.ctx.fillText("券后价 ￥" + _this.PriceTxt, _strlineW, _strHeight);
        _strlineW += _this.ctx.measureText("券后价 ￥" + _this.PriceTxt).width + common_vendor.index.upx2px(10);
      }
      if (_this.PriceTxt != "" && _this.OriginalTxt != "") {
        _this.ctx.setFillStyle(_this.OriginalColor);
        _this.ctx.setFontSize(common_vendor.index.upx2px(24));
        _this.ctx.fillText(_this.OriginalTxt, _strlineW, _strHeight);
      }
      _this.ctx.strokeStyle = _this.OriginalColor;
      _this.ctx.moveTo(_strlineW, _strHeight - common_vendor.index.upx2px(10));
      _this.ctx.lineTo(_strlineW + _this.ctx.measureText(_this.OriginalTxt).width, _strHeight - common_vendor.index.upx2px(10));
      _this.ctx.stroke();
      _strHeight += common_vendor.index.upx2px(20);
      _this.ctx.drawImage(_QrCode.path, r[0] - q[0] + C_P, _strHeight, q[0], q[1]);
      _this.ctx.setFillStyle(_this.TitleColor);
      _this.ctx.setFontSize(common_vendor.index.upx2px(30));
      _this.ctx.fillText(_this.Referrer, C_P, _strHeight + q[1] / 2);
      _this.ctx.setFillStyle(_this.OriginalColor);
      _this.ctx.setFontSize(common_vendor.index.upx2px(24));
      _this.ctx.fillText(_this.ViewDetails, C_P, _strHeight + q[1] / 2 + 20);
      setTimeout(function() {
        _this.ctx.draw(true, (ret) => {
          common_vendor.index.hideLoading();
          _this.getNewImage();
        });
      }, 600);
    },
    async getImageInfo({
      imgSrc
    }) {
      return new Promise((resolve, errs) => {
        common_vendor.index.getImageInfo({
          src: imgSrc,
          success: function(image) {
            resolve(image);
          },
          fail(err) {
            errs(err);
            common_vendor.index.showToast({
              title: "海报生成失败",
              mask: false,
              duration: 2e3,
              icon: "none"
            });
            common_vendor.index.hideLoading();
          }
        });
      });
    },
    getNewImage() {
      common_vendor.index.canvasToTempFilePath(
        {
          canvasId: _this.CanvasID,
          quality: 1,
          complete: (res) => {
            _this.tempFilePath = res.tempFilePath;
            _this.$emit("success", res);
            _this.loading = false;
            common_vendor.index.showToast({
              title: "长按图片保存海报",
              mask: false,
              duration: 2e3,
              icon: "none"
            });
            common_vendor.index.hideLoading();
          }
        },
        this
      );
    }
  },
  mounted() {
    _this = this;
    this.OnCanvas();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.tempFilePath
  }, !$data.tempFilePath ? {
    b: $props.CanvasID,
    c: $data.canvasW + "px",
    d: $data.canvasH + "px"
  } : {
    e: $data.tempFilePath,
    f: common_vendor.o(($event) => $options.toSave($data.tempFilePath))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/llbt/Documents/GitHub/gfMap/cc-poster/uni_modules/cc-poster/components/cc-poster/cc-poster.vue"]]);
wx.createComponent(Component);

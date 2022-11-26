<template>
  <canvas id="QRCode_header" class="m-auto" :style="{ width: QRWidth + 'px', height: QRHeight + 'px' }"></canvas>
</template>

<script>
import QRCode from "qrcode"; //引入生成二维码插件
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    QRMargin: {
      type: Number,
      default: 12,
    },
    QRWidth: {
      type: Number,
      default: 170,
    },
    QRHeight: {
      type: Number,
      default: 170,
    }
  },
  data () {
    return {
      QRCodeMsg: "",
    };
  },
  methods: {
    getQRCode () {
      let opts = {
        errorCorrectionLevel: "M", //容错级别
        type: "image/png", //生成的二维码类型
        quality: 0.3, //二维码质量
        margin: this.QRMargin, //二维码留白边距
        width: this.QRWidth, //宽
        height: this.QRHeight, //高
        text: this.url, //二维码内容
        color: {
          dark: "#333333", //前景色
          light: "#fff", //背景色
        },
      };
      this.QRCodeMsg = this.url; //生成的二维码为URL地址js
      let msg = document.getElementById("QRCode_header");
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
        // conso.log(error);
      });
    },
  },
  mounted () {
    this.getQRCode();
  },
};
</script>

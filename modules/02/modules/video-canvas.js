'use strict';

var VideoCanvas = {
  $moduleOutputs: $('[data-video-canvas]'),
  
  init: function () {
    if (this.$moduleOutputs.length) {
      
      $.each(this.$moduleOutputs, function (i, item) {
        this.handleVideoCanvas(item);
      }.bind(this));
    }
  },
  
  prepareCanvas: function ($canvas, intWidth, intHeight) {
    $canvas.attr('width', intWidth).attr('height', intHeight);
  },
  
  handleVideoCanvas: function (moduleOutput) {
    var $moduleOutput = $(moduleOutput),
        $outputCanvas = $moduleOutput.find('[data-video-canvas-output]').first(),
        $bufferCanvas = $moduleOutput.find('[data-video-canvas-buffer]').first(),
        $video = $moduleOutput.find('video').first();

    if ($outputCanvas.length && $bufferCanvas.length && $video.length) {
      var oParams = {
          frames: 0,
          video: $video[0],
          ctxBufferCanvas: $bufferCanvas[0].getContext('2d'),
          ctxOutputCanvas: $outputCanvas[0].getContext('2d'),
          width: $video.width(),
          height: $video.height(),
          bufferHeight: $video.height() * 2
        };
      
      //prepare Canvas
      $bufferCanvas.attr('width',oParams.width).attr('height', oParams.bufferHeight);
      $outputCanvas.attr('width', oParams.width).attr('height', oParams.height);

      window.requestAnimationFrame(this.processFrameAnimation.bind(this, null, oParams));
    }
  },
  
  processFrame: function (oParams) {
    
    oParams.ctxBufferCanvas.drawImage(oParams.video, 0, 0, oParams.width, oParams.bufferHeight);
    
    var image = oParams.ctxBufferCanvas.getImageData(0, 0, oParams.width, oParams.height),
        imageData = image.data,
        alphaData = oParams.ctxBufferCanvas.getImageData(0, oParams.height, oParams.width, oParams.height).data;
        
    var i=3,  
        len = imageData.length;
        
    for (; i < len; i = i + 4) {
      imageData[i] = alphaData[i-1];
    }
    
    oParams.ctxOutputCanvas.putImageData(image, 0, 0, 0, 0, oParams.width, oParams.height);
  },


  processFrameAnimation: function (timestamp, oParams) {
    oParams.frames++;
    
    //if (oParams.frames % 2 === 0){
      this.processFrame(oParams);
    //}
    
    window.requestAnimationFrame(this.processFrameAnimation.bind(this, timestamp, oParams));
  }
  
};

module.exports = VideoCanvas;
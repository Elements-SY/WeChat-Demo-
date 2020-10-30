Component({
  properties: {
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '250rpx'
    },
    params: {
      type: Object,
      value: {}
    }
  },

  data: {
    opts: {
      lazyLoad: true
    },
  },

  methods: {

  },

  lifetimes: {
    attached() {
      setTimeout(() => {
        this.ct = this.selectComponent('#bar-dom');
        let params = this.properties.params;
        this.ct.init((canvas, width, height, F2) => {
          this.ct.init((canvas, width, height, F2) => initChart(canvas, width, height, F2, params))
        })
      }, 2000)
    }
  }
})


let chart = null;
function initChart (canvas, width, height, F2, params) {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    pixelRatio: 2
  });

  var Global = F2.Global;

  var data = params.chartData;

  chart.source(data, {
    population: {
      tickCount: 5
    }
  });
  chart.coord({
    transposed: true
  });
  chart.axis(params.xAxisName, {
    line: Global._defaultAxis.line,
    grid: null
  });
  chart.axis(params.yAxisName, {
    line: null,
    grid: Global._defaultAxis.grid,
    label: function label (text, index, total) {
      var textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.interval().position(`${params.xAxisName}*${params.yAxisName}`);
  chart.render();

  return chart;
}
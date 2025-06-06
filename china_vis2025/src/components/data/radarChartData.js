export const radarChartData = {
  labels: ['官方评级', '历史价值', '公众热度', '当代活力', '文化独特性'],
  datasets: {
    dashilar: {
      label: '大栅栏',
      data: [4, 4, 5, 4.5, 4.5],
      backgroundColor: 'rgba(210, 180, 140, 0.3)', // 鞣皮色/浅棕色
      borderColor: 'rgb(139, 69, 19)', // 鞍褐/深棕色
      pointBackgroundColor: 'rgb(139, 69, 19)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(139, 69, 19)',
    },
    mingTombs: {
      label: '明十三陵',
      data: [5, 5, 4, 3.5, 5],
      backgroundColor: 'rgba(181, 138, 36, 0.3)', // 金色/暗黄色
      borderColor: 'rgb(118, 80, 25)', // 暗金/深黄褐色
      pointBackgroundColor: 'rgb(118, 80, 25)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(118, 80, 25)',
    }
  }
};
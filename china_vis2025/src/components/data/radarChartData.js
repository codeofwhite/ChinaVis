// 定义雷达图的评估维度及其最大值
export const radarIndicators = [
  { name: '重要性', max: 100, color: '#5470C6' }, // 0: Importance
  { name: '影响力', max: 100, color: '#91CC75' }, // 1: Influence
  { name: '认知度', max: 100, color: '#FAC858' }, // 2: Recognition
  { name: '历史价值', max: 100, color: '#EE6666' }, // 3: Historical Value
  { name: '当代价值', max: 100, color: '#73C0DE' }, // 4: Contemporary Value
  { name: '日常性', max: 100, color: '#3BA272' }, // 5: Daily Life Integration
  { name: '文化多样性', max: 100, color: '#FC8452' } // 6: Cultural Diversity
];

// 示例地标的雷达图数据
// value 数组的顺序必须与 radarIndicators 的顺序一致
export const landmarkRadarData = [
  {
    name: '故宫',
    value: [95, 90, 98, 98, 70, 60, 75], // 重要性, 影响力, 认知度, 历史价值, 当代价值, 日常性, 文化多样性
    color: '#e4572e' // 故宫的专属颜色
  },
  {
    name: '天坛',
    value: [90, 85, 92, 95, 65, 55, 70],
    color: '#2c7da0' // 天坛的专属颜色
  },
  {
    name: '南锣鼓巷', // 典型的胡同文化，日常性、当代价值、认知度高
    value: [70, 80, 90, 60, 90, 95, 85],
    color: '#ffc107' // 南锣鼓巷的专属颜色
  },
  {
    name: '798艺术区', // 典型的当代文化地标，当代价值、影响力高
    value: [75, 85, 88, 50, 95, 80, 90],
    color: '#6a057f' // 798艺术区的专属颜色
  },
  {
    name: '长城 (八达岭)', // 知名度、重要性、影响力高
    value: [92, 95, 99, 90, 80, 70, 80],
    color: '#8ac926' // 长城的专属颜色
  }
];
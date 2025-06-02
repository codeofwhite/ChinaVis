import pandas as pd
import re

# 读取 Excel 文件（替换为实际文件路径）
file_path = "19人物 - 总数据和各朝代数据.xlsx"
df = pd.read_excel(file_path)

# 定义搜索关键词
keyword = "法源寺"

# 创建空列表存储匹配结果
matched_rows = []

# 遍历每一行
for index, row in df.iterrows():
    # 遍历每一列
    for col_name, cell_value in row.items():
        # 检查单元格是否为字符串类型且包含关键词
        if isinstance(cell_value, str) and re.search(keyword, cell_value):
            # 添加匹配的行到结果列表
            matched_rows.append(row)
            break  # 找到匹配后跳出当前行循环

# 转换为新的 DataFrame
result_df = pd.DataFrame(matched_rows)

if not result_df.empty:
    # 保存结果到新文件
    output_path = f"人物_{keyword}_.xlsx"
    result_df.to_excel(output_path, index=False)
    print(f"找到 {len(result_df)} 行包含'{keyword}'的数据，已保存到: {output_path}")
    
    # 打印结果预览
    print("\n提取结果预览：")
    print(result_df.head())
else:
    print(f"未找到包含'{keyword}'的行")
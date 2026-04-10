#!/bin/bash

# 在 GitHub 创建仓库后运行此脚本

echo "🔗 配置 GitHub 远程..."
cd "/Users/emmawang/Claude Code/20260409 molly01/taiwan-peaks-map"

# 移除旧的远程（如果存在）
git remote remove origin 2>/dev/null || true

# 添加新的远程
git remote add origin https://github.com/eli20261124/taiwan-peaks-map.git

# 设置主分支
git branch -M main

# 推送代码
git push -u origin main

echo "✅ 代码推送完成！"
echo ""
echo "📚 接下来配置 GitHub Pages..."
echo "1. 访问: https://github.com/eli20261124/taiwan-peaks-map/settings/pages"
echo "2. 在 'Source' 下选择 'GitHub Actions'"
echo "3. 或者选择 'Deploy from a branch' > 选择 'main' 分支 > 保存"
echo ""
echo "⏱️ 等待 1-5 分钟让网站生效..."
echo ""
echo "🎉 完成后访问: https://eli20261124.github.io/taiwan-peaks-map/"

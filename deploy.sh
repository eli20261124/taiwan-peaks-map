#!/bin/bash

# 部署到 GitHub Pages 的腳本
# 使用方法: bash deploy.sh

# 構建應用
echo "🔨 Building the application..."
bun run build

# 進入構建目錄
cd dist

# 初始化 git（如果還沒有）
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# 推送到 GitHub Pages 分支
# 注意：修改 <YOUR_USERNAME> 和 <YOUR_REPO_NAME> 為你的實際值
git push -f git@github.com:<YOUR_USERNAME>/<YOUR_REPO_NAME>.git main:gh-pages

echo "✅ 部署完成！應用已發佈至 GitHub Pages"
echo "訪問地址: https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/"

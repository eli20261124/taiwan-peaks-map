#!/bin/bash

# Taiwan Peaks Map - GitHub 部署脚本
# 使用方法： bash github-deploy.sh <YOUR_USERNAME> <YOUR_REPO_NAME>

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🚀 Taiwan Peaks Map - GitHub Pages 部署助手             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 检查参数
if [ $# -lt 2 ]; then
    echo "❌ 缺少参数"
    echo ""
    echo "使用方法："
    echo "  bash github-deploy.sh YOUR_USERNAME YOUR_REPO_NAME"
    echo ""
    echo "示例："
    echo "  bash github-deploy.sh emmawang taiwan-peaks-map"
    echo ""
    echo "💡 提示："
    echo "  1. YOUR_USERNAME 是你的 GitHub 用户名"
    echo "  2. YOUR_REPO_NAME 是仓库名称（推荐: taiwan-peaks-map）"
    echo ""
    exit 1
fi

USERNAME=$1
REPO_NAME=$2

echo "📋 部署配置："
echo "  用户名：$USERNAME"
echo "  仓库名：$REPO_NAME"
echo "  GitHub Pages URL："
echo "  👉 https://$USERNAME.github.io/$REPO_NAME/"
echo ""

# 步骤 1: 确保构建是最新的
echo "🔨 步骤 1/5: 构建生产版本..."
bun run build
echo "✅ 构建完成"
echo ""

# 步骤 2: 添加 GitHub remote（如果未添加）
echo "🔗 步骤 2/5: 配置 GitHub 远程..."
if ! git remote get-url origin > /dev/null 2>&1; then
    git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
    echo "✅ 已添加 GitHub 远程"
else
    echo "ℹ️  GitHub 远程已存在"
fi
echo ""

# 步骤 3: 提交所有更改
echo "📝 步骤 3/5: 提交代码..."
git add .
if git diff-index --quiet HEAD --; then
    echo "ℹ️  没有待提交的更改"
else
    git commit -m "🚀 部署 Taiwan Peaks Interactive Map，支持四种语言和密码保护" || true
    echo "✅ 已提交更改"
fi
echo ""

# 步骤 4: 推送到 GitHub
echo "📤 步骤 4/5: 推送到 GitHub..."
git branch -M main
git push -u origin main
echo "✅ 推送完成"
echo ""

# 步骤 5: 创建 gh-pages 分支用于部署
echo "🌐 步骤 5/5: 配置 GitHub Pages..."
if [ -d "dist" ]; then
    echo "建立 gh-pages 分支..."
    git subtree push --prefix dist origin gh-pages || true
    echo "✅ GitHub Pages 已配置"
else
    echo "⚠️  dist 目录不存在，请确保已运行 'bun run build'"
fi
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                   ✨ 部署完成！                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 部署信息："
echo "  ✅ 代码已推送到: https://github.com/$USERNAME/$REPO_NAME"
echo "  ✅ 网站已部署到: https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⏱️  GitHub Pages 需要 1-5 分钟才能生效"
echo ""
echo "💡 分享链接："
echo "  https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo "🔐 访问密码: taiwan2026"
echo ""
echo "📋 下一步："
echo "  1. 等待 1-5 分钟让 GitHub Pages 生效"
echo "  2. 访问上述 URL 测试应用"
echo "  3. 输入密码 'taiwan2026' 进入"
echo "  4. 分享链接给他人（他们将看到只读版本）"
echo ""

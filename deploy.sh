#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
pnpm run docs:build

#将图片文件复制到发布目录中
#删除已有内容
rm -rf   docs/.vitepress/dist/images
#复制新的内容
cp -af docs/images  docs/.vitepress/dist

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io

git push -f git@github.com:pengleiBlog/pengleiBlog.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
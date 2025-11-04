#!/bin/bash
set -e
echo '初始化 Homework Helper 项目目录结构...'
mkdir -p frontend/src/{pages/{index,camera,question/{list,detail,edit},collection/{list,detail},profile},components,services,store,utils,assets/images/tab}
mkdir -p frontend/config
mkdir -p backend/ruoyi-homework/src/main/java/com/ruoyi/homework/{controller,service/{impl},domain,mapper,thirdparty/{ocr,ai,oss}}
mkdir -p backend/ruoyi-homework/src/main/resources/mapper/homework
mkdir -p backend/sql
echo '完成.'
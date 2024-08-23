<h1 align="center">koa78</h1>
<div align="center">


「koa78」高生产力高并发快速开发 后端API框架

[![License](https://img.shields.io/badge/license-Apache%202-green.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Build Status](https://dev.azure.com/www778878net/basic_ts/_apis/build/status/www778878net.koa78?branchName=main)](https://dev.azure.com/www778878net/basic_ts/_build/latest?definitionId=23&branchName=main)
[![QQ群](https://img.shields.io/badge/QQ群-323397913-blue.svg?style=flat-square&color=12b7f5&logo=qq)](https://qm.qq.com/cgi-bin/qm/qr?k=it9gUUVdBEDWiTOH21NsoRHAbE9IAzAO&jump_from=webapi&authKey=KQwSXEPwpAlzAFvanFURm0Foec9G9Dak0DmThWCexhqUFbWzlGjAFC7t0jrjdKdL)

</div>

## API文档地址：[http://www.778878.net/docs/#/koa78/](http://www.778878.net/docs/#/koa78/)
## 免费远程协助: [阿里云大使绑定](https://www.aliyun.com/minisite/goods?userCode=2ty2vxdh)
## 反馈qq群(点击加群)：[323397913](https://qm.qq.com/cgi-bin/qm/qr?k=it9gUUVdBEDWiTOH21NsoRHAbE9IAzAO&jump_from=webapi&authKey=KQwSXEPwpAlzAFvanFURm0Foec9G9Dak0DmThWCexhqUFbWzlGjAFC7t0jrjdKdL)

## 背景 
1. 十八年ERP开发经验 十年云开发经验 十五年股票期货投资经验 十年投资分析平台开发经验
2. 技术不高 了解业务 擅长解决生产经营实际问题
3. 逐步把多年开发优化 并且在一直稳定运行中的项目开源
4. 因为自己在用 会一直维护 可放心用于生产环境

## 简介 introduction

1. 封装koa 减少学习成本
2. 稳定:运行数年 二台单核1G机器搞定数千并发
3. 开发快:几行代码搞定增删查改 批量新增等常用API
4. 效率高:有完善的低代码前后端框架 在框架下开发 1后端可轻松配合4前端以上
5. 易扩展:业务表与数据表对应 一个目录就是一套小功能 一个文件就是一个数据表
6. 适应强:同时运行在阿里云和腾迅云
7. 易调试:可设置追踪某几个用户或某表或某目录的所有调用
8. 易学习:十行代码搞定 想装不会都难
9. 易运维:有完善的api调用计数和耗时统计 还有出错微信报警机制
10. 更新快:主要运营中的项目也是这套 如有bug或新功能 必然及时更新
11. 易重构:一个目录一个小系统 一个版本一个路径 新旧api可长期共存 边开车边换胎
12. SAAS:支持分帐套或分用户数据隔离

## 截图

>![后端服务](https://github.com/www778878net/node-date78/blob/main/assets/pic/services.jpeg)
>![后端代码示例](https://github.com/www778878net/node-date78/blob/main/assets/pic/nodejs.png)
>![前端代码示例](https://github.com/www778878net/node-date78/blob/main/assets/pic/js.png)


## 适用端 apply

**use for `nodejs ts ` project**



## 安装 rely on

详见API文档地址

## 属性 props

详见API文档地址

## 方法 method

详见API文档地址

## DEMO init
1. git clone https://github.com/www778878net/koa78
2. yarn install (如果没有yarn npm install yarn -g)
3. 打开cmd cd到koa78目录下 运行npm start
4. 打开浏览器 看效果http://localhost:88/Api7822/Test78/test
5. 。。。自己写点东西试试吧
```ts
//最简应用 在koa78目录下
npm start
//然后 即可访问api
http://localhost:88/Api7822/Test78/test
```

## Demo 增删查改
1. 建好表testdb
2. 建好数据字典
3. 发布 (增删查改 排序 分页 筛选 批量新增 等N多常用API就可以直接调用了)
4. http://localhost:88/Api7822/TestMenu/testtb/get 试试效果
5. 具体使用方法见文档

```ts
export default class testtb extends Base78 {
    constructor(ctx: any) {

        super(ctx);
        //this.uidcid = "uid";//默认是cid
        this.tbname = "testtb";

        this.colsImp = [
            //类别   项目   设置值
            "kind", "item", "data"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    } 
}
```

## OTHER

you can see test/

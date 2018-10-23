# 广告模块

## 一，系统逻辑关系

广告位逻辑关系从上到下依次为：
- 应用
- 栏目
- 广告位
- 编辑器
- 创意


![alt text](http://wap-qn.bidewu.com/cms/jiaocheng/cmsguanxi.jpg) 

#### 1.1 测试环境
[经纪人平台](http://jingjiren.test.toutiaofangchan.com)

[企业平台](http://corp.test.toutiaofangchan.com)

[城市平台](http://city.test.toutiaofangchan.com)

#### 1.2 预上线环境
[经纪人平台](http://agent.sim.toutiaofangchan.com)

[企业平台](http://corp.sim.toutiaofangchan.com)

[城市平台](http://city.sim.toutiaofangchan.com)


#### 1.3 技术依赖
```
    vue, vue-router, vuex, iview组件库，view-admin模板
    
```
[iview官网](https://www.iviewui.com/)

[iview-admin模板网址](https://github.com/iview/iview-admin)


## 二，项目安装和启动

### 2.1 安装
```bush
// install dependencies
npm install
```
### 2.2 运行
### 2.2.1 调试

#### 经纪人平台
```bush
npm run dev
```

#### 企业平台
```bush
npm run corp
```

#### 城市平台
```bush
npm run city
```

### 2.2.3 发布测试版本
#### 经纪人平台
```bush
npm run build-test
```

#### 企业平台
```bush
npm run build-corp-test
```

#### 城市平台
```bush
npm run build-city-test
```

### 2.2.3 发布线上版本
#### 经纪人平台
```bush
npm run build-pro
```

#### 企业平台
```bush
npm run build-corp-pro
```

#### 城市平台
```bush
npm run build-city-pro
```


## 三，源代码结构
```shell
.
├── build  项目构建配置
└── src
    ├── api     服务器接口
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── agentSystem  经纪人平台 页面/组件
        ├── cityManageSystem  城市平台 页面/组件
        ├── companySystem  企业平台 页面/组件
        ├── countrySystem  全国平台 页面/组件 （暂时未开发）
        ├── error_page  通用错误页面 （一般不需要修改）
        ├── home  首页
        │   └── components  首页组件
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── my_components  业务组件
        └── systemManage  系统管理员 页面/组件
```

## 四.关键问题解释 【必须好好看一遍】


### 一，页面怎么拆分平台

- 问题1，页面组件怎么按平台拆分？

    - views/agentSystem 放"经纪人" 平台相关
    - views/companySystem 放 "企业" 平台相关
    - views/cityManageSystem 放 "城市" 平台相关
    - views/countrySystem 放 "全国" 平台相关
    
- 问题2，不同平台的组件可以互用么？

    `` 请不要这样做，因为你可能无意间修改了其他平台的组件，造成其他平台异常  ``


### 二，路由怎么拆分平台

- 路由文件拆分：

```shell
.
└── src
    └── router  路由配置
          └── split  
                ├── jinjiren.router.js  经纪人平台路由
                └── corp.router.js  企业平台路由

```

- 路由文件约定，每个路由文件中必须包含的变量
    - loginRouter (object) 登录页路由
    - homeRouter (object) 首页路由
    - appRouter （数组类型） 菜单路由集合
    - otherRouter (数组类型) 无菜单路由集合







## 路由和权限 【极其重要】
### 一，路由的name定义是否可以随意改动？


` 路由定义的name属性是不能随意更改的，因为当前系统对权限的校验是以路由name为基础的，一旦变更会导致曾经有权限的用户访问不了变更后的路由。`


### 二，本系统扩展的路由元信息
- 每个路由的定义中都可以定义 `meta`属性，meta是一个object类型。
    - meta 自身属性
        - requireAuth (boolean类型) 是否需要权限校验   【默认 true】
        - keepalive (boolean类型) 是否开启vue的页面级keep-alive能力 【默认 false】
        - multipage (boolean类型) 是否开启多页模式。 【默认 false】
        - requireLogin (boolean类型) 是否需要登录校验 【默认 true】
    ```
    几个属性会在后面详细解释
    ```

#### requireLogin 登录校验
>`此注解极少被使用`，因为系统绝大部分页面都是登录后才能使用的。
>只有极个别情况才不需要登录，如：注册页。此时可通过`meta.requireLogin=false`，将登录验证忽略


#### requireAuth 页面和功能权限

- 本系统的权限控制是怎么实现的，和路由的定义有什么关系？

```
系统权限控制是通过vue-router的导航守卫控制的。
1，登录验证：
    每次路由发生变更，首先检查是否已经登录，如果未登录直接跳登录页
2，菜单级权限校验：
    每次路由发生变更
        1），首先检查是否已经从服务器获取了用户的功能权限，没有就获取一次
        2），检查$route的定义中是否设置了meta.requireAuth=false，如果设置了，直接跳过后面所有环节。
        3），检查$route.name是否在用户的功能权限数组中，检查失败就直接403页面
            
```     
     
     
#### keepalive

>用户在不同页面间切换，我们经常遇到这样的需求，当用户切换回来时，页面应该显示成离开时的状态。
>例如：
>用户在列表页A进行了查询和分页，浏览到了第5页，此时用户点击了详情页，进入详情页B，当用户再切换回到A页面时，A页面页面应该是第5页，并且查询条件不变。


怎么解决这个问题呢？
>本项目对这个机制进行了调整，实现了路由级别的缓存。只要在路由`meta.keepalive=true`系统自动会缓存页面。

- 通过路由来觉得页面是否采用缓存机制，只要在路由`meta.keepalive=true`，此路由打开的页面组件自动会被缓存

```
号外：本项目的缓存机制是通过模仿keep-alive组件，自己实现了一个叫navigation的组件。只不过这个组件与tab页签、路由定义进行了强绑定，其他项目最好不要直接使用
```

#### multipage 多tab模式

下图可以看到系统有一个tab导航：
`默认情况下，每个路由只能打开一个tab页`
![alt text](src/images/readme.jpg)  


- 如果你想让一类页面可以打开多个，比如：可以同时打开多个房源详情页。可以通过设置路由`meta.multipage=true`来打开此功能。

`重要提示：`
```
 vue-router对同一个路由再打开同一个路由的时候不一定生效，尤其是使用params的时候，你可以通过传递一个query时间戳来跨国此问题。
举例:
    你从房源详情页想再打开一个房源详情页，由于路由的name相同，而你又是通过params传递参数，你会发现没反应。
    这并不是代码的bug，而是vue-router不认为这需要页面切换，所以不会触发导航守卫。
    你可以传递一个query._=new Date().getTime()，即可解决这个问题。
```


## 用户强制刷新页面会对keepalive和multipage产生什么影响？

- 所以的keepalive缓存会丢失，页面重新加载
- multipage的页签会全部丢失，只能留下当前页面

```
为了实现keepalive和multipage，我做了这个刷新的取舍，不然会出现各种冲突。
```


## 怎么关闭当前页并跳转？

- 由于系统是一个单页面应用，所以想关闭当前页就必须提供将要打开的新页面路由。为此系统给页面组件提供了两个方法，以供关闭当前页使用：
- ``1，两个方法都是组件内置方法``
- ``2，两个方法的使用方式与router.push一摸一样``


### $closePageAndActiveRouter (推荐)
>关闭当前页面，清除当前页的keepalive缓存，并跳转到新页面，本方法以尽量激活新页面为目的，如：
- 1，如果新页面在缓存中，只是激活缓存，触发新页面的activated事件
- 2，如果新页面没在缓存中，重新打开新页面，触发新页面的created事件
- 3，新页面如果已经存在打开的多个，那么新页面重新创建一个新的，触发新页面的created事件
> 推荐这个方法，因为这样逻辑比较简单，对已经打开的其他页面没用影响，只需在activated事件和created事件调用同样的逻辑即可

```javascript
this.$closePageAndActiveRouter({"name":"新页面路由名称"});
```

### $closePageAndRecreateRouter (不推荐)
>关闭当前页面，清除当前页的keepalive缓存，并跳转到新页面，`本方法将把与新页面路由名称相同的已开页面全部关闭`，然后重新打开一个新页面，如：
- 1,关闭新页面路由关联的所有已打开页面，并清空这些页面的缓存
- 2，重新打开新页面，触发新页面的created事件
- ``由于本方法会关闭所有与新路由名称相同的已开页面，所以用起来请谨慎``

```javascript
this.$closePageAndRecreateRouter({"name":"新页面路由名称"});
```
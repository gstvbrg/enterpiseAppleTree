# Apple Trees
> Web-based Inventory and Transaction Managment Software

#### Table of Contents
+ [Summary](#summary)
+ [Tools](#tools)
+ Features
  + [Login](#login)
  + [New Order](#new-order)
  + [Recent Orders](#recent-orders)

## Summary
This app implements basic requirements for a web-based, inventory management tool. Allowing end users to track fundamental metrics and information related to products, customers, and transactions.

These objects and actors are encapsulated in a custom GraphQL service, through which their individual attributes and interdependent relationships are defined within a type system. 

This [schema](./src/AppleTrees.schema) is then used as input for a GraphQL cloud "Backend-as-a-service", [Graphcool](https://www.graph.cool/), which uses the type system to auto-generate CRUD-like GraphQL operations for a hosted SQL database. The resulting "GraphQL server", comprised of the base queries and mutations that can be made against the custom type system, becomes the API upon which the application is built.

This method of API generation is ideal for rapid prototyping, as the API can be easily  iterated on by making changes to the underlying GraphQL service schema.

In conjunction with "GraphQL client" libraries, which provide network configuration, caching, and frontend framework bindings; this development strategy provides a robust set of tools that enable "full-stack" development unified through GraphQL and unimpeded by laborious devOps requirements. 

## Tools

#### Frameworks
+ React
+ React Router
+ [Apollo Client - React](https://www.apollographql.com/docs/react/) (suite of GraphQL client tooling built on Redux)
+ [Semantic UI React](https://react.semantic-ui.com/introduction) 
+ [Graphcool](https://www.graph.cool/docs/) (managed GraphQL server platform)

#### Utilities
+ [create-react-app](https://github.com/facebookincubator/create-react-app)
+ [Immutable.js](https://facebook.github.io/immutable-js/)
+ [Moment.js](https://momentjs.com/)
+ [React-DatePicker](https://hacker0x01.github.io/react-datepicker/)

## Login
![](https://i.imgur.com/xarWuBE.gif)
+ [Login Component](./src/components/login/Login.js)
  + Token persisted in localStorage
  + Requests authorized through Apollo Client middleware
  + RegEx validated input 

## New Order <a id="new-order"></a>
![](https://i.imgur.com/BifvAKW.gif)
+ [New Order Components](./src/components/orders/) \( [root](./src/components/orders/) -> [NewOrder.js](./src/components/orders/NewOrder.js)\)
  + Shared state through nested, controlled components
  + Date and time managed with [Moment.js](https://momentjs.com/) and [React-DatePicker](https://hacker0x01.github.io/react-datepicker/)
  + Shopping Cart modeled with [Immutable.js List](https://facebook.github.io/immutable-js/docs/#/List)

## Recent Orders <a id="recent-orders"></a>
![](https://i.imgur.com/GHsH8eu.gif)
+ [Order History Components](./src/components/orders/) \( [Orders.js](./src/components/orders/Orders.js) -> [DesktopOrderHistory.js](./src/components/orders/DesktopOrderHistory.js) || [MobileOrderHistory.js](./src/components/orders/MobileOrderHistory.js)\)

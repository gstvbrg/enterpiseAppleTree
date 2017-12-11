# Apple Trees
> Web-based Inventory and Transaction Managment Software

#### Table of Contents
+ [Overview](#overview)
+ [Tools](#tools)
+ Features
  + [Login](#login)
  + [New Order](#new-order)
  + [Recent Orders](#recent-orders)

## Overview
This app implements basic requirements for a web-based, inventory management tool. Allowing end users to track fundamental metrics and information related to products, customers, and transactions.

These objects and actors are encapsulated in a custom GraphQL service; which helps define a strict type system for these abstractions, around which custom interfaces for querying and mututating the data can be easily created using plain javascript. 

These CRUD-like operations can be auto-generated from the [schema](./src/AppleTrees.schema) and linked to a hosted SQL database with  "Backend-as-a-service" tools like [Graphcool](https://www.graph.cool/) or [AWS App Sync](https://aws.amazon.com/appsync/). The resulting "GraphQL server" becomes an API which can be consumed by web clients, and is opitmized for light-weight networking and relationship rich data. 

This method of API generation is ideal for rapid prototyping, as the API can be quickly iterated on through changes to the underlying schema. Fuerthermore the interface abstracts away the database access layer, allowing for future infrustruture changes and integreations that will not easily break exsisting code.   

In conjunction with "GraphQL client" libraries, which provide networking configuration, data caching, and frontend framework bindings; this development strategy provides a robust set of tools that enable "full-stack" development unified through GraphQL and unimpeded by laborious devOps requirements. 

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

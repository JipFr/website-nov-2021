---
title: Kleurtj.es
description: kleurtj.es is an easy to way store, share, and copy colors. It even has collaboration tools for sharing palettes!
color: '#3d6a7b'
date: 24 may 2020
icon: /assets/empty.png
icon-background: '#3d6a7b'
tech: Web, Node.js, MongoDB
---

This project is a remake of an older site I built before. I was not satisfied with that site, since it had various UX issues, so I built this.

On this site you can create color palettes and store colors online. You can share the link to your palette, add other people to the palette and give them write access for easy collaboration, and left-click a color to copy its value.

The website also has a dashboard where only select palettes show up. These palettes can be taken from any user, having the dashboard serve as a collection spot for your current project. The dashboard is the default page, so going to https://kleurtj.es/jip will lead you to my dashboard.

There are also collections. If you are an administrator in a collection, you can add any palette to it. A collection can have a theme color, a title, and a description. It will show up on your profile under "collections". A collection URL looks like the following: https://kleurtj.es/c/hrm/

The site also has some useful redirects in place. The default URL for a profile is https://kleurtj.es/u/jip/, however going to https://kleurtj.es/jip will redirect you. The same applies to palette-specific URLs. It normally looks like https://kleurtj.es/u/jip/hrm-dark/, however https://kleurtj.es/jip/hrm-dark works as well.

This project is built using Node.js, with MongoDB as a database. Express is used as the web server, using express-handlebars as the view engine.

The project's source code is available on [GitHub](https://github.com/jipfr/colors-new), with a live version of the project at [kleurtj.es](https://kleurtj.es/jip)

![Jip's dashboard](https://raw.githubusercontent.com/JipFr/jipfr/master/projects/kleurtjes.png)
![Marijn's dashboard](https://raw.githubusercontent.com/JipFr/jipfr/master/projects/kleurtjes-3.png)
![Jip's collections](https://raw.githubusercontent.com/JipFr/jipfr/master/projects/kleurtjes-1.png)
![Collection for the "connect" website](https://raw.githubusercontent.com/JipFr/jipfr/master/projects/kleurtjes-2.png)

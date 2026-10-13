# GAME HUB
Game Hub is an online game store where visitors can explore games, view information about selected titles, and add games to their shopping cart.

Visitors can also filter games by genre or search for a specific game.

This project was created using HTML, CSS, JavaScript, and an API as part of my Front-End Development studies at Noroff.

## Live Site

[View Live Site](https://theresecamk.github.io/game-hub-js/)
[View Code on GitHub](https://github.com/ThereseCamK/game-hub-js)

## About the project

Game Hub JavaScript focuses more on JavaScript functionality and API integration than on visual design.

The goal was to create an online game store where visitors can explore different games, click on a game thumbnail to read more about it, and add games to their shopping cart.

Users can update their cart by increasing or decreasing product quantities or removing individual products. They can also view a summary of the total price.

The colors were kept simple because functionality was the main priority.




## Features

### Homepage

Two carousels that scroll automatically.

Visitors can also navigate to a specific slide by clicking the navigation dots.

One carousel displays new releases, while the other displays games on sale.

### Games Page

Filter by genre

Search for a spesific game

Game thumbnails and cards displaying the available games.

Sale badges, genres, and prices.

Options to add games to the shopping cart.

The ability to select a game and view more information about that specific title.


### Cart

View the products in the shopping cart.

Increase or decrease product quantities.

Remove individual products.

View the total price.

Continue to checkout, where users must enter shipping and payment information before confirming their purchase.



## Built with

HTML5
CSS3
Vanilla JavaScript
API integration
GitHub Pages

## Design 

Visual design was not the main priority for this project, so I focused more on functionality than appearance.

However, the website is responsive and designed to work on mobile devices, tablets, and desktop screens.

## Clone the repository

1. git clone: https://github.com/ThereseCamK/game-hub-js
2. Open the project folder in your preferred code editor.
3. Run the project using Live Server or another local development server.

No additional dependecies or installation steps are required.

## improvement done since first delivered

I added a new function in appController to check whether the shopping cart is empty.

This function is used in the checkout, confirmation, payment, and shipping views. If the cart is empty, the user is redirected to the cart page, which displays a message explaining that the cart is empty.

Since the cart data is not stored in localStorage, refreshing the browser can cause the cart to become empty. With this improvement, users cannot continue through the checkout process if their cart is empty.

I also removed unused files from the project.

## Future Improvements
If I had more time, I would focus more on the visual design to make the website more appealing.

I would also implement localStorage so that users could refresh their browsers without losing the contents of their shopping carts.

## Author

Therese Camilla Nordnes
[Github ](https://github.com/ThereseCamK)
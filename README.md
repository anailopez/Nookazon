# Welcome to Nookazon!

Nookazon is an Animal Crossing-themed Amazon clone. Users can log in to purchase items from the popular video game Animal Crossing, including furniture and clothes from the game, as well as leave reviews for said items. Nookazon utilizes Flask on the backend, with React and Redux on the frontend.

View the live site here: https://nookazon-amylopez.herokuapp.com/

## Instructions on how to install and run Nookazon
After cloning Nookazon into your desired directory:
* In the root directory, run 'pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt' to install dependencies
* Cd into the 'react-app' directory and run 'npm install' to install dependencies
* In the root directory, and create an '.env' file based off of the example provided in the '.env.example' file
* To set up the database:
> * Run the command 'pipenv shell' to open the virtual environment
> * In the root directory, run 'flask db upgrade' to create the database
> * In the root directory, run 'flask db seed all' to add all models and seeders into your database
* To run the app in development mode: 
> * In one terminal, in the root directory run the command 'flask run'
> * In another terminal, cd into the frontend directory 'react-app' and run the command 'npm start'
> * With both terminals running, navigate to 'localhost:3000'. Congrats, you've successfully installed and ran Nookazon!


## View Nookazon's:
* [Database Schema](https://github.com/anailopez/Nookazon/wiki/Database-Schema)
* [Feature List](https://github.com/anailopez/Nookazon/wiki/MVP-Feature-List)
* [User Stories](https://github.com/anailopez/Nookazon/wiki/User-Stories)
* [Wireframes](https://github.com/anailopez/Nookazon/wiki/Wireframes)


## Technologies Used
Nookazon utilizes the following technologies:
* **Backend: Flask**
* **Frontend: React/Redux and JavaScript/JSX**
* **Database: SQLAlchemy**
* **Design/Styling: HTML and CSS**
* **Hosting: Docker/Heroku**


## Landing/Home Page
Upon first navigating to Nookazon, a user is greeted with the landing page, from which they are able to log in, sign up, or view any item. While a user if able to view any item while logged in, a user will be prompted to log in or sign up before they are able to leave a review or add that item to their cart.

![landing](https://user-images.githubusercontent.com/96565654/184577646-d172a413-6886-4f22-b994-58320573ffa7.png)


## Log In Page
On the '/login' page, a user is presented with a form in which they can enter the email and password associated with their Nookazon. Upon successful submission of the form, the user will be logged in and redirected to the '/' home page. If a user does not currently have a Nookazon, they have the option to click the 'Create your Nookazon account' and be taken to the '/signup' page, or they can choose to try out Nookazon as the demo user.

![login](https://user-images.githubusercontent.com/96565654/184574212-38e46a16-2406-43fe-8975-4f61f2d36eec.png)


## Sign up Page
On the '/signup' page, a user is presented with a form in which they can enter their desired username, icon URL, email, street address, town or island name, last four digits of their payment method, and their desired password. Upon successful submission of the form, the user will be logged in and redirected to the '/' homepage. If the user already has an existing Nookazon account, they have the option to click the 'Log In' button, which will redirect them to the '/login' page. The user also has the option to try out Nookazon as the demo user by clicking the 'Demo User Login' button.

![signup](https://user-images.githubusercontent.com/96565654/184574400-b56bdd30-0305-4f0b-a362-d1e554d4fb1a.png)


## Individual Item Page
On the '/items/:itemId' individual item page, logged-in users can add the item in their desired quantity to their cart, as well as leave a review on the item's page, if they have not previously done so. Once a user leaves a review, they have the option to edit or delete their review from this page.

![single-item](https://user-images.githubusercontent.com/96565654/184574716-cd10351b-8fd1-4c82-8155-dd59e7045800.png)


## Create a Review Page
When a logged-in user clicks the 'Write a customer review' button from the individual item page, they are redirected to the '/create-review/:itemId' page, on which they are presented with a form that allows them to give the item a rating from 1 to 5, a headline for the review, and a body for the review. Upon successful submission of the form, the user is redirected to that specific item's page, on which they can see their newly-added review under the 'Customer Reviews' section.

![create-review](https://user-images.githubusercontent.com/96565654/184574908-9115a521-710b-4272-9707-58505cf4984b.png)


# Shopping Cart Page
When a logged-in user clicks on the shopping cart icon in the navbar, they are taken to the '/cart' page, on which they can see all of the items they have added to their cart. From this page, the user can update the quantity on each of the items, as well as delete an item from their cart. If the user clicks the 'Proceed to Checkout' button, they will be redirectred to the '/checkout' page.

![shopping-cart](https://user-images.githubusercontent.com/96565654/184576160-0fb5f17d-3a5a-4e10-a4bc-fc164e4f4cfe.png)


## Checkout Page
When a logged-in user clicks the 'Proceed to Checkout' button, they are taken to the '/checkout' page, on which they will see a summary of their chosen items and their quantities, along with the user's shipping and payment information. Once the user fills out their desired delivery instructions and clicks the 'Place your Order' button, their order will be placed and they'll be redirect to their '/orders' page.

![checkout](https://user-images.githubusercontent.com/96565654/184576764-aaed23ae-327f-4479-809a-d2078e306124.png)


## Your Orders Page
On the '/orders' page, a logged-in user can see all of their previously placed orders along will information about each order, such as items, when the order was placed, and the order's delivery date. The user has the option to delete any of these orders, as well as view the details for a specific order by clicking the 'View Order Details' button. From this page, a user may also write a review for any item in their orders.

![your-orders](https://user-images.githubusercontent.com/96565654/184576913-415c02ab-a500-42db-9ebc-3c7c03efafce.png)

## Individual Order Details Page
When a logged-in user clicks the 'View Order Details' button from their '/orders' page, they will be redirected to the '/order-details/:orderId' page, on which they can view the details of that specific order, as well as edit the delivery instructions for that order. From this page, the user may also write a review for any item in that order, as well as click 'But it again' on an item and be taken to that item's page.

![order-details](https://user-images.githubusercontent.com/96565654/184580629-a5e5917a-cc35-4f32-aa4c-a075e2c085bd.png)


## Technical Implementation Details
In order to implement Nookazon's shopping cart, localStorage was used. Each user has a cart in localStorage, whose key is that user's user id and whose value is the items the user has added to their cart. In order for a user to add an item to the cart, update an item's quantity in the cart, or delete an item from the cart, localStorage is manipulated from within dedicated functions:

```
 const addItemToCart = (item, quantity) => {
        let cartCopy = [...cart];

        let existingItem = cartCopy.find(cartItem => cartItem.item.id === item.id)

        if (!existingItem) {
            cartCopy.push({ 'item': item, 'quantity': quantity })
            alert('Item added to cart!')
        } else {
            existingItem.quantity = quantity
            alert('Item quantity in cart updated!')
        }

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
        dispatch(thunkGetCartProducts(cartCopy))
    }
```
```
const removeItem = (itemId) => {
        let cartCopy = [...cart];

        cartCopy = cartCopy.filter(cartItem => cartItem.item.id !== itemId);

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
    }
```

## Future Features
> * Search Bar
> * Categories
> * Star ratings

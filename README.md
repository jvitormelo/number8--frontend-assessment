# Install

I recommend using node version v20.9.0 or higher and Yarn as package manager.

```
yarn install
```

# Run

- Dev

```
yarn dev
```

- Build & Production

```
yarn build
yarn start
```

# Automated Tests

Run unit tests

```
yarn test:unit
```

Run component tests

```
yarn test:components
```

# How to Test the Application

I really recommend building the application and running it in production mode. (yarn start)

# Technical Decisions

- I didn't understand if it was to fetch the URL to get the JSON or copy into the project, so i went with the easiest way.
- I used Next.js because i want to have SSR and SSG out of the box. I felt that for this project would be better, I got to pre-render the real estate page and have a better first load time.
- I went full server side to "fetch" the data (but I'm also really good with client side fetching, <3 tanstack query).
- I used a component library called MantineUi to help me in development speed.
- I could used Context to avoid some props drilling, but i didn't want to over engineer the solution.
- I did some simple tests. Used Vitest to do unit Test, and Cypress to do component tests (Yes, you can use cypress to do component tests, and it's really good)
- The structure folder is more focused on the feature and code locality.
- I used Yup + React Hook Form to handle the form, just because I like schema based forms.
- I went with a really simple design, mostly following the example.
- I added a simple responsive design, but I didn't go full mobile first.

# Bonus

- I added one more feature, if you favorite a real estate, it will show in the card in the list page.

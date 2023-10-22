# Blog API Project Instructions

## **Total Marks: 10**

### Running the Server

1. Start the server on **PORT 8090**. Ensure strict adherence to this port number.

---

## Project Overview

You are tasked with building an API for a Blog. The project should include the following features:

- CRUD operations performed by the admin.
- Adding comments and likes by the user only.

---

## Follow these instructions strictly

---

## Implement in MVC Structure

### Database Connection

1. Create a 'config' folder. Inside this folder, create a file named 'db.js'. Write logic to connect to MongoDB using an online database such as MongoDB Atlas.

---

### Database Schema Design

#### User Schema Design

2. Create a 'Models' folder.
   - Inside this folder, create a file named 'user.schema.js' with the following schema:

```js
{
  username,
  password,
  email,
  role: {
    type: String,
    enum: ["user", "admin"], // Define allowed roles
    default: "user", // Default role is 'user'
  }
}
```

#### Blog Schema Design

3. Create a new file inside the 'Models' folder named 'Blog.schema.js':

```js
{
  title: String,
  content: String,
  image: String,
  author: String,
  category:String,
  likedBy: [{ username: String }],
  comments: [{
      text: String,
      username: String,
      date: { type: Date, default: Date.now } }]
}
```

---

<!-- signup -->

## Sign Up and Login

### Sign Up - POST route

- **Endpoint**: Create a POST route at `/user/signup`.
- send in response only username how signed up =
- suppose {username:testingUser , email:testing@gmail.com} trying to sign up if it already exists check by email then send in response `testingUser` if not exits then create user then send `Account created successfully [username]`where `[username]` is replaced with the actual username of the user who created in.
- **Front-end Page**: Create a sign-up page using EJS, and make a GET route at `/user/signup` to render this page.

#### Form Setup

1. Create an HTML form with the ID `form` for user sign-up.

2. Within the form, provide the following input fields with corresponding IDs:
   - `username` (ID: `username`)
   - `password` (ID: `password`)
   - `email` (ID: `email`)
   - `role` (ID: `role`) : - it should be dropdown

<!-- login -->

### Login - POST route

- Create a POST route named `/user/login`.
- Create a login page using EJS.
- Create a GET route at `/user/login`.
- Take email and password as input for the login.
- Create an HTML form with the ID `form` for user log in.
- Within the form, provide the following input fields with corresponding IDs:

  - `password` (ID: `password`)
  - `email` (ID: `email`)

- After successful login, send a message that says `Welcome User [username]`, where `[username]` is replaced with the actual username of the user who logged in.
- After a successful login, set cookies in the browser with the user's `role` and `id`.

<!-- error handle -->

#### Handle Incorrect Email or Password

- If the email or password provided during login is incorrect, display a message on the login page indicating `Invalid Credentials.`

<!-- ### Delete user

- Make sure that you can delete users from your application by adding an endpoint called `DELETE /users/:id` -
- send response `user deleted [username]`where `[username]` is replaced with the actual username of the user who deleted.
--- -->

## Blog

## Create a Blog Post Form

1. **POST Route for Blog Creation:** Begin by creating a POST route with the path `/blog/create`. This route will handle the creation of new blog posts.

2. **Create a Blog Post Form Using EJS:** Develop a blog post creation form using EJS. Configure a GET route at `/blog/create` to render this form.

3. **Collect User Input:** The form should collect input for the following fields:

- form (ID `blogForm`)
- Title (ID: `title`)
- Content (ID: `content`)
- category (ID:`category`)
- Image (ID: `image`)

4. **Set Author's Name:** Retrieve the author's name from cookies.

- make middleware to check title and content image, category are coming or not if not then send (`All fields are required`)

# - do not use required in form

5. **Authorization Check:** Before rendering the form, perform an authorization check. If a regular user is logged in and not an admin, show a message such as `You are not authorized to access this page.` and prevent them from accessing the form. you can use cookies to verify

- admin can not add comments and like to any blogs

6. **Admins:** (admins) can add new blog posts. Include authorization

- after send adding blog send response (`blog created by [adminname]`) where `[adminname]` is replaced with the actual adminname
- set that blog id in cookies give name `blogId`

# GET route - Fetch and Render All Blogs

1. Create a GET route at `/blog/blogs`.
2. send a response containing all available blogs.

## Render the Blog Page

1. Create a GET route at `/blog/`.
2. Set up this route to render your blog page.
3. Display all blogs on the page.
4. make a proper navbar and add path and include in all page

## Blog Page Structure

1. Create a div with the ID `parent-box`.

   - Inside this div, append all blogs in separate divs with the class `list`.

2. For each blog entry, include the following elements within the `list` div:
   - An image tag with the class `img` to display the blog's image.
   - A paragraph (p) tag with the class `title` to display the blog's title.

### DELETE route

- Create a DELETE route named `/blog/delete/:id`.
- Only admins can delete.

### PATCH route

- Create a PATCH route named `/blog/edit/:id`.
- Send all data after editing blogs.
- Only admins can edit.

<!-- single blog page  -->

### GET Route with ID

1. Create a GET route at `/blog/singleBlog/:id`.
2. Send a single blog by its ID.
3. Use EJS to send and render that blog. Hint:
   ```js
   res.render("singleBlogPage", { singleBlog });
   ```

When a user clicks on a single blog from the page that displays all blogs, the single blog page should be shown. This page should have the following HTML structure:

- `div` with `id=blog`.
- `img` tag with `id=img` to display the blog's image.
- `h3` tag for the title with `id=title`.
- `span` tag for the category with `id=category`.
- `p` tag for the content with `id=content`.
- `button` for like `id=like`
- `span` for displaying number of like `id=count`
- `form` make form for adding comment `id=comment`

### Make PATCH route

- Route name `/blog/like/:id`
- login or signup required for like
- pass blog id
- Add a like to the database with the username
- use cookies to set username
- that admin can not like there own blog
- Send that blog

### Make PATCH route

- Route name `/blog/comment/:id`
- pass blog id
- login or signup required for comment
- Add comments to the database with username and text
- use cookies to set username
- Send that blog

---

---

```js
## Testing Your Score

1. Navigate to the 'test' directory using `cd test`.
2. Run 'npm i' to install dependencies. If you encounter any errors during installation, you can use the following command: `./node_modules/.bin/cypress install`.
3. Run tests using either `npx cypress open` or `npx cypress run`.

**Best of Luck!**
```

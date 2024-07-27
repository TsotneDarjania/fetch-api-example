console.log("working...");

// Global Variables
const menuIterfaceElements = {
  getAllBlogsButton: document.getElementById("getBlogs"),
  getSingleBlogButton: document.getElementById("getSingleBlog"),
  createBlogButton: document.getElementById("createNewBlog"),
  deleteBlogButton: document.getElementById("deleteBlog"),
  clearButton: document.getElementById("clear"),
};

const screen = document.getElementById("screen");

class Renderer {
  renderAllBlogs(blogs) {
    screen.innerHTML = "";
    blogs.forEach((blog) => {
      screen.innerHTML += `
        <div class="blog-row">
          <h1>${blog.title}</h1>
          <p>${blog.content}</p>
        </div>
      `;
    });
  }

  clearScreen() {
    screen.innerHTML = "";
  }
}

class EventListenerManager {
  constructor() {
    this.init();
  }

  init() {
    this.addEvenetListenersForMenuInterface();
  }

  addEvenetListenersForMenuInterface() {
    // Create New Blog
    menuIterfaceElements.createBlogButton.addEventListener("click", () => {
      menuInterface.createNewBlog();
    });

    // Get All Blogs
    menuIterfaceElements.getAllBlogsButton.addEventListener("click", () => {
      menuInterface.getAllBlogs();
    });

    // Get Single Blog
    menuIterfaceElements.getSingleBlogButton.addEventListener("click", () => {
      menuInterface.getSingleBlog();
    });

    // Delete Blog
    menuIterfaceElements.deleteBlogButton.addEventListener("click", () => {
      menuInterface.deleteBlog();
    });

    // Clear
    menuIterfaceElements.clearButton.addEventListener("click", () => {
      renderer.clearScreen();
    });
  }
}

class MenuInterface {
  createNewBlog() {}

  getAllBlogs() {
    fetch("http://localhost:3001/api/blogs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        renderer.renderAllBlogs(data);
      });
  }

  createNewBlog() {}

  deleteBlog() {}
}

// Initialize
const renderer = new Renderer();
const eventListenerManager = new EventListenerManager();
const menuInterface = new MenuInterface();

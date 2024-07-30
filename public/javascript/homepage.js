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

  renderSingleBlog(blog) {
    screen.innerHTML = "";
    screen.innerHTML += `
        <div class="blog-row">
          <h1>${blog.title}</h1>
          <p>${blog.content}</p>
        </div>
      `;
  }

  renderNewBlog(blog) {
    screen.innerHTML = "";
    screen.innerHTML += `
        <div class="blog-row">
          <h1>${blog.title}</h1>
          <p>${blog.content}</p>
        </div>
      `;
  }

  renderStatusMessage(ok, status, statusText) {
    screen.innerHTML = "";
    screen.innerHTML = `
      <div class="status-message">
        <h1>Ok: ${ok}</h1>
        <h2>Status: ${status}</h2>
        <p>StatusText: ${statusText}</p>
      </div>
    `;
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
   createNewBlog() {
    const id = prompt("Enter the ID of the blog:");
    const title = prompt("Enter the title of the blog:");
    const content = prompt("Enter the content of the blog:");

    if (id && title && content) {
      const newBlog = { id, title, content };

        fetch("http://localhost:3001/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newBlog)
        })
        .then(response => {
          renderer.renderStatusMessage(response.status, response.statusText);
          return response.json();
        })
        .then(data => {
          renderer.renderNewBlog(data); 
        })
      }
  }

  getAllBlogs() {
    fetch("http://localhost:3001/api/blogs")
      .then((response) => {
        renderer.renderStatusMessage(response.ok, response.status, response.statusText);
        return response.json();
      })
      .then((data) => {
        renderer.renderAllBlogs(data);
      })
  }

  getSingleBlog() {
    const id = prompt("Enter the ID of the blog to show:");

    if (id) {
      fetch(`http://localhost:3001/api/blogs/${id}`)
        .then((response) => {
          renderer.renderStatusMessage(response.ok, response.status, response.statusText);
          return response.json();
      })
      .then((data) => {
        renderer.renderSingleBlog(data)
      })
    }
  }

  deleteBlog() {
    screen.innerHTML = "";
    const id = prompt("Enter the ID of the blog to delete:");
    if(id) {
      fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: "DELETE"
      })
      .then(response => {
        renderer.renderStatusMessage(response.ok, response.status, response.statusText);
      })
      
    }
  }
}

// Initialize
const renderer = new Renderer();
const eventListenerManager = new EventListenerManager();
const menuInterface = new MenuInterface();
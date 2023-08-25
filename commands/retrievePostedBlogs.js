const fs = require("fs").promises;

async function retrievePostedBlogs() {
  try {
    // Load already posted blogs from the file
    const postedBlogs = JSON.parse(
      await fs.readFile("postedBlogs.json", "utf-8")
    );
    return postedBlogs;
  } catch (error) {
    console.error("Error retrieving posted blogs:", error);
    return [];
  }
}

module.exports = retrievePostedBlogs;

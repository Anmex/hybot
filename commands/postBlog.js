const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs").promises;

async function postBlog(message) {
  try {
    const response = await axios.get(
      "https://hytale.com/api/blog/post/published"
    );
    const articles = response.data;

    // Load already posted blogs from the file
    const postedBlogs = JSON.parse(
      await fs.readFile("postedBlogs.json", "utf-8")
    );

    // Reverse the articles array to post the most recent last
    articles.reverse();

    for (const article of articles) {
      const articleUrl = `https://hytale.com/news/${article["publishedAt"]
        .slice(0, 7)
        .replace(/-/g, "/")}/${article["slug"]}`;

      // Check if the article has already been posted
      if (postedBlogs.includes(articleUrl)) continue;

      const embed = new EmbedBuilder()
        .setColor(0xfcbb02)
        .setTitle(article["title"])
        .setThumbnail("https://hytale.com/static/images/logo.png")
        .setAuthor({
          name: article["author"],
          iconURL: "https://hytale.com/static/images/logo-h.png",
          url: "https://hytale.com",
        })
        .setFooter({
          text: "I'm not affiliated with Hytale or Hypixel Studio.",
          iconURL: "https://hytale.com/static/images/logo-h.png",
        })
        .setURL(articleUrl)
        .setDescription(article["bodyExcerpt"])
        .setImage(`https://cdn.hytale.com/${article["coverImage"]["s3Key"]}`)
        .setTimestamp(new Date(article["publishedAt"]));

      await message.channel.send({ embeds: [embed] });

      // Add the posted blog URL to the array and save it to the file
      postedBlogs.push(articleUrl);
      await fs.writeFile(
        "postedBlogs.json",
        JSON.stringify(postedBlogs, null, 2)
      );
    }
  } catch (error) {
    console.error("Error fetching or processing blog post:", error);
  }
}

module.exports = postBlog;

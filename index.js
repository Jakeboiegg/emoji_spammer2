import { emoji_spam_generator } from "./emoji_generator.js";

var amount_to_spam = 108
var emoji_list = ["🔥", "🥰", "🌈", "✨", "💅", "✅"];
var emoji_spam = emoji_spam_generator(emoji_list, amount_to_spam);

var title = document.getElementById("title");
var display = document.getElementById("display");

display.innerHTML = emoji_spam;
display.addEventListener("click", function() {
  navigator.clipboard.writeText(emoji_spam);
  title.innerHTML = "press text to copied";
  emoji_spam = emoji_spam_generator(emoji_list, amount_to_spam);
  display.innerHTML = emoji_spam
});

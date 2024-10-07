import {emoji_spam_generator} from "./emoji_generator.js";

var emoji_list = ["🔥", "🥰", "🌈", "✨", "💅", "✅"];
var emoji_spam = emoji_spam_generator(emoji_list,108)

var title = document.getElementById("title")
var display = document.getElementById("display")

display.innerHTML = emoji_spam
display.addEventListener("click",function(){
  navigator.clipboard.writeText(emoji_spam)
  title.innerHTML = "press text to copied"
})


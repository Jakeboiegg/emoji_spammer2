import {emoji_spam_generator} from "./emoji_generator.js";

var emoji_list = ["🔥", "🥰", "🌈", "✨", "💅", "✅"];
var emoji_spam = emoji_spam_generator(emoji_list,60)

var display = document.getElementById("display")

display.innerHTML = emoji_spam
display.addEventListener("click",function(){
  navigator.clipboard.writeText(emoji_spam)
})

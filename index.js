import { emoji_spam_generator } from "./emoji_generator.js";

var amount_to_spam = 12 * 20;
var emoji_list = ["🔥", "🥰", "🌈", "✨", "💅", "✅"];
var emoji_spam = emoji_spam_generator(emoji_list, amount_to_spam);

var title = document.getElementById("title");
var display = document.getElementById("display");

function button_pressed() {
  navigator.clipboard.writeText(emoji_spam);
  title.innerHTML = "press text to copied";
  if (navigator.vibrate) {
    navigator.vibrate([50, 10, 50]);
  }
  emoji_spam = emoji_spam_generator(emoji_list, amount_to_spam);
  display.innerHTML = emoji_spam;
}

display.innerHTML = emoji_spam;
display.addEventListener("mousedown",button_pressed);
display.addEventListener("touchend",button_pressed);

// Register the service worker
if ("serviceWorker" in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener("load", async () => {
    // Try to register the service worker.
    try {
      // Capture the registration for later use, if needed
      let reg;

      // Use ES Module version of our Service Worker in development
      if (import.meta.env?.DEV) {
        reg = await navigator.serviceWorker.register("/service-worker.js", {
          type: "module",
        });
      } else {
        // In production, use the normal service worker registration
        reg = await navigator.serviceWorker.register("/service-worker.js");
      }
    } catch (err) {
      console.log("?? Service worker registration failed: ", err);
    }
  });
}

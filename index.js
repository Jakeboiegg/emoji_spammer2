import { emoji_spam_generator } from "./emoji_generator.js";

var amount_to_spam = 12 * 20;
var emoji_table = [
  { emojies: ["🔥", "🥰", "🌈", "✨", "💅", "✅"], desc: "slayy" },
  { emojies: ["💀"], desc: "skull" },
];
var title = document.getElementById("title");
var display = document.getElementById("display");
var select = document.getElementById("emoji-type");
var selected = "slayy"

function update_emojies(desc) {
  for (emoji_dictionary of emoji_table) {
    if (emoji_dictionary.desc == desc) {
      var emoji_list = emoji_dictionary.emojies
      break
    }
  }
  var emoji_spam = emoji_spam_generator(emoji_list, amount_to_spam)
  display.innerHTML = emoji_spam
}

// initially,
update_emojies(selected)

for (var emoji_dictionary of emoji_table) {
  var option = document.createElement("option");
  var emoji_text = emoji_dictionary.emojies.join("");
  option.text = emoji_text;
  option.value = emoji_dictionary.desc;
  select.add(option);
}

// after, initialise:
display.addEventListener("click", function() {
  navigator.clipboard.writeText(display.innerHTML);
  title.innerHTML = "press text to copied";
  update_emojies(selected)
});

select.addEventListener("change", function(){
  selected = select.value
  update_emojies(selected)
})

//select.addEventListener("change", function() {
//  var desc = select.value
//  for (emoji_dictionary of emoji_table) {
//    if (desc == emoji_dictionary.desc) {
//      emoji_spam = emoji_spam_generator()
//    }
//  }
//});


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

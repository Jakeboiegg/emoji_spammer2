import { emoji_spam_generator } from "./emoji_generator.js";
import { split_emoji_string } from "./emoji_splitter.js";

var amount_to_spam = 12 * 20;
var emoji_table = [
  { emojies: "🔥🥰🌈✨💅✅💯", desc: "slayy" },
  {
    emojies: "🥳🤠😌🤪😜😝😘😛😅",
    desc: "hehe",
  },
  { emojies: "😞😣😓😣😡😠😡😩", desc: "ugrh" },
  { emojies: "🇺🇸🦅🔫", desc: "freedom" },
  { emojies: "🧊🥶", desc: "ice_cold" },
  { emojies: "😭😱🙏", desc: "disappointed" },
  { emojies: "💤🛏️🥱", desc: "light_work" },
  { emojies: "💀", desc: "skull" },
  { emojies: "🗣️", desc: "yapp" },
  { emojies: "💤", desc: "no_reaction" },
  { emojies: "custom", desc: "custom" },
];
var title = document.getElementById("title");
var display = document.getElementById("display");
var select = document.getElementById("emoji-type");
var selected = "slayy";

function update_emojies(desc) {
  for (emoji_dictionary of emoji_table) {
    if (emoji_dictionary.desc == desc) {
      var emoji_list = split_emoji_string(emoji_dictionary.emojies);
      break;
    }
  }
  var emoji_spam = emoji_spam_generator(emoji_list, amount_to_spam);
  display.innerHTML = emoji_spam;
}

// initially,
update_emojies(selected);

// initialise the selection
for (var emoji_dictionary of emoji_table) {
  var option = document.createElement("option");
  var emoji_text = emoji_dictionary.emojies;
  option.text = emoji_text;
  option.value = emoji_dictionary.desc;
  select.add(option);
}

// after, initialise:
display.addEventListener("click", function() {
  navigator.clipboard.writeText(display.innerHTML);
  title.innerHTML = "press text to copied";
  update_emojies(selected);
});

select.addEventListener("change", function() {
  selected = select.value;
  if (selected == "custom") {
    var input_textarea = document.createElement("textarea");
    input_textarea.className = "user-custom-emojies";
    input_textarea.id = "user-custom-emojies";
    document.body.appendChild(input_textarea);
  } else {
    var input_textarea = document.getElementById("user-custom-emojies");
    if (input_textarea) {
      input_textarea.remove();
    }
    update_emojies(selected);
  }
});

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

// splits a string of emojies into an array

import emojiRegex from "emoji-regex";

export function split_emoji_string(emoji_string) {
  const regex = emojiRegex();
  const emoji_array = emoji_string.match(regex);
  return emoji_array;
}

export function emoji_spam_generator(list, total_length) {
  function randomint(lowest, highest) {
    var solution = Math.random();
    solution = solution * (highest - lowest + 1);
    solution = Math.floor(solution);
    solution += lowest;
    return solution;
  }

  function choose_random_item(list) {
    var item_index = randomint(0, list.length - 1);
    var item = list[item_index];
    return item;
  }

  var emoji_spam_text = "";
  var character_count = 0;
  while (character_count < total_length) {
    var emoji = choose_random_item(list);
    var spam_amount = randomint(2, 4);
    for (let i = 0; i < spam_amount; i++) {
      emoji_spam_text += emoji;
      // add a "zero width space" for formatting reasons
      emoji_spam_text += "\u200B";
      character_count += 1;
      if (character_count == total_length) {
        break;
      }
    }
  }
  return emoji_spam_text;
}

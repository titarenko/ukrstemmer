// ported from https://www.drupal.org/project/ukstemmer

var VOWEL = /аеиоуюяіїє/; /* http://uk.wikipedia.org/wiki/Голосний_звук */
var PERFECTIVEGROUND = /((ив|ивши|ившись|ыв|ывши|ывшись(в|вши|вшись)))$/;
// var PERFECTIVEGROUND = /((ив|ивши|ившись|ыв|ывши|ывшись((?<=[ая])(в|вши|вшись)))$/;
var REFLEXIVE = /(с[яьи])$/;  // http://uk.wikipedia.org/wiki/Рефлексивне_дієслово
var ADJECTIVE = /(ими|ій|ий|а|е|ова|ове|ів|є|їй|єє|еє|я|ім|ем|им|ім|их|іх|ою|йми|іми|у|ю|ого|ому|ої)$/; //http://uk.wikipedia.org/wiki/Прикметник + http://wapedia.mobi/uk/Прикметник
var PARTICIPLE = /(ий|ого|ому|им|ім|а|ій|у|ою|ій|і|их|йми|их)$/; //http://uk.wikipedia.org/wiki/Дієприкметник
var VERB = /(сь|ся|ив|ать|ять|у|ю|ав|али|учи|ячи|вши|ши|е|ме|ати|яти|є)$/; //http://uk.wikipedia.org/wiki/Дієслово
var NOUN = /(а|ев|ов|е|ями|ами|еи|и|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я|і|ові|ї|ею|єю|ою|є|еві|ем|єм|ів|їв|\'ю)$/; //http://uk.wikipedia.org/wiki/Іменник
var RVRE = /^(.*?[аеиоуюяіїє])(.*)$/;
var DERIVATIONAL = /[^аеиоуюяіїє][аеиоуюяіїє]+[^аеиоуюяіїє]+[аеиоуюяіїє].*сть?$/;
// var DERIVATIONAL = /[^аеиоуюяіїє][аеиоуюяіїє]+[^аеиоуюяіїє]+[аеиоуюяіїє].*(?<=о)сть?$/;

function stem (word) {
	if (word == null || !word.length) {
		return word;
	}
	word = word.toLowerCase();
	var stem = word;
	do {
		var p = word.match(RVRE);
		if (!p) break;
		
		var start = p[1];
		var RV = p[2];
		if (!RV) break;

		// Step 1
		var m = RV.replace(PERFECTIVEGROUND, '');
		if (m === RV) {
			RV = RV.replace(REFLEXIVE, '');
			
			m = RV.replace(ADJECTIVE, '');
			if (m === RV) {
				RV = RV.replace(PARTICIPLE, '');
			} else {
				RV = m;
				m = RV.replace(VERB, '');
				if (m === RV) {
					RV = RV.replace(NOUN, '');
				} else {
					RV = m;
				}
			}
		} else {
			RV = m;
		}

		// Step 2
		RV = RV.replace(/и$/, '');

		// Step 3
		if (DERIVATIONAL.test(RV)) {
			RV = RV.replace(/ость?$/, '');
		}

		// Step 4
		m = RV.replace(/ь$/, '');
		if (m === RV) {
			RV = RV.replace(/ейше?/, '');
			RV = RV.replace(/нн$/, 'н');
		} else {
			RV = m;
		}

		stem = start + RV;
	} while(false);
	return stem;
}

module.exports = stem;

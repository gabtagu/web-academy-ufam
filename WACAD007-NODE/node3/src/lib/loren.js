import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: { min: 3, max: 7 },
  wordsPerSentence: { min: 5, max: 15 },
});

export default function gerarLorem(qtd = 1) {
  return Array.from(
    { length: qtd },
    () => `<br><p>${lorem.generateParagraphs(1)}</p>`
  ).join("\n");
}

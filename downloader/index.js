const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { fileURLToPath } = require('url');

const BASE_URL = "https://api.qurancdn.com/api/qdc/";
const DATA_DIR = "../app/public/data";
const CHAPTERS_FILE = path.join(DATA_DIR, "chapters.json");
const LANGUAGE = "id";

// Remove the data directory if it exists
fs.rmSync(DATA_DIR, { recursive: true, force: true });

// Create the data directory
mkdirp.sync(DATA_DIR);

async function fetchChapters() {
  console.log("Fetching list of chapters...");
  const response = await fetch(`${BASE_URL}/chapters?language=${LANGUAGE}`);
  const chaptersData = await response.json();

  // Save the chapters data
  fs.writeFileSync(CHAPTERS_FILE, JSON.stringify(chaptersData, null, 2));
  return chaptersData.chapters;
}

async function fetchVerses(chapter) {
  const CHAPTER_ID = chapter.id;
  const CHAPTER_NAME = chapter.name_simple;
  const VERSES_COUNT = chapter.verses_count;

  console.log(`Fetching verses for Chapter ID: ${CHAPTER_ID} (${CHAPTER_NAME})...`);
  const response = await fetch(`${BASE_URL}/verses/by_chapter/${CHAPTER_ID}?language=${LANGUAGE}&fields=text_uthmani&translations=33&per_page=${VERSES_COUNT}`);
  const versesData = await response.json();

  const tempVerses = versesData.verses;
  const verses = []

  for (const item of tempVerses) {
    // Regular expression to match the foot_note attribute
    const footnoteRegex = /<sup foot_note=(\d+)>/g;

    // Execute the regex on the text
    const match = item.translations[0].text.matchAll(footnoteRegex);

    const foots = []
    for (const note of match) {
      const foot = await fetchFootNote(note[1])
      foots.push(foot)
    }

    verses.push({
      ...item,
      foot_notes: foots,
    })

  }

  return verses;
}

async function fetchFootNote(id) {
  const response = await fetch(`${BASE_URL}/foot_notes/${id}`)
  return await response.json()
}

async function updateChapterWithVerses(chapter, verses) {
  const SLUG = chapter.slug.slug;
  const updatedChapter = {
    ...chapter,
    verses
  };

  // Save the updated chapter to JSON file
  fs.writeFileSync(path.join(DATA_DIR, `${SLUG}.json`), JSON.stringify(updatedChapter, null, 2));
  console.log(`Saved chapter ${chapter.id} (${chapter.name_simple}) to ${DATA_DIR}/${SLUG}.json`);
}

async function main() {
  const chapters = await fetchChapters();

  for (const chapter of chapters) {
    const verses = await fetchVerses(chapter);
    await updateChapterWithVerses(chapter, verses);
  }

  console.log("All chapters and verses have been fetched and saved.");
}

main().catch(error => {
  console.error("An error occurred:", error);
});

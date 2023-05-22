apt -y install libgif-dev calibre && 
npx honkit build && 
mkdir _book/download/ && 
npx honkit epub &&
mv book.epub _book/download/quran.epub && 
npx honkit mobi &&
mv book.mobi _book/download/quran.mobi && 
npx honkit pdf &&
mv book.pdf _book/download/quran.pdf
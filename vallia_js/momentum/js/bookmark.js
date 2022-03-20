const bookmarkWrap = document.querySelector("#bookmark-wrap");
const bookmarkForm = bookmarkWrap.querySelector("#bookmark-form");
const bookmarkInputTitle = bookmarkWrap.querySelector("#bookmark-form .title");
const bookmarkInputURL = bookmarkWrap.querySelector("#bookmark-form .url");
const bookmarkList = bookmarkWrap.querySelector("#bookmark-list");
const bookmarkTemplate = bookmarkWrap.querySelector(".template.bookmark-wrap");

const defaultBookmarks = [
    {
        title: "naver",
        url: "https://www.naver.com",
    },
    {
        title: "google",
        url: "https://www.google.com",
    }
]

let bookmarks = []

function saveBookmarks() {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

function deleteBookmark(event) {
    const target = event.target.closest(".bookmark-wrap");

    asdf = bookmarks.filter( (bookmark) => console.log(parseInt(target.id), bookmark.id));
    qwer = bookmarks.filter( (bookmark) => console.log(parseInt(target.id) !== bookmark.id));
    bookmarks = bookmarks.filter( (bookmark) => parseInt(target.id) !== bookmark.id);
    console.log(bookmarks);
    target.remove();
    saveBookmarks()
}

function addBookmark(newBookmarkObj){

    const newBookmark = bookmarkTemplate.cloneNode(true);
    const link = newBookmark.querySelector(".link");
    const deleteBtn = newBookmark.querySelector(".delete-btn");

    newBookmark.id = newBookmarkObj.id;
    newBookmark.classList.remove(TEMPLATE_CLASSNAME);

    link.innerText = newBookmarkObj.title;
    link.href = newBookmarkObj.url;
    
    deleteBtn.addEventListener("click", deleteBookmark);

    bookmarkList.appendChild(newBookmark);
}
function handleBookmarkSubmit(event) {
    event.preventDefault();
    const newBookmarkTitle = bookmarkInputTitle.value;
    const newBookmarkURL = bookmarkInputURL.value;
    bookmarkInputTitle.value = "";
    bookmarkInputURL.value = "";

    const newBookmarkObj = {
        id: Date.now(),
        title: newBookmarkTitle,
        url: newBookmarkURL
    }
    bookmarks.push(newBookmarkObj);
    addBookmark(newBookmarkObj);   
    saveBookmarks(bookmarks);
}
bookmarkForm.addEventListener("submit", handleBookmarkSubmit);

const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);

if(savedBookmarks !== null) {
    const parsedBookmarks = JSON.parse(savedBookmarks);
    bookmarks = parsedBookmarks;
    parsedBookmarks.forEach(addBookmark);
}

if(savedBookmarks == null) {
    let id = Date.now();
    for(const defaultBookmark of defaultBookmarks) {

        const newBookmarkObj = {
            id: id,
            title: defaultBookmark.title,
            url: defaultBookmark.url
        }
        bookmarks.push(newBookmarkObj);
        addBookmark(newBookmarkObj);   
        saveBookmarks(bookmarks);
        id += 1
    }
}
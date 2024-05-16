const data = [
    {
        id: 1,
        title: "The Lord of the Rings",
        publicationDate: "1954-07-29",
        author: "J. R. R. Tolkien",
        genres: [
            "fantasy",
            "high-fantasy",
            "adventure",
            "fiction",
            "novels",
            "literature",
        ],
        hasMovieAdaptation: true,
        pages: 1216,
        translations: {
            spanish: "El señor de los anillos",
            chinese: "魔戒",
            french: "Le Seigneur des anneaux",
        },
        reviews: {
            goodreads: {
                rating: 4.52,
                ratingsCount: 630994,
                reviewsCount: 13417,
            },
            librarything: {
                rating: 4.53,
                ratingsCount: 47166,
                reviewsCount: 452,
            },
        },
    },
    {
        id: 2,
        title: "The Cyberiad",
        publicationDate: "1965-01-01",
        author: "Stanislaw Lem",
        genres: [
            "science fiction",
            "humor",
            "speculative fiction",
            "short stories",
            "fantasy",
        ],
        hasMovieAdaptation: false,
        pages: 295,
        translations: {},
        reviews: {
            goodreads: {
                rating: 4.16,
                ratingsCount: 11663,
                reviewsCount: 812,
            },
            librarything: {
                rating: 4.13,
                ratingsCount: 2434,
                reviewsCount: 0,
            },
        },
    },
    {
        id: 3,
        title: "Dune",
        publicationDate: "1965-01-01",
        author: "Frank Herbert",
        genres: ["science fiction", "novel", "adventure"],
        hasMovieAdaptation: true,
        pages: 658,
        translations: {
            spanish: "",
        },
        reviews: {
            goodreads: {
                rating: 4.25,
                ratingsCount: 1142893,
                reviewsCount: 49701,
            },
        },
    },
    {
        id: 4,
        title: "Harry Potter and the Philosopher's Stone",
        publicationDate: "1997-06-26",
        author: "J. K. Rowling",
        genres: ["fantasy", "adventure"],
        hasMovieAdaptation: true,
        pages: 223,
        translations: {
            spanish: "Harry Potter y la piedra filosofal",
            korean: "해리 포터와 마법사의 돌",
            bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
            portuguese: "Harry Potter e a Pedra Filosofal",
        },
        reviews: {
            goodreads: {
                rating: 4.47,
                ratingsCount: 8910059,
                reviewsCount: 140625,
            },
            librarything: {
                rating: 4.29,
                ratingsCount: 120941,
                reviewsCount: 1960,
            },
        },
    },
    {
        id: 5,
        title: "A Game of Thrones",
        publicationDate: "1996-08-01",
        author: "George R. R. Martin",
        genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
        hasMovieAdaptation: true,
        pages: 835,
        translations: {
            korean: "왕좌의 게임",
            polish: "Gra o tron",
            portuguese: "A Guerra dos Tronos",
            spanish: "Juego de tronos",
        },
        reviews: {
            goodreads: {
                rating: 4.44,
                ratingsCount: 2295233,
                reviewsCount: 59058,
            },
            librarything: {
                rating: 4.36,
                ratingsCount: 38358,
                reviewsCount: 1095,
            },
        },
    },
];

function getBooks() {
    return data;
}

function getBook(id) {
    return data.find((d) => d.id === id);
}

/*
// Destructuring Objects and Arrays
const book = getBook(3);
const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
    book;
console.log(title, author, pages, publicationDate, genres, hasMovieAdaptation);

// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];

// Rest Operator ...
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre, secondaryGenre, otherGenres);

// Spread Operator ...
const newGenres = [...genres, "epic"];
newGenres;
const updatedBook = {
    ...book,
    // Adding new property
    moviePublicationDate: "2001-12-19",
    // Overwriting and existing property
    pages: 1200,
};
updatedBook;

// Template Literals
const summary = `${title},a ${pages}-page long book and publish in ${
    publicationDate.split("-")[0]
}`;
summary;

// Ternary Operator
const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
pagesRange;
console.log(`The Book has ${pagesRange} pages`);

// function getYear(str) {
//     return str.split("-")[0];
// }
// Arrow Function
const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));

// Short Circuit
console.log(true && "Some string");
console.log(false && "Some string");
console.log(hasMovieAdaptation && "This book has a movie");

// falsy: 0, '', null, undefine
console.log("jonas" && "Some String");
console.log("" && "Some String");
console.log(false && "Some String");
// Smae is OR ||

//Optional Chaining
function getTotalReviewCount(book) {
    const goodreads = book.reviews?.goodreads?.reviewsCount;
    const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
    return goodreads + librarything;
}
console.log(getTotalReviewCount(book));
*/

/*
// Array Map Method

const books = getBooks();

const x = [1, 2, 3, 4, 5].map((el) => el * 2);
console.log(x);

const titles = books.map((book) => book.title);
console.log(titles);

const essentialData = books.map((book) => ({
    titles: book.title,
    author: book.author,
}));
console.log(essentialData);

// Array Filter Method

const longBooksWithMovies = books
    .filter((book) => book.pages > 500)
    .filter((book) => book.hasMovieAdaptation);
longBooksWithMovies;

const adeventureBooks = books
    .filter((book) => book.genres.includes("adventure"))
    .map((book) => book.title);
console.log(adeventureBooks);

// Array Reduce Method

const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0);
console.log(pagesAllBooks);

// Array sort Method

const arr = [5, 3, 1, 7, 8, 9];
const sortedA = arr.slice().sort((a, b) => a - b);
sortedA;
arr;

const seortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
seortedByPages;

// Immutable Arrays

// 1) Add Book obj to array
const newBook = {
    id: 6,
    title: "Harry Potter from shahdra",
    author: "J. K. Rowling",
};
const booksAfterAdd = [...books, newBook];
booksAfterAdd;

// 2) Delete book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 6);
booksAfterDelete;

// 3) Update a book object in array
const booksAfterUpdate = booksAfterDelete.map((book) =>
    book.id === 1 ? { ...book, pages: 1 } : book
);
booksAfterUpdate;


*/
// Promise

fetch("https://jsonplaceholder.typicode.com/todos/1");

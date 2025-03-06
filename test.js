import needle from "needle";

needle.get("http://localhost:3000/find-by-author?author=J.K+Rowling", (err, res) => {
    console.log(res.body); 
    });


needle.get("http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling", (err, res) => {
    console.log(res.body); 
    });


needle.post("http://localhost:3000/add-book", 
{
    bookName: "Harry Potter and the Philosopher's Stone",
    ISBN: "978-0-7475-3269-9",
    author: "J.K Rowling",
    yearPublished: "1997",
},
(err, res) => {
console.log(res.body)
});


needle.post("http://localhost:3000/add-book", 
    {
        bookName: "Jane Eyre",
        ISBN: "978-0-1414-4114-6",
        author: "Charlotte Bronte",
        yearPublished: "1847",
    },
    (err, res) => {
    console.log(res.body)
    });
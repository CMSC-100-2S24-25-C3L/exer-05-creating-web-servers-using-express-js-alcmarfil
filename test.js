import needle from "needle";

// needle.get("http://localhost:3000/find-by-author", (err, res) => {
//     console.log(res.body); // prints the body of the response message. In
//     });

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

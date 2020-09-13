// The quiz question object
// Used some quiz questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS

var quizQuestions = {

    0: {
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": ["<js>",
            "<script>",
            "<javascript>",
            "<scripting></scripting>"],
        "answer": 1
    },

    1: {
        "question": "Where is the correct place to insert a JavaScript?",
        "options": ["The <body> section",
            "The <head> section",
            "Both the <head> and <body> section are correct"],
        "answer": 2
    },

    2: {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "options": ["<script name='xxx.js'></script>",
            "<script src='xxx.js'></script>",
            "<script href='xxx.js'></script>"],
        "answer": 1
    },

    3: {
        "question": "How do you write 'Hello World' in an alert box?",
        "options": ["alert('Hello World');",
            "alertBox('Hello World');",
            "msg('Hello World');",
            "msgBox('Hello World');"],
        "answer": 0
    },

    4: {
        "question": "How do you create a function in JavaScript?",
        "options": ["function:myFunction()",
            "function = myFunction()",
            "function myFunction()"],
        "answer": 2
    },

    5: {
        "question": "How do you call a function named 'myFunction'?",
        "options": ["call function myFunction()",
            "call myFunction()",
            "myFunction()"],
        "answer": 2
    },

    6: {
        "question": "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        "options": ["if (i != 5)",
            "if i <> 5",
            "if (i <>5)",
            "if j =! 5 then"],
        "answer": 0
    },

    7: {
        "question": "How can you add a comment in a JavaScript?",
        "options": ["//This is a comment",
            "'This is a comment",
            "<!-- This is a comment -->"],
        "answer": 0
    },

    8: {
        "question": "What is the correct way to write a JavaScript array?",
        "options": ["var colors = 'red', 'green'. 'blue'",
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        "answer": 2
    }

}
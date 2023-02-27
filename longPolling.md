### In this article, I will cover one of the important backend communication design pattern which is Long Polling

<br>

### Table of contents:


- [Introduction Long Polling](#introduction-long-polling)
- [How Long Polling Works](#how-long-polling-works)
- [Why do we need Long Polling?](#why-do-we-need-long-polling)
- [Implementation](#implementation)
- [Explanation](#explanation)
- [Comparison with other communication design pattern](#comparison-with-other-communication-design-pattern)
- [Conclusion](#conclusion)

# Introduction Long Polling

Long polling is a web development technique that allows a server to push real-time updates to a client without the client having to constantly poll the server. Unlike traditional polling techniques where the client sends requests to the server at regular intervals to check for new data, long polling keeps the connection between the client and server open until new data is available, reducing the number of requests and improving the efficiency of real-time applications.

<br>

> Lets first see what happens when you enter the domain name of website or serch something on the web

    - The DNS server resolves the domain name into the corresponding IP( Internet Protocol) address

    - Now when the browser has the IP address, it goes to that webserver and requests the data present on that website.

    - The web server responds to your requests by sending you the HTML, CSS and JavaScript page which your browser renders.
  
    - Finally you see the web page.

> So this is how the web works, you request for some data(different form) and the web server sends you the response

<br>

> This communication can be done by implementing different design pattern.These are mainly divided into two categories:-

<br>

  1. Client Pull techniques :- This involves the client requesting the data using XHR (XMLHttpRequest) and fetch. The server will not respond until it is being asked to do.
<br>
       >  This techniques is used in Short polling (The client keeps requesting the data and the server keeps responding) and **long polling** (the client requests the data and the server responds only it has the data available).
  
  <br>

  2. Server Push techniques :- Server push technolgy involves the server sending updates to the client without the client having to request them. There are multpile technique based on this method.
<br>

       > WebSockets :- It is a protocol in which server can push updates to the client in real-time without the client having to request them. This protocol can be used in various application like chat application, stock market to get real time data etc.
       <br>

       > Server-Sent Events (SSE) :- This is a technology that allows the server to push updates  to the client over the single HTTP connection. This technology is built on top of HTTP protcol and uses a single text-based format. It is simple to use.  
    
<br>

  *Although both WebSockets and SSE is used to real-time communication, there are some major differences like WebSockets uses bi-directional communication, server load is high for it, and uses binary format for messages, feel free to dive into it.*

<br>

# How Long Polling Works
<br>

Long polling works by keeping a connection between the client and server open for an extended period of time, and only closing the connection once new data is available. When the client sends a request to the server, the server does not immediately respond with data. Instead, the server holds the request open and waits for new data to become available.

If new data is available, the server sends a response with the new data to the client, and the connection remains open so that the client can receive additional updates as they become available. If no new data is available, the server can send an empty response, which the client will interpret as an indication to send another request.

<br>

# Why do we need Long Polling?
<br>

> As discussed in the previous section, Long polling can be used for real-time communication, allowing the server to send updates without the need of client to constantly send request to the serve thereby increasing the overall efficiency of the system.

<br>

 There are many reasons to use long polling. Some of them are as follows :-
> - **Reduced server load:** Long polling can reduce the number of requests sent to the server, which can reduce the server load and improve scalability.
> - **Improved efficiency:** Long polling can improve the efficiency of real-time applications by reducing the latency between the time when new data is available and when it is displayed to the user.
> - **Reduced network traffic:** Because long polling keeps the connection between the client and server open, it can reduce the amount of network traffic required to transmit updates.
> - **Better user experience:** Long polling can provide a better user experience for real-time applications by reducing the need for the user to manually refresh the page or constantly poll the server for updates.
 
 <br>
 
There are also some disadvantages as well like :-
> - **Increased latency:** While long polling can reduce latency for real-time updates, it can also increase the latency for other types of requests that are waiting for the long polling request to complete.
> - **Resource consumption:** Long polling can consume server resources, as the server needs to maintain open connections with clients, and clients need to maintain open connections with the server.
> - **Complex implementation:** Long polling can be more complex to implement than traditional polling techniques, as it requires maintaining open connections and handling timeouts and connection errors.
<br>

# Implementation

<br>

> To run a demo application -- fire up your code editor and run node index.js

```JavaScript
const express = require('express');

const app = express();

app.get('/updates', (req, res) => {
  // Wait for new data
  setTimeout(() => {
    // Send response with new data
    res.send('New data');
  }, 2000);
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Long Polling Example</title>
      </head>
      <body>
        <h1>Long Polling Example</h1>
        <p>Waiting for updates...</p>
        <script>
          function longPoll() {
            fetch('/updates')
              .then(response => response.text())
              .then(data => {
                document.body.innerHTML += '<p>' + data + '</p>';
                longPoll();
              });
          }
          longPoll();
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

# Explanation
<br>

> This is simple code which in JavaScript which uses express package to create server and send response using long polling method to clients.
> - When the client go to home **"/"** route, the server sends a static page to the client.
> - Now this static page has script (javascript code) which has function fetching the **/longPoll** path which sends the data only when the data is available.
> - I have made setTimeout function to achieve this functionality
> - **app.listen()** method will start the server on the specified port (4000).

<br>

![Screenshot--1344-](/content/images/2023/02/Screenshot--1344-.png)
![Screenshot--1339-](/content/images/2023/02/Screenshot--1339-.png)

![Screenshot--1340-](/content/images/2023/02/Screenshot--1340-.png)


![Screenshot--1341-](/content/images/2023/02/Screenshot--1341-.png)

# Comparison with other communication design pattern
<br>

>Here's a comparison of long polling with other communication design patterns:

**Polling or short polling :** In contrast to long polling, polling requires the client to repeatedly check with the server for new data, which can result in wasted resources if the server doesn't have any updates. Long polling reduces the amount of unnecessary polling and improves efficiency.

**WebSockets:** WebSockets are another real-time communication design pattern that allow for bidirectional communication between a client and server. However, unlike long polling, WebSockets maintain an open connection and allow for real-time data transfer in both directions, without the need for repeated requests.

**Server-Sent Events:** Server-Sent Events (SSE) is another real-time communication pattern that involves a persistent connection between the client and server. Like long polling, it allows for real-time updates, but it does not require the client to send a request to the server. Instead, the server pushes updates to the client as they become available.

In summary, **long polling** is a communication design pattern that falls somewhere between polling and WebSockets in terms of efficiency and real-time capabilities. It's useful in situations where real-time updates are needed but WebSockets are not available or practical, and it provides a more efficient alternative to traditional polling.

<br>

# Conclusion
<br>

Long polling is a powerful technique for improving the efficiency and user experience of real-time web applications. By reducing the number of requests and latency between updates, long polling can provide real-time updates to users in a more efficient and seamless manner. However, it is important to carefully consider the limitations and trade-offs of long polling before deciding to implement it in a web application.


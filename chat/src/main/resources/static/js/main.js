"use strict";

// Create a client instance
var stompClient = null;
var username = null;

function connect(event){
    username = $("#name").val().trim();
    // Switch page and connect to Websocket
    if(username){
        $('#username-page').addClass('d-none');
        $('#chat-page').removeClass('d-none');
        // Connect to Websocket
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected(){
    // Subscribe to the topic
    stompClient.subscribe('/topic/public', onMessageReceived);
    // Send username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'}));

    // Hide connecting message
    $('#connecting').addClass('d-none');
}

function onError(error){
    // Show error message
    $('#connecting').text('Could not connect to WebSocket server. Please refresh this page to try again!').css('color', 'red');
}

// Add EventListener
$("username-form").on("submit", connect);

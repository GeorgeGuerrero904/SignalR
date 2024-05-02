$(document).ready(function () {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    myModal.toggle();
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    //Disable the send button until connection is established.
    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (user, message) {
        $("#messagesList").append(`<li class="list-group-item "><span class="badge bg-info text-dark"> ${user}</span>${message}</li>`);
    });

    connection.on("userEntered", function (userName) {
        $("#toastMsg").text(`${userName} has entered to the chat`);
        var toast = new bootstrap.Toast($("#liveToast"), {})
        toast.show()
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });

    $("#saveName").click(function () {
        var userLogged = $("#userName").val();
        $("#userInput").val(userLogged);
        myModal.toggle();

        connection.invoke("userLogged", userLogged).catch(function (err) {
            return console.error(err.toString());
        });
    });
});

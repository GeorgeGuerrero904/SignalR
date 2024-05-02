using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task userLogged(string userLogged)
        {
            await Clients.All.SendAsync("userEntered", userLogged);
        }
    }
}

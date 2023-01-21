from django.shortcuts import render
import webbrowser

from django.shortcuts import render
from nltk.chat.util import Chat, reflections


# Create your views here.

def login_user(request):
    return render(request, 'authentication/login.html', {})


# views.py


def chatbot(request):
    if request.method == 'POST':
        user_input = request.POST['user_input']
        response = Chatbot.respond(user_input)
        return render(request, 'authentication/chatbot.html', {'response': response})
    return render(request, 'authentication/chatbot.html')


class Chatbot:
    def respond(user_input):
        pairs = [
            [
                r"my name is (.*)",
                ["Nice to Meet you"]
            ],
            [
                r"(.*) google (.*)",
                [webbrowser.open_new_tab('www.google.com')]
            ],
            [
                r"hi|hey|hello",
                ["Hello", "Hey there"]
            ],
            [
                r"what is your name?",
                ["My name is Bot", "I'm Bot, nice to meet you!"]
            ],
            [
                r"how are you?",
                ["I'm doing good", "I'm fine"]
            ],
            [
                r"sorry (.*)",
                ["Its alright", "Its OK, never mind"]
            ],
            [
                r"I am fine",
                ["Great to hear that"]
            ],
            [
                r"quit",
                ["Bye bye take care. It was nice talking to you :) "]
            ],
        ]
        chatbot = Chat(pairs, reflections)
        return chatbot.respond(user_input)

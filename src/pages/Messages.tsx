import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  MapPin,
  Star,
  Clock,
  MessageSquare
} from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      name: 'María González',
      lastMessage: 'Thank you for the session yesterday!',
      timestamp: '2 hours ago',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      online: true,
      specialization: 'Therapeutic Massage',
      rating: 4.8
    },
    {
      id: '2',
      name: 'David Chen',
      lastMessage: 'When are you available next week?',
      timestamp: '1 day ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      online: false,
      specialization: 'Sports Massage',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Sarah Thompson',
      lastMessage: 'Perfect, see you tomorrow at 3 PM',
      timestamp: '2 days ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      online: true,
      specialization: 'Relaxing Massage',
      rating: 4.7
    }
  ];

  // Mock data for messages
  const messages = [
    {
      id: '1',
      senderId: '1',
      text: 'Hi! I have a question about your therapeutic massage services.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'user',
      text: 'Hello! Yes, I offer therapeutic massage. What would you like to know?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      text: 'I have some back pain and was wondering if therapeutic massage would help.',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: '4',
      senderId: 'user',
      text: 'Absolutely! Therapeutic massage is excellent for back pain relief. I can help you with that.',
      timestamp: '10:37 AM',
      isOwn: true
    },
    {
      id: '5',
      senderId: '1',
      text: 'That sounds great! When are you available for a session?',
      timestamp: '10:40 AM',
      isOwn: false
    },
    {
      id: '6',
      senderId: 'user',
      text: 'I have availability this week on Tuesday and Thursday. What works better for you?',
      timestamp: '10:42 AM',
      isOwn: true
    },
    {
      id: '7',
      senderId: '1',
      text: 'Tuesday would be perfect! What time slots do you have?',
      timestamp: '10:45 AM',
      isOwn: false
    },
    {
      id: '8',
      senderId: 'user',
      text: 'I have 2 PM and 4 PM available on Tuesday. Which would you prefer?',
      timestamp: '10:47 AM',
      isOwn: true
    },
    {
      id: '9',
      senderId: '1',
      text: '2 PM works great for me! Thank you so much.',
      timestamp: '10:50 AM',
      isOwn: false
    },
    {
      id: '10',
      senderId: 'user',
      text: 'Perfect! I\'ll book you for Tuesday at 2 PM. See you then!',
      timestamp: '10:52 AM',
      isOwn: true
    }
  ];

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would send this message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Connect with therapists and manage your conversations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[600px] sm:h-[700px]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">Conversations</CardTitle>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 sm:p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-purple-50 border-r-2 border-purple-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback className="bg-purple-600 text-white text-sm sm:text-base">
                            {conversation.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                            {conversation.name}
                          </h4>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate mb-1">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{conversation.rating}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500 truncate">{conversation.specialization}</span>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="bg-purple-600 text-white text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedConversationData ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3 sm:pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                        <AvatarImage src={selectedConversationData.avatar} alt={selectedConversationData.name} />
                        <AvatarFallback className="bg-purple-600 text-white text-sm sm:text-base">
                          {selectedConversationData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">
                          {selectedConversationData.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{selectedConversationData.rating}</span>
                          <span>•</span>
                          <span>{selectedConversationData.specialization}</span>
                          <span>•</span>
                          <span className={selectedConversationData.online ? 'text-green-600' : 'text-gray-500'}>
                            {selectedConversationData.online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-3 sm:p-4 overflow-y-auto">
                  <div className="space-y-3 sm:space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                            message.isOwn
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm sm:text-base">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-purple-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-3 sm:p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 text-sm sm:text-base"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="text-sm sm:text-base touch-target"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;

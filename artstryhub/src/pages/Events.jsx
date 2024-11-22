import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Search, Filter, Heart, Share2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Badge } from "@/components/ui/badge";

const EventCard = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">

      <div className="relative">
        <img 
          src="/api/placeholder/400/200" 
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-primary">{event.category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {event.date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" /> {event.location}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Clock className="w-4 h-4" /> {event.time}
        </div>
        <p className="text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          {isLiked ? 'Saved' : 'Save'}
        </Button>
        <Button variant="default" size="sm">
          Register <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const events = [
    {
      title: "Digital Art Workshop",
      date: "December 1, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Creative Studio, Downtown",
      category: "Workshop",
      description: "Join us for an immersive digital art workshop where you'll learn advanced techniques from industry professionals."
    },
    {
      title: "Photography Exhibition",
      date: "December 5, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Art Gallery Central",
      category: "Exhibition",
      description: "Experience an stunning collection of contemporary photography from emerging artists around the world."
    },
    {
      title: "Sculpture Masterclass",
      date: "December 10, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Sculpture Garden",
      category: "Workshop",
      description: "Learn the art of sculpture from master craftsmen in this hands-on masterclass."
    }
  ];

  const categories = ['All', 'Workshop', 'Exhibition', 'Performance', 'Conference'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      {/* Hero Section */}
      <div className="relative h-64 bg-primary/10 mb-8">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Discover Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in-delay">
            Connect with fellow artists and enthusiasts through our curated events, workshops, and exhibitions.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events
            .filter(event => 
              (selectedCategory === 'All' || event.category === selectedCategory) &&
              (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               event.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
        </div>
      </div>
      <Footer/>
      
    </div>
  );
};

export default Events;
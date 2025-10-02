import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface Event {
  id: string;
  title: string;
  type: 'academic' | 'cultural' | 'sports' | 'workshop' | 'notice';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  publishDate: string;
  expiryDate: string;
  publishedBy: string;
  views: number;
  isImportant: boolean;
}
export interface Event {
  id: string;
  title: string;
  type: 'academic' | 'cultural' | 'sports' | 'workshop' | 'notice';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
}
@Component({
  selector: 'app-event-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList {
activeTab: 'events' | 'notices' | 'feedback' = 'events';

  showEventForm = false;
  showNoticeForm = false;
  searchTerm = '';
  selectedFilter = '';

  eventTypes = ['academic', 'cultural', 'sports', 'workshop', 'notice'];
  noticeCategories = ['academic', 'administrative', 'event', 'emergency'];
  eventStatuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];

  events: Event[] = [
    {
      id: '1',
      title: 'Annual Science Exhibition',
      type: 'academic',
      date: '2024-03-20',
      time: '10:00',
      venue: 'Main Auditorium',
      organizer: 'Science Department',
      description: 'Annual showcase of student research projects and innovations',
      attendees: 150,
      maxAttendees: 200,
      status: 'upcoming',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Cultural Fest 2024',
      type: 'cultural',
      date: '2024-03-25',
      time: '14:00',
      venue: 'College Ground',
      organizer: 'Cultural Committee',
      description: 'Three-day cultural festival with music, dance, and drama competitions',
      attendees: 300,
      maxAttendees: 500,
      status: 'upcoming',
      priority: 'high'
    }
  ];

  notices: Notice[] = [
    {
      id: '1',
      title: 'Semester Examination Schedule Released',
      content: 'The semester examination schedule for all departments has been released.',
      category: 'academic',
      publishDate: '2024-03-01',
      expiryDate: '2024-04-30',
      publishedBy: 'Academic Office',
      views: 245,
      isImportant: true
    },
    {
      id: '2',
      title: 'Library Timing Changes',
      content: 'Library timings have been extended: Monday to Friday 8:00-20:00, Saturday 9:00-17:00',
      category: 'administrative',
      publishDate: '2024-02-28',
      expiryDate: '2024-03-31',
      publishedBy: 'Library Administration',
      views: 189,
      isImportant: false
    }
  ];

  get filteredEvents() {
    return this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        || event.organizer.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFilter = !this.selectedFilter 
        || event.type === this.selectedFilter 
        || event.status === this.selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }

  get filteredNotices() {
    return this.notices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        || notice.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFilter = !this.selectedFilter || notice.category === this.selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }

  get upcomingEvents() {
    return this.events.filter(event => event.status === 'upcoming').length;
  }

  get totalNotices() {
    return this.notices.length;
  }

  get importantNotices() {
    return this.notices.filter(notice => notice.isImportant).length;
  }

  switchTab(tab: 'events' | 'notices' | 'feedback') {
    this.activeTab = tab;
    this.searchTerm = '';
    this.selectedFilter = '';
  }
}

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

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

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

  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEvents.slice(startIndex, endIndex);
  }

  get paginatedNotices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredNotices.slice(startIndex, endIndex);
  }

  get currentData() {
    return this.activeTab === 'events' ? this.filteredEvents : this.filteredNotices;
  }

  get paginatedData() {
    return this.activeTab === 'events' ? this.paginatedEvents : this.paginatedNotices;
  }

  get totalPages(): number {
    return Math.ceil(this.currentData.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push(-1);
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push(-1);
      }
      pages.push(total);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearchOrFilterChange() {
    this.currentPage = 1;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.currentData.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  switchTab(tab: 'events' | 'notices' | 'feedback') {
    this.activeTab = tab;
    this.searchTerm = '';
    this.selectedFilter = '';
    this.currentPage = 1;
  }

  // Action button methods
  viewEvent(event: Event) {
    console.log('View event:', event);
  }

  editEvent(event: Event) {
    console.log('Edit event:', event);
  }

  deleteEvent(eventId: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(e => e.id !== eventId);
    }
  }

  viewNotice(notice: Notice) {
    console.log('View notice:', notice);
  }

  editNotice(notice: Notice) {
    console.log('Edit notice:', notice);
  }

  deleteNotice(noticeId: string) {
    if (confirm('Are you sure you want to delete this notice?')) {
      this.notices = this.notices.filter(n => n.id !== noticeId);
    }
  }
}

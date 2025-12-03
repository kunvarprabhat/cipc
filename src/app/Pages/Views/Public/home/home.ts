import {  OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, NgForOf, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy{
certificates = [
    {
      image: "https://readdy.ai/api/search-image?query=Professional%20ISO%209001%202015%20certification%20document%2C%20official%20quality%20management%20certificate%2C%20clean%20white%20background%2C%20business%20certification&width=300&height=400&seq=cert1&orientation=portrait",
      title: "ISO 9001:2015 Certified",
      description: "Quality Management System"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Medical%20education%20board%20certificate%2C%20official%20healthcare%20training%20authorization%20document%2C%20professional%20certification%2C%20clean%20background&width=300&height=400&seq=cert2&orientation=portrait",
      title: "Government Recognition",
      description: "Authorized Training Institute"
    },
    {
      image: "https://readdy.ai/api/search-image?query=University%20affiliation%20certificate%2C%20medical%20education%20partnership%20document%2C%20official%20academic%20recognition%2C%20professional%20background&width=300&height=400&seq=cert3&orientation=portrait",
      title: "University Affiliation",
      description: "Academic Excellence"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Healthcare%20training%20accreditation%20certificate%2C%20medical%20education%20quality%20assurance%20document%2C%20professional%20certification%20background&width=300&height=400&seq=cert4&orientation=portrait",
      title: "Accreditation Certificate",
      description: "Training Standards"
    }
  ];

  features = [
    { icon: "ri-graduation-cap-line", title: "Expert Faculty", description: "Experienced professionals with industry expertise" },
    { icon: "ri-microscope-line", title: "Modern Labs", description: "State-of-the-art equipment and facilities" },
    { icon: "ri-award-line", title: "100% Placement", description: "Guaranteed job placement assistance" },
    { icon: "ri-shield-check-line", title: "ISO Certified", description: "Quality assured education standards" }
  ];

  courses = [
    {
      title: "Medical Laboratory Technology",
      duration: "2 Years",
      image: "https://readdy.ai/api/search-image?query=Medical%20laboratory%20technician%20working%20with%20modern%20equipment%2C%20healthcare%20professional%20in%20lab%20coat%2C%20clean%20medical%20laboratory%20setting&width=400&height=250&seq=course1&orientation=landscape"
    },
    {
      title: "X-Ray Technology",
      duration: "1 Year",
      image: "https://readdy.ai/api/search-image?query=X-ray%20technician%20operating%20medical%20imaging%20equipment%2C%20healthcare%20professional%20with%20radiography%20machine%2C%20modern%20medical%20facility&width=400&height=250&seq=course2&orientation=landscape"
    },
    {
      title: "Operation Theatre Technology",
      duration: "2 Years",
      image: "https://readdy.ai/api/search-image?query=Operation%20theatre%20technician%20preparing%20surgical%20equipment%2C%20medical%20professional%20in%20sterile%20environment%2C%20modern%20surgical%20facility&width=400&height=250&seq=course3&orientation=landscape"
    }
  ];

  teamPreview = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      role: 'Director & Principal',
      bio: 'Over 15 years of experience in paramedical education and healthcare management focused on student success and research-driven training.',
      photo: 'Assets/people/priya.jpg'
    },
    {
      id: '2',
      name: 'Prof. Amit Singh',
      role: 'Head of Faculty',
      bio: 'Expert in curriculum development and clinical training with deep industry connections for placements.',
      photo: 'Assets/people/amit.jpg'
    },
    {
      id: '3',
      name: 'Rahul Kumar',
      role: 'Student Affairs',
      bio: 'Leads student support, internships, and placement services to help students transition to careers.',
      photo: 'Assets/people/rahul.jpg'
    },
    {
      id: '4',
      name: 'Ms. Neha Verma',
      role: 'Lab Supervisor',
      bio: 'Ensures labs and equipment meet safety and training standards for hands-on learning.',
      photo: 'Assets/people/neha.jpg'
    }
  ];

  whyChooseUs = [
    { icon: 'ri-book-line', title: 'Comprehensive Curriculum', description: 'Industry-aligned courses designed to meet market demands' },
    { icon: 'ri-team-line', title: 'Experienced Faculty', description: 'Educators with real-world healthcare experience' },
    { icon: 'ri-building-line', title: 'Modern Infrastructure', description: 'Well-equipped labs and learning centers' },
    { icon: 'ri-briefcase-line', title: 'Career Support', description: 'Dedicated placement and career counseling services' },
    { icon: 'ri-globe-line', title: 'Global Standards', description: 'ISO certified with international recognition' },
    { icon: 'ri-award-line', title: 'Success Track Record', description: '95%+ placement rate with leading hospitals' }
  ];

  successStories = [
    { name: 'Priya Verma', role: 'Medical Lab Technician', company: 'Apollo Hospitals', feedback: 'CIPC transformed my career. The hands-on training and placement support made all the difference. Highly recommended!' },
    { name: 'Raj Patel', role: 'Radiology Technician', company: 'Fortis Healthcare', feedback: 'The faculty expertise and practical experience at CIPC prepared me perfectly for real-world healthcare environments.' },
    { name: 'Sneha Gupta', role: 'Operation Theatre Tech', company: 'Max Healthcare', feedback: 'Best investment in my future. The ISO-certified training and 100% placement promise became reality for me!' },
    { name: 'Arjun Singh', role: 'Medical Lab Specialist', company: 'Dr. Lal PathLabs', feedback: 'Excellent curriculum, supportive faculty, and amazing placement assistance. CIPC is the top choice for paramedical education.' }
  ];

  selectedMember: any = undefined;

  openMember(member: any) {
    this.selectedMember = member;
    // prevent background scroll when modal open
    try { document.body.style.overflow = 'hidden'; } catch (e) { }
  }

  closeMember() {
    this.selectedMember = undefined;
    try { document.body.style.overflow = ''; } catch (e) { }
  }




 
  currentSlide = 0;
  interval: any;
  showNotification = true;
  notificationTimer: any;
  isHiding = false;

  slides = [
    {
      image: "https://readdy.ai/api/search-image?query=Modern%20medical%20training%20laboratory%20with%20students%20learning%20paramedical%20skills%2C%20professional%20healthcare%20education%20environment%2C%20bright%20lighting%2C%20clean%20white%20background&width=1200&height=500&seq=hero1&orientation=landscape",
      title: "Excellence in Paramedical Education",
      subtitle: "ISO 9001:2015 Certified Institute"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Healthcare%20professionals%20training%20in%20modern%20medical%20facility%2C%20students%20practicing%20with%20medical%20equipment%2C%20professional%20education%20setting%2C%20clean%20background&width=1200&height=500&seq=hero2&orientation=landscape",
      title: "Hands-On Training Programs",
      subtitle: "Building Healthcare Leaders"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Medical%20laboratory%20with%20advanced%20equipment%2C%20paramedical%20students%20conducting%20experiments%2C%20professional%20healthcare%20training%20environment%2C%20bright%20clean%20setting&width=1200&height=500&seq=hero3&orientation=landscape",
      title: "State-of-the-Art Facilities",
      subtitle: "Advanced Learning Environment"
    }
  ];

  ngOnInit() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
    
    // Show notification popup on page load
    this.showNotification = true;
    this.startNotificationTimer();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }
  }

  startNotificationTimer() {
    // Hide notification after 5 seconds
    this.notificationTimer = setTimeout(() => {
      if (this.showNotification && !this.isHiding) {
        this.hideNotification();
      }
    }, 5000);
  }

  stopNotificationTimer() {
    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
      this.notificationTimer = null;
    }
  }

  hideNotification() {
    this.isHiding = true;
    // Add fade-out animation
    setTimeout(() => {
      this.showNotification = false;
      this.isHiding = false;
    }, 300); // Animation duration
  }

  onNotificationMouseEnter() {
    // Stop auto-hide when mouse enters
    this.stopNotificationTimer();
    this.isHiding = false;
  }

  onNotificationMouseLeave() {
    // Resume auto-hide when mouse leaves
    this.startNotificationTimer();
  }

  closeNotification() {
    this.hideNotification();
    this.stopNotificationTimer();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}

